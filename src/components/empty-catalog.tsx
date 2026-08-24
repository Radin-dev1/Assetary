import Link from "next/link";
import { UploadCloud } from "lucide-react";

export function EmptyCatalog({ message = "No assets here yet." }: { message?: string }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      <UploadCloud className="h-6 w-6 text-muted" strokeWidth={1.5} />
      <p className="text-sm text-muted">{message}</p>
      <Link
        href="/upload"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Upload the first one
      </Link>
    </div>
  );
}
