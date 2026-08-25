"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Heart, Flag, ShieldCheck } from "lucide-react";
import { getAssetById, getApprovedAssets, type CatalogAsset } from "@/lib/queries";
import { getCategory } from "@/lib/categories";
import { AssetCard } from "@/components/asset-card";
import { CommentSection } from "@/components/comment-section";

export function AssetDetailView({ id }: { id: string }) {
  const [asset, setAsset] = useState<CatalogAsset | null | undefined>(undefined);
  const [related, setRelated] = useState<CatalogAsset[]>([]);

  useEffect(() => {
    getAssetById(id).then((result) => {
      setAsset(result);
      if (result) {
        getApprovedAssets({ categorySlug: result.categorySlug, limit: 6 }).then((pool) =>
          setRelated(pool.filter((a) => a.id !== id).slice(0, 5))
        );
      }
    });
  }, [id]);

  if (asset === null) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center">
        <p className="text-sm text-muted">Asset not found.</p>
        <Link href="/browse" className="mt-4 inline-block text-sm underline">
          Back to browse
        </Link>
      </div>
    );
  }

  if (asset === undefined) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-sm text-muted">
        Loading...
      </div>
    );
  }

  const category = getCategory(asset.categorySlug);
  const image = asset.thumbnailUrl ?? category?.image;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface-2">
            {image && (
              <Image src={image} alt={asset.title} fill sizes="60vw" className="object-cover" />
            )}
          </div>

          {asset.description && (
            <div className="mt-8">
              <h2 className="text-sm font-medium text-muted">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                {asset.description}
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {category?.emoji} {category?.name}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">{asset.title}</h1>
          <p className="mt-1 text-sm text-muted">by {asset.creatorName}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Download className="h-4 w-4" strokeWidth={1.75} />
              {asset.downloadCount.toLocaleString()} downloads
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" strokeWidth={1.75} />
              {asset.likeCount.toLocaleString()} likes
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

      <CommentSection assetId={id} />
    </div>
  );
}
