"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/o-nama", label: "Kako radimo" },
  { href: "/digitalizacija", label: "Digitalizacija" },
  { href: "/ai", label: "AI u poslovanju" },
  { href: "/briksy", label: "Briksy" },
  { href: "/usluge", label: "Usluge" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            B
          </div>
          <span className="text-xl font-bold tracking-tight">
            briksy<span className="text-accent">.</span>group
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-foreground ${
                pathname === link.href ? "font-medium text-foreground" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4 h-6 w-px bg-border" />
          <Link
            href="/login"
            className="ml-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
          >
            Portal
          </Link>
          <Link
            href="/kontakt"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Kontaktirajte nas
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/kontakt"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Kontakt
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-gray-50"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
          >
            <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-border" />

      {/* Mobile menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-[81px] z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 right-0 top-[81px] z-50 border-b border-border bg-white lg:hidden">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                      pathname === link.href
                        ? "font-medium text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <Link
                  href="/login"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Prijava u portal
                </Link>
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <a
                  href="mailto:info@briksy.com"
                  className="flex items-center gap-3 px-4 text-sm text-muted"
                >
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@briksy.com
                </a>
                <a
                  href="tel:+385955419712"
                  className="flex items-center gap-3 px-4 text-sm text-muted"
                >
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +385 95 541 9712
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
