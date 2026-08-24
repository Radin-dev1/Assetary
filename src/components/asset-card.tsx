import Link from "next/link";
import Image from "next/image";
import { Download, Heart } from "lucide-react";
import type { Asset } from "@/lib/types";
import { getCategory } from "@/lib/categories";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function AssetCard({ asset }: { asset: Asset }) {
  const category = getCategory(asset.categorySlug);

  return (
    <Link
      href={`/asset/${asset.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        {category && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <span className="absolute left-2 top-2 rounded-full bg-background/70 px-2 py-1 text-xs backdrop-blur">
          {category?.emoji}
        </span>
        <span
          className={
            asset.price === 0
              ? "absolute right-2 top-2 rounded-full bg-foreground px-2 py-1 text-xs font-medium text-background"
              : "absolute right-2 top-2 rounded-full bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur"
          }
        >
          {asset.price === 0 ? "Free" : `$${asset.price}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="line-clamp-1 text-sm font-medium">{asset.title}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-2 text-[9px] font-medium text-foreground">
            {initials(asset.creator)}
          </span>
          {asset.creator}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-1 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            {asset.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
            {asset.likes.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
