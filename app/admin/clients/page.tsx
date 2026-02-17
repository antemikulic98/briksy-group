import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteClientButton from "./delete-client-button";

export const metadata = {
  title: "Klijenti",
};

const PAGE_SIZE = 10;

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const params = await searchParams;
  const search = params.search || "";
  const page = parseInt(params.page || "1");

  const where = {
    role: "CLIENT" as const,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [clients, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { projects: { select: { id: true, status: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Klijenti</h1>
        <Link
          href="/admin/clients/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Novi klijent
        </Link>
      </div>

      {/* Search */}
      <form className="mb-4">
        <input
          name="search"
          type="text"
          defaultValue={search}
          placeholder="Pretraži po imenu ili emailu..."
          className="w-full max-w-sm rounded-lg border border-border px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </form>

      {clients.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <p className="text-muted">
            {search ? `Nema rezultata za "${search}".` : "Nema klijenata."}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-left">
                  <th className="px-5 py-3 font-medium text-muted">Ime</th>
                  <th className="px-5 py-3 font-medium text-muted">Email</th>
                  <th className="px-5 py-3 text-center font-medium text-muted">
                    Projekti
                  </th>
                  <th className="px-5 py-3 font-medium text-muted">
                    Datum kreiranja
                  </th>
                  <th className="px-5 py-3 font-medium text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="hover:text-accent hover:underline"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-muted">{client.email}</td>
                    <td className="px-5 py-3 text-center">
                      {client.projects.length}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(client.createdAt).toLocaleDateString("hr-HR")}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DeleteClientButton clientId={client.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted">
                Prikazano {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, total)} od {total}
              </span>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/clients?${new URLSearchParams({
                      ...(search ? { search } : {}),
                      page: String(page - 1),
                    })}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-slate-50"
                  >
                    Prethodna
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/clients?${new URLSearchParams({
                      ...(search ? { search } : {}),
                      page: String(page + 1),
                    })}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-slate-50"
                  >
                    Sljedeća
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
