import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "O nama — Briksy Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f8fafc",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            B
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>
            briksy<span style={{ color: "#2563eb" }}>.</span>group
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Dolazimo u vašu kompaniju
            <br />
            i učimo <span style={{ color: "#2563eb" }}>kako radite.</span>
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "700px" }}>
            Naš pristup digitalizaciji se temelji na razumijevanju vašeg
            poslovanja iznutra — ne na šablonskim rješenjima.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { n: "1.", d: "Dolazak u kompaniju" },
            { n: "2.", d: "Dijagnoza i plan" },
            { n: "3.", d: "Implementacija" },
            { n: "4.", d: "Podrška" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#2563eb" }}>
                {s.n}
              </span>
              <span style={{ fontSize: "18px", color: "#6b7280" }}>{s.d}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
