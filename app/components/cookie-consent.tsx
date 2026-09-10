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

function Toggle({
  checked,
  disabled = false,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-gray-300"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }

    function handleReopen() {
      setAnalytics(getCookie(COOKIE_NAME) === "accepted");
      setShowSettings(true);
      setVisible(true);
    }
    window.addEventListener("reopen-cookie-consent", handleReopen);
    return () => window.removeEventListener("reopen-cookie-consent", handleReopen);
  }, []);

  function save(analyticsAccepted: boolean) {
    const previous = getCookie(COOKIE_NAME);
    setCookie(
      COOKIE_NAME,
      analyticsAccepted ? "accepted" : "rejected",
      COOKIE_MAX_AGE
    );
    setVisible(false);
    setShowSettings(false);
    window.dispatchEvent(new Event("cookie-consent-update"));

    // Povlačenje privole — reload da se već učitani GA stvarno ugasi
    if (previous === "accepted" && !analyticsAccepted) {
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Koristimo kolačiće za analitiku kako bismo poboljšali vaše iskustvo
            na stranici. Vaše podatke ne koristimo u marketinške svrhe. Više u{" "}
            <a
              href="/privatnost"
              className="font-medium text-accent hover:underline"
            >
              politici privatnosti
            </a>
            .
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="cursor-pointer text-sm font-medium text-muted underline-offset-2 hover:text-foreground hover:underline"
            >
              Postavke
            </button>
            <button
              onClick={() => save(false)}
              className="cursor-pointer rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground"
            >
              Odbij sve
            </button>
            <button
              onClick={() => save(true)}
              className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Prihvati sve
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-white p-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Nužni kolačići
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Potrebni za osnovni rad stranice — pamćenje vašeg odabira
                    kolačića i prijavu u klijentski portal. Ne mogu se
                    isključiti.
                  </p>
                </div>
                <Toggle checked disabled label="Nužni kolačići" />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-white p-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Analitički kolačići
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Google Analytics — anonimizirani podaci o posjetima koji
                    nam pomažu poboljšati stranicu.
                  </p>
                </div>
                <Toggle
                  checked={analytics}
                  onChange={setAnalytics}
                  label="Analitički kolačići"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => save(analytics)}
                className="cursor-pointer rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Spremi odabir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
