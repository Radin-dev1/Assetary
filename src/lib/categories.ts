export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "rigs", name: "Rigs", emoji: "🦴", description: "Character rigs ready to pose", image: "/images/categories/rigs.webp" },
  { slug: "hdris", name: "HDRIs", emoji: "🌅", description: "Environment lighting maps", image: "/images/categories/hdris.webp" },
  { slug: "poses", name: "Poses", emoji: "🧍", description: "Pose libraries and pose packs", image: "/images/categories/poses.webp" },
  { slug: "textures", name: "Textures", emoji: "🧱", description: "Surface and material textures", image: "/images/categories/textures.webp" },
  { slug: "materials", name: "Materials", emoji: "🎨", description: "Ready-made material setups", image: "/images/categories/materials.webp" },
  { slug: "props", name: "Props", emoji: "📦", description: "3D props and set dressing", image: "/images/categories/props.webp" },
  { slug: "templates", name: "Templates", emoji: "🖼️", description: "PSD and thumbnail templates", image: "/images/categories/templates.webp" },
  { slug: "scenes", name: "Scenes", emoji: "🏙️", description: "Full scene and environment files", image: "/images/categories/scenes.webp" },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
