import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/categories";

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/browse/${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-border"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 12vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      <div className="relative flex flex-col items-center gap-1 pb-3 text-center">
        <span className="text-xl">{category.emoji}</span>
        <span className="text-sm font-medium">{category.name}</span>
      </div>
    </Link>
  );
}
