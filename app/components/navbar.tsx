"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/usluge", label: "Usluge" },
  { href: "/o-nama", label: "Kako radimo" },
  { href: "/briksy", label: "Briksy" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Briksy Group — početna">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
            B
          </div>
          <span className="text-base font-semibold tracking-tight">
            Briksy Group
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3.5 py-2 text-sm transition-colors hover:text-foreground ${
                isActive(l.href) ? "font-medium text-foreground" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-3 rounded-full bg-accent px-4.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Zatražite sastanak
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={open}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 right-0 top-16 z-50 border-b border-border bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-6 py-4">
              <div className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-3 text-base ${
                      isActive(l.href) ? "font-medium text-foreground" : "text-muted"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Zatražite sastanak
              </Link>
              <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm text-muted">
                <a href="mailto:info@briksygroup.com" className="hover:text-foreground">info@briksygroup.com</a>
                <a href="tel:+385955419712" className="hover:text-foreground">+385 95 541 9712</a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
