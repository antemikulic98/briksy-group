import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Briksy Group — Digitalizacija poslovanja u Hrvatskoj";
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
            briksy.group
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Digitaliziramo kompanije
            <br />
            koje žele rasti.
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "700px" }}>
            Dolazimo u vašu firmu, učimo kako radite i gradimo digitalne sustave
            koji donose rezultate.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { n: "50+", d: "kompanija" },
            { n: "8+", d: "godina iskustva" },
            { n: "3x", d: "ubrzanje procesa" },
            { n: "40%", d: "ušteda troškova" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: 700, color: "#2563eb" }}>
                {s.n}
              </span>
              <span style={{ fontSize: "16px", color: "#6b7280" }}>{s.d}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
