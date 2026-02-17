import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/dashboard/sidebar";

const clientLinks = [
  { href: "/dashboard", label: "Projekti" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        links={clientLinks}
        userName={session.user.name}
        userRole={session.user.role}
      />
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
