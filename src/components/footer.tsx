import Link from "next/link";
import { LogoMark } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-2.5">
          <LogoMark size={22} className="mt-0.5" />
          <div>
            <p className="text-sm font-medium">assetary</p>
            <p className="mt-1 max-w-xs text-sm text-muted">
              Free and paid GFX assets for Roblox creators — HDRIs, 2D and 3D assets, materials, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="text-muted">Explore</p>
            <Link href="/browse" className="hover:text-muted/80">
              Browse
            </Link>
            <Link href="/upload" className="hover:text-muted/80">
              Upload
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted">Community</p>
            <Link href="/about" className="hover:text-muted/80">
              About
            </Link>
            <Link href="/rules" className="hover:text-muted/80">
              Rules
            </Link>
            <Link href="/privacy" className="hover:text-muted/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-muted/80">
              Terms
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted">Account</p>
            <Link href="/login" className="hover:text-muted/80">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-muted/80">
              Create account
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Assetary. Built by creators, for creators.
      </div>
    </footer>
  );
}
