"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

interface SidebarLink {
  href: string;
  label: string;
}

interface SidebarProps {
  links: SidebarLink[];
  userName: string;
  userRole: string;
}

export default function Sidebar({ links, userName, userRole }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
          B
        </div>
        <span className="font-semibold text-foreground">Briksy Group</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              link.href !== "/admin" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-accent/5 font-medium text-accent"
                  : "text-muted hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-border p-4">
        <div className="mb-3">
          <div className="text-sm font-medium text-foreground">{userName}</div>
          <div className="text-xs text-muted">
            {userRole === "ADMIN" ? "Administrator" : "Klijent"}
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:bg-slate-50 hover:text-foreground"
          >
            Odjava
          </button>
        </form>
      </div>
    </aside>
  );
}
