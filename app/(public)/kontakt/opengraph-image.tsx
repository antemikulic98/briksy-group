import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kontakt — Briksy Group";
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
            Zakažite{" "}
            <span style={{ color: "#2563eb" }}>besplatnu analizu</span>
            <br />
            vašeg poslovanja.
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "700px" }}>
            Dolazimo u vašu kompaniju, upoznajemo vaše procese i dajemo vam
            iskrenu procjenu — bez obveza i bez pritiska.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              backgroundColor: "#2563eb",
              borderRadius: "12px",
              color: "white",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            Javite nam se danas
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
              info@briksy.com
            </span>
            <span style={{ fontSize: "16px", color: "#6b7280" }}>
              Odgovaramo u roku od 24 sata
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
              +385 95 541 9712
            </span>
            <span style={{ fontSize: "16px", color: "#6b7280" }}>
              Radnim danom 8-17h
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
