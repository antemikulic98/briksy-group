"use client";

import { markAsRead } from "@/lib/actions/inquiries";

export default function MarkReadButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => markAsRead(id)}
      className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:bg-slate-50 hover:text-foreground"
    >
      Označi kao pročitano
    </button>
  );
}
