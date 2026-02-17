"use client";

import { useState } from "react";

export default function InvoiceMockup() {
  const [tab, setTab] = useState<"pregled" | "distribucija">("pregled");

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm">
      {/* Header badges */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-0.5 text-xs font-medium text-accent">
          Račun - roba
        </span>
        <span className="rounded-full border border-red-200 bg-red-50 px-3 py-0.5 text-xs font-medium text-red-600">
          Neplaćeno
        </span>
      </div>

      {/* Invoice number */}
      <div className="mb-1 text-xl font-bold">
        63/V03/1{" "}
        <span className="text-sm font-normal text-muted">URA: 207/2026</span>
      </div>
      <div className="text-sm text-muted">DOBAVLJAČ MATERIJALA D.O.O.</div>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border">
        <button
          onClick={() => setTab("pregled")}
          className={`px-4 pb-2 text-sm transition-colors ${
            tab === "pregled"
              ? "border-b-2 border-accent font-medium text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Pregled
        </button>
        <button
          onClick={() => setTab("distribucija")}
          className={`px-4 pb-2 text-sm transition-colors ${
            tab === "distribucija"
              ? "border-b-2 border-accent font-medium text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Distribucija
        </button>
      </div>

      {/* Tab content: Pregled */}
      {tab === "pregled" && (
        <div className="mt-4">
          {/* Info row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Datum
              </div>
              <div className="mt-0.5 text-sm font-semibold">31. 01. 2026.</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Plaćanje
              </div>
              <div className="mt-0.5 text-sm font-semibold">Virman</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Iznos
              </div>
              <div className="mt-0.5 text-sm font-semibold">1.571,29 €</div>
            </div>
          </div>

          {/* Unio */}
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <svg
              className="h-4 w-4 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs text-muted">UNIO/LA:</span>
            <span className="text-sm font-medium">Marko P.</span>
          </div>

          {/* Stavke */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
              Stavke (2)
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-slate-50 text-left">
                    <th className="px-3 py-2 font-medium text-muted">Opis</th>
                    <th className="px-3 py-2 text-right font-medium text-muted">
                      Kol.
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-muted">
                      Iznos
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-muted">
                      PDV
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-muted">
                      Ukupno
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-3 py-2.5 font-medium">PIJESAK 0-4 mm</td>
                    <td className="px-3 py-2.5 text-right text-muted">
                      45.85 t
                    </td>
                    <td className="px-3 py-2.5 text-right text-muted">
                      664,83 €
                    </td>
                    <td className="px-3 py-2.5 text-right text-muted">25%</td>
                    <td className="px-3 py-2.5 text-right font-semibold">
                      831,04 €
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-medium">PIJESAK 0-16mm</td>
                    <td className="px-3 py-2.5 text-right text-muted">
                      42.3 t
                    </td>
                    <td className="px-3 py-2.5 text-right text-muted">
                      592,20 €
                    </td>
                    <td className="px-3 py-2.5 text-right text-muted">25%</td>
                    <td className="px-3 py-2.5 text-right font-semibold">
                      740,25 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="mt-3 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Ukupno</span>
              <span className="text-sm font-bold">1.571,29 €</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-green-600">Plaćeno</span>
              <span className="text-sm text-green-600">0,00 €</span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-border pt-1">
              <span className="text-sm font-semibold text-red-600">Dug</span>
              <span className="text-sm font-bold text-red-600">1.571,29 €</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab content: Distribucija */}
      {tab === "distribucija" && (
        <div className="mt-4">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Stavke - Distribucija
          </div>

          <div className="space-y-3">
            {/* Stavka 1 */}
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">PIJESAK 0-4 mm</span>
                <span className="text-sm font-semibold">831,04 €</span>
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                  Skladište
                </span>
                <div className="mt-1.5 text-xs text-muted">
                  Artikl: R00172 - KAMENA FRAKCIJA 0 - 4 MM
                </div>
                <div className="mt-2 space-y-1 pl-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-accent" />
                      GRADILIŠTE ZAPAD
                    </span>
                    <span className="text-muted">7.9 t</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-accent" />
                      OBNOVA CENTAR — FAZA 2
                    </span>
                    <span className="text-muted">37.95 t</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stavka 2 */}
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">PIJESAK 0-16mm</span>
                <span className="text-sm font-semibold">740,25 €</span>
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                  Skladište
                </span>
                <div className="mt-1.5 text-xs text-muted">
                  Artikl: R00174 - KAMENA FRAKCIJA 0-16 (žalo)
                </div>
                <div className="mt-2 space-y-1 pl-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-accent" />
                      GRADILIŠTE ZAPAD
                    </span>
                    <span className="text-muted">31.9 t</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-accent" />
                      OBNOVA CENTAR — FAZA 2
                    </span>
                    <span className="text-muted">10.4 t</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Povezane primke */}
          <div className="mt-5">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
              Povezane primke (1)
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">0294-01-1/2026</span>
                <span className="text-sm font-semibold">1.257,03 €</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-muted">
                <div className="flex justify-between">
                  <span>KAMENA FRAKCIJA 0 - 4 MM</span>
                  <span>45.85 t</span>
                </div>
                <div className="flex justify-between">
                  <span>KAMENA FRAKCIJA 0-16 (žalo)</span>
                  <span>42.3 t</span>
                </div>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted">
                  Distribucija na gradilišta
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-green-500" />
                      GRADILIŠTE ZAPAD
                    </span>
                    <span className="text-muted">7.9 kom</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-green-500" />
                      OBNOVA CENTAR — FAZA 2
                    </span>
                    <span className="text-muted">37.95 kom</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-green-500" />
                      GRADILIŠTE ZAPAD
                    </span>
                    <span className="text-muted">31.9 kom</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-4 w-0.5 rounded-full bg-green-500" />
                      OBNOVA CENTAR — FAZA 2
                    </span>
                    <span className="text-muted">10.4 kom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
