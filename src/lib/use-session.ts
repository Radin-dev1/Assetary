"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  role: string;
};

export function useSession() {
  const [user, setUser] = useState<User | null | undefined>(() =>
    isSupabaseConfigured() ? undefined : null
  );
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();

    async function loadProfile(userId: string) {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, role")
        .eq("id", userId)
        .single();
      setProfile(data ?? null);
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) loadProfile(user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      else setProfile(null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, profile, loading: user === undefined };
}
