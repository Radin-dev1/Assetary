export type Asset = {
  id: string;
  title: string;
  categorySlug: string;
  creator: string;
  price: number; // 0 = free
  downloads: number;
  likes: number;
};
