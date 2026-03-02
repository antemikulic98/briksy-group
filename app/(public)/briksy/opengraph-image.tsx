import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Briksy — Softver za građevinarstvo";
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              backgroundColor: "#2563eb",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Naš proizvod
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Financije, realizacija i
            <br />
            robno-materijalno —{" "}
            <span style={{ color: "#2563eb" }}>na jednom mjestu.</span>
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "700px" }}>
            Prva aplikacija za građevinske kompanije razvijena u suradnji s
            vlasnicima kompanija i inženjerima na terenu.
          </div>
        </div>

        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { n: "Financije", d: "Uvid u realnom vremenu" },
            { n: "Projekti", d: "Od ponude do primopredaje" },
            { n: "Materijal", d: "Praćenje do zadnje stavke" },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px 24px",
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                flex: 1,
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                {s.n}
              </span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>{s.d}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
