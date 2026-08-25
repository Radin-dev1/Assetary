import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type CatalogAsset = {
  id: string;
  title: string;
  description: string;
  categorySlug: string;
  creatorName: string;
  price: number;
  downloadCount: number;
  likeCount: number;
  thumbnailUrl: string | null;
};

type AssetRow = {
  id: string;
  title: string;
  description: string;
  category_slug: string;
  price: number;
  download_count: number;
  like_count: number;
  thumbnail_path: string | null;
  creator: { username: string | null } | null;
};

function toCatalogAsset(row: AssetRow, supabase: ReturnType<typeof createClient>): CatalogAsset {
  const thumbnailUrl = row.thumbnail_path
    ? supabase.storage.from("thumbnails").getPublicUrl(row.thumbnail_path).data.publicUrl
    : null;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    categorySlug: row.category_slug,
    creatorName: row.creator?.username || "creator",
    price: Number(row.price),
    downloadCount: row.download_count,
    likeCount: row.like_count,
    thumbnailUrl,
  };
}

const ASSET_COLUMNS =
  "id, title, description, category_slug, price, download_count, like_count, thumbnail_path, creator:profiles!assets_creator_id_fkey(username)";

export async function getApprovedAssets(
  opts: { categorySlug?: string; q?: string; limit?: number } = {}
): Promise<CatalogAsset[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  let query = supabase
    .from("assets")
    .select(ASSET_COLUMNS)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (opts.categorySlug) query = query.eq("category_slug", opts.categorySlug);
  if (opts.q) query = query.ilike("title", `%${opts.q}%`);
  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query.returns<AssetRow[]>();
  if (error || !data) return [];

  return data.map((row) => toCatalogAsset(row, supabase));
}

export async function getAssetById(id: string): Promise<CatalogAsset | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("assets")
    .select(ASSET_COLUMNS)
    .eq("id", id)
    .eq("status", "approved")
    .single()
    .returns<AssetRow>();

  if (error || !data) return null;
  return toCatalogAsset(data, supabase);
}

export async function getCatalogStats() {
  if (!isSupabaseConfigured()) return { assetCount: 0, totalDownloads: 0 };

  const supabase = createClient();
  const [{ count }, { data }] = await Promise.all([
    supabase.from("assets").select("id", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("assets").select("download_count").eq("status", "approved"),
  ]);

  const totalDownloads = (data ?? []).reduce(
    (sum, row: { download_count: number }) => sum + (row.download_count ?? 0),
    0
  );

  return { assetCount: count ?? 0, totalDownloads };
}

export type AssetComment = {
  id: string;
  body: string;
  createdAt: string;
  authorId: string;
  authorName: string;
};

export async function getComments(assetId: string): Promise<AssetComment[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, body, created_at, user_id, author:profiles!comments_user_id_fkey(username)")
    .eq("asset_id", assetId)
    .order("created_at", { ascending: false })
    .returns<
      {
        id: string;
        body: string;
        created_at: string;
        user_id: string;
        author: { username: string | null } | null;
      }[]
    >();

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    body: row.body,
    createdAt: row.created_at,
    authorId: row.user_id,
    authorName: row.author?.username || "creator",
  }));
}
