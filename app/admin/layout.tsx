import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/dashboard/sidebar";

const adminLinks = [
  { href: "/admin", label: "Pregled" },
  { href: "/admin/clients", label: "Klijenti" },
  { href: "/admin/projects", label: "Projekti" },
  { href: "/admin/inquiries", label: "Prijave" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        links={adminLinks}
        userName={session.user.name}
        userRole={session.user.role}
      />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-8">{children}</div>
      </main>
    </div>
  );
}
