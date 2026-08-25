"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/setup-notice";

type OwnAsset = {
  id: string;
  title: string;
  category_slug: string;
  status: string;
  created_at: string;
  file_path: string;
  thumbnail_path: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [assets, setAssets] = useState<OwnAsset[] | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setEmail(user.email ?? null);

      const { data } = await supabase
        .from("assets")
        .select("id, title, category_slug, status, created_at, file_path, thumbnail_path")
        .eq("creator_id", user.id)
        .order("created_at", { ascending: false });

      setAssets(data ?? []);
    });
  }, [router]);

  async function handleDelete(asset: OwnAsset) {
    if (!confirm(`Delete "${asset.title}"? This can't be undone.`)) return;

    const supabase = createClient();
    await Promise.all([
      supabase.storage.from("assets").remove([asset.file_path]),
      asset.thumbnail_path
        ? supabase.storage.from("thumbnails").remove([asset.thumbnail_path])
        : Promise.resolve(),
    ]);

    const { error } = await supabase.from("assets").delete().eq("id", asset.id);
    if (!error) setAssets((prev) => prev?.filter((a) => a.id !== asset.id) ?? null);
  }

  if (!isSupabaseConfigured()) return <SetupNotice />;
  if (!email) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-24 text-center text-sm text-muted">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-xl font-semibold">Your dashboard</h1>
      <p className="mt-1 text-sm text-muted">Signed in as {email}</p>

      <h2 className="mt-8 text-sm font-medium text-muted">Your uploads</h2>
      <div className="mt-3 divide-y divide-border rounded-xl border border-border">
        {assets && assets.length > 0 ? (
          assets.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{a.title}</span>
              <div className="flex items-center gap-3">
                <span
                  className={
                    a.status === "approved"
                      ? "text-emerald-400"
                      : a.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {a.status}
                </span>
                <button
                  onClick={() => handleDelete(a)}
                  className="text-muted transition-colors hover:text-red-400"
                  aria-label="Delete asset"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted">
            You haven&apos;t uploaded anything yet.
          </p>
        )}
      </div>
    </div>
  );
}
