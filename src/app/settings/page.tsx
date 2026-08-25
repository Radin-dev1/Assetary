"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupNotice } from "@/components/setup-notice";
import type { User } from "@supabase/supabase-js";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      setUsername(data?.username ?? "");
      setAvatarUrl(data?.avatar_url ?? null);
    });
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setMessage(null);
    const supabase = createClient();

    let nextAvatarUrl = avatarUrl;

    if (avatarFile) {
      const path = `${user.id}/${Date.now()}-${avatarFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, avatarFile, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }

      nextAvatarUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username: username.trim() || null, avatar_url: nextAvatarUrl })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setAvatarUrl(nextAvatarUrl);
    setAvatarFile(null);
    setMessage("Saved.");
    setSaving(false);
  }

  if (!isSupabaseConfigured()) return <SetupNotice />;

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-24 text-center text-sm text-muted">
        Loading...
      </div>
    );
  }

  const previewUrl = avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-14 sm:px-6">
      <h1 className="text-xl font-semibold">Profile settings</h1>
      <p className="mt-1 text-sm text-muted">Signed in as {user.email}</p>

      <form onSubmit={handleSave} className="mt-8 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2 text-xl">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              (username || user.email || "?").charAt(0).toUpperCase()
            )}
          </span>
          <label className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40">
            <UploadCloud className="h-4 w-4" strokeWidth={1.75} />
            Change avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-muted">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {message && <p className="text-sm text-emerald-400">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
