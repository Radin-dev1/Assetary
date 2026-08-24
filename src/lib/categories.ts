export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "hdris", name: "HDRIs", emoji: "🌅", description: "Environment lighting maps", image: "/images/categories/hdris.webp" },
  { slug: "2d-assets", name: "2D Assets", emoji: "🖌️", description: "Flat art, sprites, and UI graphics", image: "/images/categories/2d-assets.webp" },
  { slug: "3d-assets", name: "3D Assets", emoji: "🧊", description: "Models, props, and 3D set dressing", image: "/images/categories/3d-assets.webp" },
  { slug: "materials", name: "Material", emoji: "🎨", description: "Ready-made material setups", image: "/images/categories/materials.webp" },
  { slug: "scenes", name: "Scenes", emoji: "🏙️", description: "Full scene and environment files", image: "/images/categories/scenes.webp" },
  { slug: "templates", name: "Templates", emoji: "🖼️", description: "PSD and thumbnail templates", image: "/images/categories/templates.webp" },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
