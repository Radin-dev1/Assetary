export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated August 24, 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted">
        <p>
          Assetary is a small, independently-run marketplace for Roblox GFX assets. This page
          explains what data we collect and how it&apos;s used, in plain language.
        </p>

        <div>
          <h2 className="text-base font-medium text-foreground">What we collect</h2>
          <p className="mt-2">
            When you create an account, we store your email address and, if you sign in with
            Discord or Google, the basic profile info those providers share (name, avatar,
            email). If you upload an asset, we store the files you upload and the listing details
            you write. Account data and uploaded files are stored with our infrastructure
            provider, Supabase.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">How we use it</h2>
          <p className="mt-2">
            Your account data is used to run your account — signing you in, showing your uploads
            on your dashboard, and moderating submissions before they go live. We don&apos;t sell
            your data, and we don&apos;t run ad trackers or third-party analytics on the site.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Sign-in providers</h2>
          <p className="mt-2">
            If you sign in with Discord or Google, authentication is handled directly by that
            provider and by Supabase Auth on our behalf. We never see or store your password for
            those accounts.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Cookies and storage</h2>
          <p className="mt-2">
            Assetary keeps you signed in using your browser&apos;s local storage rather than
            tracking cookies. Clearing your browser storage will sign you out.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Your data</h2>
          <p className="mt-2">
            You can delete assets you&apos;ve uploaded at any time from your dashboard. To delete
            your account entirely or request a copy of your data, email us and we&apos;ll handle
            it directly.
          </p>
        </div>

        <div>
          <h2 className="text-base font-medium text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Reach out at{" "}
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
