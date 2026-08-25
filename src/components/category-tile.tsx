import Link from "next/link";
import type { Category } from "@/lib/categories";

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/browse/${category.slug}`}
      className="group flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-surface text-center transition-colors hover:border-foreground/40"
    >
      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
        {category.emoji}
      </span>
      <span className="text-sm font-medium">{category.name}</span>
    </Link>
  );
}
