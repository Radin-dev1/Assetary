export type ExternalSource = {
  name: string;
  domain: string;
  url: string;
  description: string;
  tags: string[];
};

export const externalSources: ExternalSource[] = [
  {
    name: "Poly Haven",
    domain: "polyhaven.com",
    url: "https://polyhaven.com/",
    description: "100% free, CC0 HDRIs, PBR textures, and 3D models. No signup required.",
    tags: ["HDRIs", "Textures", "Models"],
  },
  {
    name: "GFXRhino",
    domain: "gfxrhino.com",
    url: "https://gfxrhino.com/",
    description: "Free Blender lightroom presets and setups built specifically for Roblox GFX.",
    tags: ["Rigs", "Lighting", "Roblox"],
  },
  {
    name: "ForgeGUI",
    domain: "forgegui.com",
    url: "https://forgegui.com/",
    description: "Roblox UI kits, GUI components, and interface templates.",
    tags: ["Templates", "UI"],
  },
  {
    name: "ambientCG",
    domain: "ambientcg.com",
    url: "https://ambientcg.com/",
    description: "A large library of free, CC0 PBR materials and HDRIs.",
    tags: ["Textures", "Materials", "HDRIs"],
  },
  {
    name: "Sketchfab",
    domain: "sketchfab.com",
    url: "https://sketchfab.com/",
    description: "Browse and download free and paid 3D models from creators worldwide.",
    tags: ["Models", "Props", "Scenes"],
  },
  {
    name: "Gumroad",
    domain: "gumroad.com",
    url: "https://gumroad.com/",
    description: "Independent creators selling GFX packs, brushes, presets, and courses.",
    tags: ["Templates", "Materials", "Poses"],
  },
];
