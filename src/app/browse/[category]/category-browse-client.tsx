"use client";

import { useEffect, useState } from "react";
import { getApprovedAssets, type CatalogAsset } from "@/lib/queries";
import { BrowseGrid } from "@/components/browse-grid";
import type { Category } from "@/lib/categories";

export function CategoryBrowseClient({ category }: { category: Category }) {
  const [assets, setAssets] = useState<CatalogAsset[]>([]);

  useEffect(() => {
    getApprovedAssets({ categorySlug: category.slug }).then(setAssets);
  }, [category.slug]);

  return (
    <BrowseGrid
      title={`${category.emoji} ${category.name}`}
      assets={assets}
      activeSlug={category.slug}
    />
  );
}
