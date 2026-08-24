export function SetupNotice() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-2 px-4 py-24 text-center">
      <p className="font-medium">Supabase isn&apos;t connected yet</p>
      <p className="text-sm text-muted">
        Add your Supabase project URL and anon key to <code>.env.local</code> (see{" "}
        <code>.env.example</code>) to enable accounts, uploads, and moderation.
      </p>
    </div>
  );
}
