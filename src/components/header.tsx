"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Upload, ChevronDown, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Logo } from "./logo";
import { useSession } from "@/lib/use-session";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const { user, profile } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  const displayName = profile?.username || user?.email?.split("@")[0] || "Account";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
          <Link href="/browse" className="transition-colors hover:text-foreground">
            Browse
          </Link>
          <Link href="/browse?free=1" className="transition-colors hover:text-foreground">
            Free
          </Link>
          <Link href="/discover" className="transition-colors hover:text-foreground">
            Discover
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>

        <form action="/browse" className="relative ml-auto hidden max-w-md flex-1 sm:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.75}
          />
          <input
            name="q"
            type="text"
            placeholder="Search HDRIs, 3D assets, templates..."
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
          />
        </form>

        <div className="ml-auto flex items-center gap-4 sm:ml-0">
          <Link
            href="/upload"
            className="hidden items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground sm:flex"
          >
            <Upload className="h-4 w-4" strokeWidth={1.75} />
            Upload
          </Link>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 text-xs">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt=""
                      width={24}
                      height={24}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )}
                </span>
                <span className="max-w-[8rem] truncate">{displayName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-sm transition-colors hover:bg-surface-2"
                  >
                    <LayoutDashboard className="h-4 w-4" strokeWidth={1.75} />
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 text-sm transition-colors hover:bg-surface-2"
                  >
                    <Settings className="h-4 w-4" strokeWidth={1.75} />
                    Profile settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 border-t border-border px-3.5 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-surface-2"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
