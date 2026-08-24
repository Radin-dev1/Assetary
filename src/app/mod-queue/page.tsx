"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/setup-notice";

type PendingAsset = {
  id: string;
  title: string;
  category_slug: string;
  creator_id: string;
  ai_mod_result: unknown;
  created_at: string;
};

export default function ModQueuePage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [pending, setPending] = useState<PendingAsset[] | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "mod" && profile?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      setAllowed(true);

      const { data } = await supabase
        .from("assets")
        .select("id, title, category_slug, creator_id, ai_mod_result, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: true });

      setPending(data ?? []);
    });
  }, [router]);

  if (!isSupabaseConfigured()) return <SetupNotice />;
  if (!allowed) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-24 text-center text-sm text-muted">
        Loading...
      </div>
    );
  }

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
