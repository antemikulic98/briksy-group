"use client";

import { addComment } from "@/lib/actions/comments";
import { useState } from "react";
import { Role } from "@prisma/client";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: { name: string; role: Role };
}

interface CommentsSectionProps {
  projectId: string;
  comments: Comment[];
}

export default function CommentsSection({
  projectId,
  comments,
}: CommentsSectionProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    await addComment(projectId, content);
    setContent("");
    setLoading(false);
  }

  function timeAgo(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "upravo";
    if (minutes < 60) return `prije ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `prije ${hours}h`;
    const days = Math.floor(hours / 24);
    return `prije ${days}d`;
  }

  return (
    <div>
      {/* Comment list */}
      {comments.length > 0 && (
        <div className="mb-4 space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  comment.user.role === "ADMIN" ? "bg-accent" : "bg-slate-500"
                }`}
              >
                {comment.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {comment.user.name}
                  </span>
                  {comment.user.role === "ADMIN" && (
                    <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                      Admin
                    </span>
                  )}
                  <span className="text-xs text-muted">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Napišite komentar..."
          className="min-w-0 flex-1 rounded-lg border border-border px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="shrink-0 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
        >
          {loading ? "..." : "Pošalji"}
        </button>
      </form>
    </div>
  );
}
