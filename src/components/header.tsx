import Link from "next/link";
import { Logo } from "./logo";
import { Search, Upload, User } from "lucide-react";

export function Header() {
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
            placeholder="Search rigs, HDRIs, poses..."
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Link
            href="/upload"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm transition-colors hover:border-foreground/40 sm:flex"
          >
            <Upload className="h-4 w-4" strokeWidth={1.75} />
            Upload
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <User className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
