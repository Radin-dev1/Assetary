import { LogoMark } from "@/components/logo";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <LogoMark size={40} />
      <h1 className="mt-6 text-2xl font-semibold">About Assetary</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Assetary is a marketplace built for Roblox GFX creators — a place to find and share HDRIs,
        2D assets, 3D assets, materials, templates, and full scenes. Anyone can upload; every
        asset is checked before it goes live.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Right now Assetary is in its free-only launch phase — every asset on the site is free to
        download. Paid assets and creator payouts are coming in a later phase.
      </p>
    </div>
  );
}
