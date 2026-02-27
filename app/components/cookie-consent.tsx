"use client";

import { useState, useEffect } from "react";

const COOKIE_NAME = "cookie-consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookie(COOKIE_NAME, "accepted", COOKIE_MAX_AGE);
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-update"));
  }

  function reject() {
    setCookie(COOKIE_NAME, "rejected", COOKIE_MAX_AGE);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          Koristimo kolačiće za analitiku kako bismo poboljšali vaše iskustvo na
          stranici. Vaši podaci se ne dijele s trećim stranama.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={reject}
            className="cursor-pointer rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
          >
            Odbij
          </button>
          <button
            onClick={accept}
            className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Prihvati
          </button>
        </div>
      </div>
    </div>
  );
}
