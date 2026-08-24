import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Sparkles, Compass } from "lucide-react";
import { categories } from "@/lib/categories";
import { getApprovedAssets, getCatalogStats } from "@/lib/queries";
import { CategoryTile } from "@/components/category-tile";
import { AssetCard } from "@/components/asset-card";
import { EmptyCatalog } from "@/components/empty-catalog";

const trust = [
  {
    icon: ShieldCheck,
    title: "Checked before it ships",
    body: "Every upload is moderated — automatically for the obvious stuff, by a human for anything borderline.",
  },
  {
    icon: Sparkles,
    title: "Made by creators",
    body: "No stock-site filler. Assets are uploaded by working Roblox GFX artists who actually use this software.",
  },
  {
    icon: Users,
    title: "Free-only launch",
    body: "Every asset on Assetary right now is free to download. Paid listings and creator payouts are coming next.",
  },
];

export default async function Home() {
  const [assets, catalogStats] = await Promise.all([
    getApprovedAssets({ limit: 20 }),
    getCatalogStats(),
  ]);

  const stats = [
    { label: "Assets live", value: `${catalogStats.assetCount}` },
    { label: "Total downloads", value: `${catalogStats.totalDownloads}` },
    { label: "Categories", value: `${categories.length}` },
    { label: "Cost to browse", value: "Free" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </div>

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
              className="rounded-full border border-border/80 bg-background/40 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/40"
            >
              Upload yours
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
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

      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {trust.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <item.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
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
          {assets.length > 0 ? (
            assets.map((asset) => <AssetCard key={asset.id} asset={asset} />)
          ) : (
            <EmptyCatalog message="Nothing's been uploaded yet — be the first." />
          )}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <Compass className="mt-0.5 h-5 w-5 text-muted" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Can&apos;t find it here yet?</p>
              <p className="mt-1 text-sm text-muted">
                We point you to other good, free places for GFX resources — clearly labeled, never
                copied onto Assetary.
              </p>
            </div>
          </div>
          <Link
            href="/discover"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            Discover
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
