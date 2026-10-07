"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 2400;

const steps = [
  { title: "Nalog unesen na terenu", sub: "mobitel, bez papira" },
  { title: "Sati i materijal zabilježeni", sub: "automatski" },
  { title: "Skladište ažurirano", sub: "bez prepisivanja" },
  { title: "Trošak knjižen na projekt", sub: "ERP sinkroniziran" },
  { title: "Uprava vidi stanje", sub: "odmah, bez izvještaja" },
];

const systems = [
  { label: "Teren", activeAt: 0 },
  { label: "Skladište", activeAt: 2 },
  { label: "ERP", activeAt: 3 },
  { label: "Uprava", activeAt: 4 },
];

export default function ProcessDemo() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const activeRef = useRef(0);
  const stepStartRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;

    function tick(now: number) {
      if (stepStartRef.current === null) stepStartRef.current = now;
      if (lastRef.current === null) lastRef.current = now;
      const dt = now - lastRef.current;
      lastRef.current = now;

      if (pausedRef.current || !visibleRef.current) {
        // freeze: push the step start forward by the paused duration
        stepStartRef.current += dt;
      } else {
        let p = (now - stepStartRef.current) / STEP_MS;
        if (p >= 1) {
          const skipped = Math.floor(p);
          activeRef.current = (activeRef.current + skipped) % steps.length;
          stepStartRef.current += skipped * STEP_MS;
          p = (now - stepStartRef.current) / STEP_MS;
          setActive(activeRef.current);
        }
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function jump(i: number) {
    activeRef.current = i;
    // reset on next frame: null makes tick() restart the step clock
    stepStartRef.current = null;
    setActive(i);
    setProgress(0);
  }

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_80px_-30px_rgba(37,99,235,0.35)] ring-1 ring-black/5 md:p-10"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 0% 0%, rgba(37,99,235,0.10) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Primjer: radni nalog s terena
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Jedan unos, cijeli sustav
          </span>
        </div>

        <ol className="mt-8 grid gap-6 md:grid-cols-5 md:gap-4">
          {steps.map((s, i) => {
            const done = i < active;
            const isActive = i === active;
            const width = done ? 100 : isActive ? progress * 100 : 0;
            return (
              <li key={s.title} className="cursor-pointer" onClick={() => jump(i)}>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
                </div>
                <div className="mt-4 flex items-start gap-3 md:block">
                  <span
                    className={`mb-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      done
                        ? "bg-accent text-white"
                        : isActive
                          ? "bg-accent/10 text-accent ring-2 ring-accent/30"
                          : "bg-slate-100 text-muted"
                    }`}
                  >
                    {done ? (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-semibold leading-snug transition-colors ${
                        done || isActive ? "text-foreground" : "text-muted/70"
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className={`mt-0.5 text-xs transition-colors ${isActive ? "text-accent" : "text-muted/70"}`}>
                      {s.sub}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="mr-2 text-xs font-medium text-muted">Povezano:</span>
          {systems.map((sys) => {
            const on = active >= sys.activeAt;
            return (
              <span
                key={sys.label}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
                  on ? "bg-accent/10 text-accent ring-1 ring-accent/20" : "bg-slate-100 text-muted/70"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${on ? "bg-accent" : "bg-slate-300"}`} />
                {sys.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
