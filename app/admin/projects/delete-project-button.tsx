"use client";

import { deleteProject } from "@/lib/actions/projects";

export default function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  async function handleDelete() {
    if (
      !confirm(
        "Jeste li sigurni? Ovo će obrisati projekt i sve njegove faze, komentare i dokumente."
      )
    )
      return;
    await deleteProject(projectId);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-700 hover:underline"
    >
      Obriši
    </button>
  );
}
