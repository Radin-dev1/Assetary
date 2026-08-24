import Link from "next/link";
import { categories } from "@/lib/categories";
import { AssetCard } from "@/components/asset-card";
import type { Asset } from "@/lib/types";

export function BrowseGrid({
  title,
  assets,
  activeSlug,
}: {
  title: string;
  assets: Asset[];
  activeSlug?: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <p className="text-sm font-medium text-muted">Categories</p>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          <Link
            href="/browse"
            className={`rounded-lg px-3 py-2 transition-colors ${
              !activeSlug ? "bg-surface font-medium" : "text-muted hover:bg-surface"
            }`}
          >
            All assets
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/browse/${category.slug}`}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                activeSlug === category.slug
                  ? "bg-surface font-medium"
                  : "text-muted hover:bg-surface"
              }`}
            >
              <span>{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted">{assets.length} assets</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
        {assets.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">No assets found.</p>
        )}
      </div>
    </div>
  );
}
