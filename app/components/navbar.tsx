"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function IconDigitalizacija() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconUsluge() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-3.5 w-3.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop mega-dropdown                                              */
/* ------------------------------------------------------------------ */

function UslugeDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const paths = ["/digitalizacija", "/ai", "/usluge"];
  const isActive = paths.includes(pathname);

  function enter() { clearTimeout(timeout.current); setOpen(true); }
  function leave() { timeout.current = setTimeout(() => setOpen(false), 150); }
  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-foreground ${
          isActive ? "font-medium text-foreground" : "text-muted"
        }`}
      >
        Usluge
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute -left-4 top-full z-50 pt-3 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-[520px] overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/[0.08]">
          <div className="p-2">
            <Link
              href="/digitalizacija"
              onClick={() => setOpen(false)}
              className={`group flex items-start gap-4 rounded-lg p-3.5 transition-colors hover:bg-slate-50 ${
                pathname === "/digitalizacija" ? "bg-slate-50" : ""
              }`}
            >
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                pathname === "/digitalizacija" ? "bg-accent text-white" : "bg-accent/10 text-accent"
              }`}>
                <IconDigitalizacija />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${pathname === "/digitalizacija" ? "text-accent" : "text-foreground"}`}>
                    Digitalizacija poslovanja
                  </span>
                  <IconArrow />
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">
                  Zamjena ručnih procesa digitalnim sustavima. Smanjite troškove i povećajte produktivnost.
                </p>
              </div>
            </Link>

            <Link
              href="/ai"
              onClick={() => setOpen(false)}
              className={`group flex items-start gap-4 rounded-lg p-3.5 transition-colors hover:bg-slate-50 ${
                pathname === "/ai" ? "bg-slate-50" : ""
              }`}
            >
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                pathname === "/ai" ? "bg-accent text-white" : "bg-accent/10 text-accent"
              }`}>
                <IconAI />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${pathname === "/ai" ? "text-accent" : "text-foreground"}`}>
                    AI u poslovanju
                  </span>
                  <IconArrow />
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">
                  Implementacija umjetne inteligencije tamo gdje donosi stvarnu uštedu vremena i novca.
                </p>
              </div>
            </Link>
          </div>

          <div className="border-t border-border bg-slate-50/80 px-2 py-2">
            <Link
              href="/usluge"
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3.5 py-3 transition-colors hover:bg-white ${
                pathname === "/usluge" ? "bg-white" : ""
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                pathname === "/usluge" ? "bg-accent text-white" : "bg-white text-accent shadow-sm"
              }`}>
                <IconUsluge />
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium ${pathname === "/usluge" ? "text-accent" : "text-foreground"}`}>
                  Sve usluge
                </span>
                <span className="ml-1.5 text-xs text-muted">— kompletna ponuda</span>
              </div>
              <IconArrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProizvodiDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isActive = pathname === "/briksy";

  function enter() { clearTimeout(timeout.current); setOpen(true); }
  function leave() { timeout.current = setTimeout(() => setOpen(false), 150); }
  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-foreground ${
          isActive ? "font-medium text-foreground" : "text-muted"
        }`}
      >
        Proizvodi
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute -left-4 top-full z-50 pt-3 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-[380px] overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/[0.08]">
          <div className="p-2">
            <Link
              href="/briksy"
              onClick={() => setOpen(false)}
              className={`group flex items-start gap-4 rounded-lg p-3.5 transition-colors hover:bg-slate-50 ${
                pathname === "/briksy" ? "bg-slate-50" : ""
              }`}
            >
              <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
                <Image
                  src="/img/logo.svg"
                  alt="Briksy logo"
                  width={36}
                  height={22}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${pathname === "/briksy" ? "text-accent" : "text-foreground"}`}>
                    Briksy
                  </span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    Flagship
                  </span>
                  <IconArrow />
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">
                  Prva aplikacija koja spaja financije, realizaciju i robno-materijalno za građevinske kompanije.
                </p>
              </div>
            </Link>
          </div>

          <div className="border-t border-border bg-slate-50/80 px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Više proizvoda uskoro</span>
              <a
                href="https://briksy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                briksy.com
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile                                                             */
/* ------------------------------------------------------------------ */

function MobileSection({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
      >
        {title}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-4 space-y-0.5 border-l-2 border-accent/20 pl-4 pb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavLink({ href, label, description, pathname }: { href: string; label: string; description: string; pathname: string }) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 ${
        pathname === href ? "bg-gray-50" : ""
      }`}
    >
      <div className={`text-sm font-medium ${pathname === href ? "text-accent" : "text-foreground"}`}>
        {label}
      </div>
      <div className="mt-0.5 text-xs text-muted">{description}</div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Navbar                                                        */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            B
          </div>
          <span className="text-lg font-bold tracking-tight">
            briksy<span className="text-accent">.</span>group
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center lg:flex">
          <UslugeDropdown pathname={pathname} />
          <ProizvodiDropdown pathname={pathname} />
          <Link
            href="/o-nama"
            className={`rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-foreground ${
              pathname === "/o-nama" ? "font-medium text-foreground" : "text-muted"
            }`}
          >
            O nama
          </Link>
          <Link
            href="/kontakt"
            className={`rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-foreground ${
              pathname === "/kontakt" ? "font-medium text-foreground" : "text-muted"
            }`}
          >
            Kontakt
          </Link>

          <div className="ml-5 h-5 w-px bg-border" />

          <Link
            href="/login"
            className="ml-4 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
          >
            Portal
          </Link>
          <Link
            href="/kontakt"
            className="ml-2 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Dogovorite analizu
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            href="/kontakt"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Kontakt
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-gray-50"
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

      {/* Mobile menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-[65px] z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 right-0 top-[65px] z-50 max-h-[calc(100dvh-65px)] overflow-y-auto border-b border-border bg-white lg:hidden">
            <div className="mx-auto max-w-7xl px-6 py-3">
              <div className="space-y-0.5">
                <MobileSection title="Usluge">
                  <MobileNavLink href="/digitalizacija" label="Digitalizacija" description="Digitalna transformacija poslovanja" pathname={pathname} />
                  <MobileNavLink href="/ai" label="AI u poslovanju" description="Implementacija umjetne inteligencije" pathname={pathname} />
                  <MobileNavLink href="/usluge" label="Sve usluge" description="Kompletna ponuda" pathname={pathname} />
                </MobileSection>

                <MobileSection title="Proizvodi">
                  <Link
                    href="/briksy"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 ${
                      pathname === "/briksy" ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white">
                      <Image src="/img/logo.svg" alt="Briksy" width={24} height={15} className="object-contain" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${pathname === "/briksy" ? "text-accent" : "text-foreground"}`}>Briksy</div>
                      <div className="text-xs text-muted">Softver za građevinarstvo</div>
                    </div>
                  </Link>
                </MobileSection>

                <Link
                  href="/o-nama"
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    pathname === "/o-nama" ? "text-accent" : "text-foreground"
                  }`}
                >
                  O nama
                </Link>
                <Link
                  href="/kontakt"
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    pathname === "/kontakt" ? "text-accent" : "text-foreground"
                  }`}
                >
                  Kontakt
                </Link>
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

              <div className="mt-3 space-y-2 border-t border-border pt-3 pb-1">
                <a href="mailto:info@briksy.com" className="flex items-center gap-3 px-4 text-sm text-muted">
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@briksy.com
                </a>
                <a href="tel:+385955419712" className="flex items-center gap-3 px-4 text-sm text-muted">
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
