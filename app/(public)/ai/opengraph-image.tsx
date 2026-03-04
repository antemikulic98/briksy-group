import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI u poslovanju — Briksy Group";
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
            AI nije budućnost —
            <br />
            <span style={{ color: "#2563eb" }}>AI je sada.</span>
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "700px" }}>
            Implementiramo umjetnu inteligenciju tamo gdje donosi stvarnu uštedu
            vremena i novca u vašoj kompaniji.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { n: "AI", d: "analiza i odluke" },
            { n: "NLP", d: "obrada teksta" },
            { n: "OCR", d: "digitalizacija papira" },
            { n: "24/7", d: "automatizacija non-stop" },
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
    { ...size },
  );
}
