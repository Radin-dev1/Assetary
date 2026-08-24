import { mockAssets } from "@/lib/mock-assets";
import { BrowseGrid } from "@/components/browse-grid";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; free?: string }>;
}) {
  const { q, free } = await searchParams;

  let assets = mockAssets;
  if (q) {
    const query = q.toLowerCase();
    assets = assets.filter((a) => a.title.toLowerCase().includes(query));
  }
  if (free) {
    assets = assets.filter((a) => a.price === 0);
  }

  return <BrowseGrid title={q ? `Results for "${q}"` : "All assets"} assets={assets} />;
}
