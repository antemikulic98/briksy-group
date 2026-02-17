"use client";

import {
  getUploadUrl,
  getDocumentDownloadUrl,
  deleteDocument,
} from "@/lib/actions/documents";
import { useState } from "react";

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  createdAt: Date;
  uploadedBy: { name: string };
}

interface DocumentsSectionProps {
  projectId: string;
  documents: Document[];
  canDelete?: boolean;
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

export default function DocumentsSection({
  projectId,
  documents,
  canDelete = true,
}: DocumentsSectionProps) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { uploadUrl } = await getUploadUrl(
        projectId,
        file.name,
        file.type,
        file.size
      );

      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload nije uspio. Pokušajte ponovo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

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

  async function handleDelete(documentId: string) {
    if (!confirm("Jeste li sigurni da želite obrisati ovaj dokument?")) return;
    await deleteDocument(documentId);
  }

  return (
    <div>
      {documents.length > 0 && (
        <div className="mb-4 space-y-2">
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
                    {formatFileSize(doc.size)} &middot; {doc.uploadedBy.name} &middot;{" "}
                    {new Date(doc.createdAt).toLocaleDateString("hr-HR")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc.id, doc.name)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:bg-slate-50 hover:text-foreground"
                >
                  Preuzmi
                </button>
                {canDelete && (
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"
                  >
                    Obriši
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <label
        className={`flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-accent hover:text-accent ${
          uploading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? "Uploadanje..." : "+ Upload dokumenta"}
      </label>
    </div>
  );
}
