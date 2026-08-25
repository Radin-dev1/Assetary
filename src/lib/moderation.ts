"use client";

import type { NSFWJS, PredictionType } from "nsfwjs";

export type ModVerdict = "approved" | "pending" | "rejected";

export type ModResult = {
  verdict: ModVerdict;
  reason: string;
  scores: Record<string, number>;
};

let modelPromise: Promise<NSFWJS> | null = null;

/**
 * Starts fetching the model early (e.g. when the upload form mounts) so the
 * one-time load overlaps with the user filling in the form instead of stalling
 * the submit. Safe to call repeatedly — the work is only done once.
 */
export function preloadModerationModel() {
  void loadModel().catch(() => {
    // Ignored — moderateThumbnail retries and falls back to human review.
    modelPromise = null;
  });
}

// The model and tfjs are several MB, so they're only pulled in when an upload
// actually needs checking — never on first page load.
async function loadModel(): Promise<NSFWJS> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const [tf, nsfwjs] = await Promise.all([
        import("@tensorflow/tfjs"),
        import("nsfwjs"),
      ]);
      await tf.ready();
      return nsfwjs.load();
    })();
  }
  return modelPromise;
}

function toScores(predictions: PredictionType[]): Record<string, number> {
  return Object.fromEntries(predictions.map((p) => [p.className, p.probability]));
}

function decode(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    img.src = url;
  });
}

/**
 * Classifies a thumbnail before upload.
 *
 * Clear results decide immediately; anything ambiguous falls through to the
 * human mod queue rather than guessing.
 */
export async function moderateThumbnail(file: File): Promise<ModResult> {
  let scores: Record<string, number>;

  try {
    const [model, img] = await Promise.all([loadModel(), decode(file)]);
    scores = toScores(await model.classify(img));
  } catch {
    // If the model can't load or run, fall back to human review instead of
    // letting the upload through unchecked.
    return {
      verdict: "pending",
      reason: "Automatic check unavailable — sent for human review.",
      scores: {},
    };
  }

  const porn = scores.Porn ?? 0;
  const hentai = scores.Hentai ?? 0;
  const sexy = scores.Sexy ?? 0;
  const safe = (scores.Neutral ?? 0) + (scores.Drawing ?? 0);

  if (porn > 0.6 || hentai > 0.6) {
    return {
      verdict: "rejected",
      reason: "This image looks explicit, so it can't be uploaded.",
      scores,
    };
  }

  if (porn > 0.2 || hentai > 0.2 || sexy > 0.5) {
    return {
      verdict: "pending",
      reason: "Flagged as borderline — a moderator will review it.",
      scores,
    };
  }

  if (safe > 0.7) {
    return { verdict: "approved", reason: "Passed the automatic check.", scores };
  }

  return {
    verdict: "pending",
    reason: "Not confident either way — a moderator will review it.",
    scores,
  };
}
