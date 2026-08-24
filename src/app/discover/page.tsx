import { ArrowUpRight, Compass, Info } from "lucide-react";
import { externalSources } from "@/lib/external-sources";

export default function DiscoverPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Compass className="h-4 w-4" strokeWidth={1.75} />
        Discover
      </div>
      <h1 className="mt-2 text-2xl font-semibold">Can&apos;t find it on Assetary yet?</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Here&apos;s a hand-picked list of other places worth checking for Roblox GFX resources —
        HDRIs, textures, models, and more.
      </p>

      <div className="mt-4 flex gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
        <p>
          These are outbound links to other creators&apos; sites. Assetary doesn&apos;t host, sell,
          or claim any of this content — every card below says exactly where it&apos;s from.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {externalSources.map((source) => (
          <a
            key={source.domain}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-foreground/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{source.name}</p>
                <p className="text-xs text-muted">{source.domain}</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted">
                External
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </div>
            <p className="text-sm text-muted">{source.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {source.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
