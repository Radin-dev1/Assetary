import Link from "next/link";
import type { Category } from "@/lib/categories";

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/browse/${category.slug}`}
      className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-surface px-4 py-5 text-center transition-colors hover:border-foreground/30 hover:bg-surface-2"
    >
      <span className="text-2xl">{category.emoji}</span>
      <span className="text-sm font-medium">{category.name}</span>
    </Link>
  );
}
