import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold">Terms of service</h1>
      <p className="mt-2 text-sm text-muted">Last updated August 24, 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted">
        <p>
          Assetary is a marketplace for Roblox GFX assets — HDRIs, 2D and 3D assets, materials,
          scenes, and templates. By creating an account or using the site, you agree to these
          terms.
        </p>

        <div>
          <h2 className="text-base font-medium text-foreground">Accounts</h2>
          <p className="mt-2">
            You need an account to upload assets; browsing and downloading don&apos;t require
            one. You&apos;re responsible for what happens under your account, and for keeping your
            sign-in secure.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Uploading assets</h2>
          <p className="mt-2">
            You must own or have the rights to distribute anything you upload. By uploading, you
            grant Assetary a license to host, display, and let other users download that asset
            through the site. You keep ownership of your work. Uploads are reviewed before they go
            live — see our{" "}
            <Link href="/rules" className="text-foreground underline">
              community rules
            </Link>{" "}
            for what&apos;s not allowed.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Free-only launch</h2>
          <p className="mt-2">
            Every asset on Assetary is currently free to download. Paid listings and creator
            payouts are planned for a later phase — these terms will be updated when that
            launches.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Removal</h2>
          <p className="mt-2">
            We can remove any asset or account that violates our rules, infringes someone
            else&apos;s rights, or is reported and found to be harmful.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">No warranty</h2>
          <p className="mt-2">
            Assetary is provided as-is. We moderate uploads but can&apos;t guarantee every asset is
            free of issues — use downloaded files at your own discretion.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Reach out at{" "}
            <a
              href="mailto:kazemianhamidrezaabyaneh@gmail.com"
              className="text-foreground underline"
            >
              kazemianhamidrezaabyaneh@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
