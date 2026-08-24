import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/setup-notice";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: assets } = await supabase
    .from("assets")
    .select("id, title, category_slug, status, created_at")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-xl font-semibold">Your dashboard</h1>
      <p className="mt-1 text-sm text-muted">Signed in as {user.email}</p>

      <h2 className="mt-8 text-sm font-medium text-muted">Your uploads</h2>
      <div className="mt-3 divide-y divide-border rounded-xl border border-border">
        {assets && assets.length > 0 ? (
          assets.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{a.title}</span>
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
