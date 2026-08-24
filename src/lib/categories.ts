export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "rigs", name: "Rigs", emoji: "🦴", description: "Character rigs ready to pose" },
  { slug: "hdris", name: "HDRIs", emoji: "🌅", description: "Environment lighting maps" },
  { slug: "poses", name: "Poses", emoji: "🧍", description: "Pose libraries and pose packs" },
  { slug: "textures", name: "Textures", emoji: "🧱", description: "Surface and material textures" },
  { slug: "materials", name: "Materials", emoji: "🎨", description: "Ready-made material setups" },
  { slug: "props", name: "Props", emoji: "📦", description: "3D props and set dressing" },
  { slug: "templates", name: "Templates", emoji: "🖼️", description: "PSD and thumbnail templates" },
  { slug: "scenes", name: "Scenes", emoji: "🏙️", description: "Full scene and environment files" },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
