import type { Asset } from "./types";
import { categories } from "./categories";

const names = [
  "Cinematic Studio Rig",
  "Golden Hour HDRI Pack",
  "Dynamic Action Pose Set",
  "Weathered Metal Texture",
  "Glass Shader Material",
  "Sci-Fi Crate Prop",
  "Thumbnail Template Vol.3",
  "Rooftop City Scene",
  "Soft Fabric Material",
  "Neon Sign Prop Pack",
  "Basic Male Rig Pro",
  "Overcast Sky HDRI",
];
const creators = ["nova.gfx", "pixelforge", "studioRD", "haze3d", "kitbash_kid", "renderwolf"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const mockAssets: Asset[] = Array.from({ length: 40 }).map((_, i) => {
  const category = categories[i % categories.length];
  const r1 = seededRandom(i + 1);
  const r2 = seededRandom(i + 50);
  const r3 = seededRandom(i + 100);
  return {
    id: `asset-${i + 1}`,
    title: names[i % names.length],
    categorySlug: category.slug,
    creator: creators[i % creators.length],
    price: r1 > 0.72 ? Math.round(r1 * 20) : 0,
    downloads: Math.floor(r2 * 5000),
    likes: Math.floor(r3 * 400),
  };
});

export function getAssetsByCategory(slug: string) {
  return mockAssets.filter((a) => a.categorySlug === slug);
}

export function getAsset(id: string) {
  return mockAssets.find((a) => a.id === id);
}
