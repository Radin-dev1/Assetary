import { notFound } from "next/navigation";
import { Download, Heart, Flag, ShieldCheck } from "lucide-react";
import { getAsset, mockAssets } from "@/lib/mock-assets";
import { getCategory } from "@/lib/categories";
import { AssetCard } from "@/components/asset-card";

export function generateStaticParams() {
  return mockAssets.map((a) => ({ id: a.id }));
}

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = getAsset(id);
  if (!asset) notFound();

  const category = getCategory(asset.categorySlug);
  const related = mockAssets.filter((a) => a.categorySlug === asset.categorySlug && a.id !== id).slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div
            className="flex aspect-video items-center justify-center rounded-xl border border-border text-6xl"
            style={{ backgroundColor: asset.thumbnailColor }}
          >
            <span className="opacity-40">{category?.emoji}</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border border-border text-xl opacity-70"
                style={{ backgroundColor: asset.thumbnailColor }}
              >
                <span className="opacity-40">{category?.emoji}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-muted">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              A high-quality {category?.name.toLowerCase()} asset, ready to drop into your next
              GFX project. Checked and approved by the Assetary team.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {category?.emoji} {category?.name}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">{asset.title}</h1>
          <p className="mt-1 text-sm text-muted">by {asset.creator}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Download className="h-4 w-4" strokeWidth={1.75} />
              {asset.downloads.toLocaleString()} downloads
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" strokeWidth={1.75} />
              {asset.likes.toLocaleString()} likes
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <p className="text-2xl font-semibold">
              {asset.price === 0 ? "Free" : `$${asset.price.toFixed(2)}`}
            </p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">
              <Download className="h-4 w-4" strokeWidth={2} />
              {asset.price === 0 ? "Download" : "Buy now"}
            </button>
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium transition-colors hover:border-foreground/40">
              <Heart className="h-4 w-4" strokeWidth={1.75} />
              Like
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              Reviewed asset
            </span>
            <button className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Flag className="h-3.5 w-3.5" strokeWidth={1.75} />
              Report
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-lg font-semibold">More {category?.name.toLowerCase()}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
