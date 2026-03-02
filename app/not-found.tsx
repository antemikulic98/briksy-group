import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
          <span className="text-2xl font-bold text-white">B</span>
          <span className="text-2xl font-bold text-white/60">.</span>
        </div>

        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Stranica nije pronađena.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Stranica koju tražite ne postoji ili je premještena. Provjerite URL ili
          se vratite na početnu stranicu.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
          >
            Početna stranica
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
          >
            Kontaktirajte nas
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/usluge"
            className="text-sm text-muted hover:text-accent"
          >
            Usluge
          </Link>
          <Link
            href="/o-nama"
            className="text-sm text-muted hover:text-accent"
          >
            O nama
          </Link>
          <Link
            href="/briksy"
            className="text-sm text-muted hover:text-accent"
          >
            Briksy
          </Link>
          <Link href="/ai" className="text-sm text-muted hover:text-accent">
            AI
          </Link>
        </div>
      </div>
    </div>
  );
}
