import { notFound } from "next/navigation";
import { getCategory, categories } from "@/lib/categories";
import { CategoryBrowseClient } from "./category-browse-client";

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

  return <CategoryBrowseClient category={category} />;
}
