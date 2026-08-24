import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ModQueuePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "mod" && profile?.role !== "admin") redirect("/dashboard");

  const { data: pending } = await supabase
    .from("assets")
    .select("id, title, category_slug, creator_id, ai_mod_result, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-xl font-semibold">Mod queue</h1>
      <p className="mt-1 text-sm text-muted">
        Assets the AI moderator flagged as uncertain, waiting on a human call.
      </p>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {pending && pending.length > 0 ? (
          pending.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <p>{a.title}</p>
                <p className="text-xs text-muted">{a.category_slug}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-foreground/40">
                  Reject
                </button>
                <button className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background transition-opacity hover:opacity-85">
                  Approve
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted">Queue is empty. Nice.</p>
        )}
      </div>
    </div>
  );
}
