"use client";

import { deleteClient } from "@/lib/actions/clients";

export default function DeleteClientButton({
  clientId,
}: {
  clientId: string;
}) {
  async function handleDelete() {
    if (!confirm("Jeste li sigurni? Ovo će obrisati klijenta i sve njegove projekte."))
      return;
    await deleteClient(clientId);
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
