"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AssetDetailView } from "@/components/asset-detail-view";

export default function NotFound() {
  const [assetId, setAssetId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    Promise.resolve().then(() => {
      const match = window.location.pathname.match(/^\/asset\/([^/]+)\/?$/);
      setAssetId(match ? decodeURIComponent(match[1]) : null);
    });
  }, []);

  if (assetId === undefined) return null;

  if (assetId) return <AssetDetailView id={assetId} />;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-4 inline-block text-sm underline">
        Back to home
      </Link>
    </div>
  );
}
