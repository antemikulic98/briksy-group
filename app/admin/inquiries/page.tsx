import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MarkReadButton from "./mark-read-button";
import Link from "next/link";

export const metadata = {
  title: "Prijave",
};

const PAGE_SIZE = 10;

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const params = await searchParams;
  const search = params.search || "";
  const filter = params.filter || "";
  const page = parseInt(params.page || "1");

  const where = {
    ...(search
      ? {
          OR: [
            { company: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(filter === "unread" ? { read: false } : {}),
    ...(filter === "read" ? { read: true } : {}),
  };

  const [inquiries, total, unreadCount] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.inquiry.count({ where }),
    prisma.inquiry.count({ where: { read: false } }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">Prijave</h1>
        {unreadCount > 0 && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">
            {unreadCount} novo
          </span>
        )}
      </div>

      {/* Search + Filter */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <form>
          <input
            name="search"
            type="text"
            defaultValue={search}
            placeholder="Pretraži po firmi, imenu ili emailu..."
            className="w-72 rounded-lg border border-border px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent"
          />
          {filter && <input type="hidden" name="filter" value={filter} />}
        </form>
        <div className="flex gap-1">
          {[
            { label: "Sve", value: "" },
            { label: "Nepročitane", value: "unread" },
            { label: "Pročitane", value: "read" },
          ].map((f) => (
            <Link
              key={f.value}
              href={`/admin/inquiries?${new URLSearchParams({
                ...(search ? { search } : {}),
                ...(f.value ? { filter: f.value } : {}),
              })}`}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                filter === f.value
                  ? "bg-accent text-white"
                  : "border border-border text-muted hover:bg-slate-50"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <p className="text-muted">
            {search || filter
              ? "Nema rezultata za zadane filtere."
              : "Nema prijava."}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  inquiry.read
                    ? "border-border"
                    : "border-accent/30 bg-accent/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {inquiry.company}
                      </h3>
                      {!inquiry.read && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white">
                          Novo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">
                      {inquiry.name} &middot; {inquiry.email}
                      {inquiry.phone && ` · ${inquiry.phone}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted">
                      {new Date(inquiry.createdAt).toLocaleDateString("hr-HR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!inquiry.read && <MarkReadButton id={inquiry.id} />}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-slate-50 px-2.5 py-0.5 text-xs text-muted">
                    {inquiry.industry}
                  </span>
                  <span className="rounded-full border border-border bg-slate-50 px-2.5 py-0.5 text-xs text-muted">
                    {inquiry.companySize}
                  </span>
                  <span className="rounded-full border border-border bg-slate-50 px-2.5 py-0.5 text-xs text-muted">
                    {inquiry.budget}
                  </span>
                </div>

                <p className="mt-3 text-sm text-foreground">
                  {inquiry.message}
                </p>
              </div>
            ))}
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
                    href={`/admin/inquiries?${new URLSearchParams({
                      ...(search ? { search } : {}),
                      ...(filter ? { filter } : {}),
                      page: String(page - 1),
                    })}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-slate-50"
                  >
                    Prethodna
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/inquiries?${new URLSearchParams({
                      ...(search ? { search } : {}),
                      ...(filter ? { filter } : {}),
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
