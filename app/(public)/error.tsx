"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10">
          <svg
            className="h-8 w-8 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Nešto je pošlo po krivu.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Došlo je do neočekivane greške. Pokušajte ponovno ili se vratite na
          početnu stranicu.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-white hover:bg-accent-dark"
          >
            Pokušaj ponovno
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border px-7 py-3.5 text-base font-medium hover:bg-gray-50"
          >
            Početna stranica
          </a>
        </div>
      </div>
    </div>
  );
}
