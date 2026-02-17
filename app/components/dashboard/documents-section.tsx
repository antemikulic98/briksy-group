"use client";

import { getDocumentDownloadUrl } from "@/lib/actions/documents";

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  createdAt: Date;
  uploadedBy: { name: string };
}

interface DocumentsSectionProps {
  documents: Document[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string): string {
  if (type.includes("pdf")) return "PDF";
  if (type.includes("image")) return "IMG";
  if (type.includes("word") || type.includes("document")) return "DOC";
  if (type.includes("sheet") || type.includes("excel")) return "XLS";
  return "FILE";
}

export default function ClientDocumentsSection({
  documents,
}: DocumentsSectionProps) {
  async function handleDownload(documentId: string, fileName: string) {
    try {
      const url = await getDocumentDownloadUrl(documentId);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  }

  if (documents.length === 0) {
    return (
      <p className="text-sm text-muted">Nema dokumenata za ovaj projekt.</p>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between rounded-lg border border-border p-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
              {getFileIcon(doc.type)}
            </div>
            <div>
              <button
                onClick={() => handleDownload(doc.id, doc.name)}
                className="text-sm font-medium text-foreground hover:text-accent hover:underline"
              >
                {doc.name}
              </button>
              <p className="text-xs text-muted">
                {formatFileSize(doc.size)} &middot;{" "}
                {new Date(doc.createdAt).toLocaleDateString("hr-HR")}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(doc.id, doc.name)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:bg-slate-50 hover:text-foreground"
          >
            Preuzmi
          </button>
        </div>
      ))}
    </div>
  );
}
