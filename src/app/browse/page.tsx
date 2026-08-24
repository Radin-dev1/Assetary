"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getApprovedAssets, type CatalogAsset } from "@/lib/queries";
import { BrowseGrid } from "@/components/browse-grid";

function BrowseContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? undefined;
  const free = searchParams.get("free");
  const [assets, setAssets] = useState<CatalogAsset[]>([]);

  useEffect(() => {
    getApprovedAssets({ q }).then((result) => {
      setAssets(free ? result.filter((a) => a.price === 0) : result);
    });
  }, [q, free]);

  return <BrowseGrid title={q ? `Results for "${q}"` : "All assets"} assets={assets} />;
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  );
}
