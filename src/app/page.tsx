import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { mockAssets } from "@/lib/mock-assets";
import { CategoryTile } from "@/components/category-tile";
import { AssetCard } from "@/components/asset-card";
import { LogoMark } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border">
        <LogoMark
          size={420}
          className="pointer-events-none absolute -right-24 -top-24 text-foreground/[0.04]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium text-muted">Built for Roblox GFX creators</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Assets that make your renders hit different.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Rigs, HDRIs, poses, textures, and more — free and paid, uploaded by creators, checked
            before they ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/browse"
              className="flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Browse assets
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/upload"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              Upload yours
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">New &amp; trending</h2>
          <Link
            href="/browse"
            className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {mockAssets.slice(0, 20).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>
    </div>
  );
}
