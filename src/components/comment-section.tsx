"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { getComments, type AssetComment } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/lib/use-session";

export function CommentSection({ assetId }: { assetId: string }) {
  const { user, profile } = useSession();
  const [comments, setComments] = useState<AssetComment[]>([]);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    getComments(assetId).then(setComments);
  }, [assetId]);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !body.trim()) return;

    setPosting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("comments")
      .insert({ asset_id: assetId, user_id: user.id, body: body.trim() });

    if (!error) {
      setBody("");
      getComments(assetId).then(setComments);
    }
    setPosting(false);
  }

  async function handleDelete(commentId: string) {
    const supabase = createClient();
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <div className="mt-16">
      <h2 className="text-lg font-semibold">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {user ? (
        <form onSubmit={handlePost} className="mt-4 flex flex-col gap-2">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Leave a comment..."
            rows={2}
            maxLength={1000}
            className="resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-muted focus:border-foreground/40"
          />
          <button
            type="submit"
            disabled={posting || !body.trim()}
            className="self-end rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {posting ? "Posting..." : "Post comment"}
          </button>
        </form>
      ) : (
        <p className="mt-3 text-sm text-muted">
          <Link href="/login" className="underline">
            Log in
          </Link>{" "}
          to leave a comment.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted">No comments yet — be the first.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex items-start justify-between gap-3 text-sm">
            <div>
              <p className="font-medium">{c.authorName}</p>
              <p className="mt-0.5 whitespace-pre-line text-foreground/90">{c.body}</p>
            </div>
            {user?.id &&
              (c.authorId === user.id || profile?.role === "mod" || profile?.role === "admin") && (
              <button
                onClick={() => handleDelete(c.id)}
                className="shrink-0 text-muted transition-colors hover:text-red-400"
                aria-label="Delete comment"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
