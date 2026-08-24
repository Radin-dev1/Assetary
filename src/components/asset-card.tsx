import Link from "next/link";
import { Download, Heart } from "lucide-react";
import type { Asset } from "@/lib/types";
import { getCategory } from "@/lib/categories";

export function AssetCard({ asset }: { asset: Asset }) {
  const category = getCategory(asset.categorySlug);

  return (
    <Link
      href={`/asset/${asset.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/30"
    >
      <div
        className="flex aspect-square items-center justify-center text-3xl"
        style={{ backgroundColor: asset.thumbnailColor }}
      >
        <span className="opacity-40">{category?.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-1 text-sm font-medium">{asset.title}</p>
        <p className="text-xs text-muted">{asset.creator}</p>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
              {asset.downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
              {asset.likes.toLocaleString()}
            </span>
          </span>
          <span
            className={
              asset.price === 0
                ? "rounded-full bg-foreground/10 px-2 py-0.5 font-medium text-foreground"
                : "font-medium text-foreground"
            }
          >
            {asset.price === 0 ? "Free" : `$${asset.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
