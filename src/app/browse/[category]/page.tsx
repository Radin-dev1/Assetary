import { notFound } from "next/navigation";
import { getCategory, categories } from "@/lib/categories";
import { getAssetsByCategory } from "@/lib/mock-assets";
import { BrowseGrid } from "@/components/browse-grid";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const assets = getAssetsByCategory(slug);

  return (
    <BrowseGrid
      title={`${category.emoji} ${category.name}`}
      assets={assets}
      activeSlug={slug}
    />
  );
}
