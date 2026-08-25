"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/setup-notice";
import { categories } from "@/lib/categories";
import { moderateThumbnail, preloadModerationModel } from "@/lib/moderation";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].slug);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Warm the checker up front so submitting doesn't wait on the model download.
  useEffect(() => {
    preloadModerationModel();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!file || !thumbnail) {
      setError("Please attach both the asset file and a preview thumbnail.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You need to sign in before uploading.");
      setLoading(false);
      return;
    }

    setStatus("Checking your thumbnail...");
    const mod = await moderateThumbnail(thumbnail);

    if (mod.verdict === "rejected") {
      setError(mod.reason);
      setStatus(null);
      setLoading(false);
      return;
    }

    setStatus("Uploading...");
    const assetPath = `${user.id}/${Date.now()}-${file.name}`;
    const thumbPath = `${user.id}/${Date.now()}-${thumbnail.name}`;

    const [assetUpload, thumbUpload] = await Promise.all([
      supabase.storage.from("assets").upload(assetPath, file),
      supabase.storage.from("thumbnails").upload(thumbPath, thumbnail),
    ]);

    if (assetUpload.error || thumbUpload.error) {
      setError(assetUpload.error?.message || thumbUpload.error?.message || "Upload failed.");
      setStatus(null);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("assets").insert({
      title,
      description,
      category_slug: category,
      creator_id: user.id,
      file_path: assetPath,
      thumbnail_path: thumbPath,
      price: 0,
      status: mod.verdict,
      ai_mod_result: { verdict: mod.verdict, reason: mod.reason, scores: mod.scores },
    });

    if (insertError) {
      setError(insertError.message);
      setStatus(null);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  if (!isSupabaseConfigured()) return <SetupNotice />;

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-14 sm:px-6">
      <h1 className="text-xl font-semibold">Upload an asset</h1>
      <p className="mt-1 text-sm text-muted">
        Every upload goes through moderation before it&apos;s visible to others. Free-only launch —
        paid assets are coming in a later phase.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-4 py-8 text-center transition-colors hover:border-foreground/40">
          <UploadCloud className="h-6 w-6 text-muted" strokeWidth={1.5} />
          <span className="text-sm">
            {file ? file.name : "Click to select your asset file"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center transition-colors hover:border-foreground/40">
          <UploadCloud className="h-5 w-5 text-muted" strokeWidth={1.5} />
          <span className="text-sm">
            {thumbnail ? thumbnail.name : "Click to select a preview thumbnail"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
          />
        </label>

        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
        />

        <textarea
          required
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-foreground/40"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {status && <p className="text-sm text-muted">{status}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {loading ? "Working..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
