"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function AssetRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) router.replace(`/asset/${id}`);
  }, [id, router]);

  if (id) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-sm text-muted">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center">
      <p className="text-sm text-muted">Asset not found.</p>
      <Link href="/browse" className="mt-4 inline-block text-sm underline">
        Back to browse
      </Link>
    </div>
  );
}

export default function AssetPage() {
  return (
    <Suspense>
      <AssetRedirect />
    </Suspense>
  );
}
