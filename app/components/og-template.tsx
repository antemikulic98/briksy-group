import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type Props = {
  headline: string;
  accent: string;
  sub: string;
  chips: { n: string; d: string }[];
};

export function ogImage({ headline, accent, sub, chips }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(60% 55% at 50% 0%, rgba(37,99,235,0.14) 0%, rgba(255,255,255,0) 100%)",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
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
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#111827" }}>Briksy Group</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {headline}
            {accent ? <span style={{ color: "#2563eb", marginLeft: "14px" }}>{accent}</span> : null}
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "760px", lineHeight: 1.4 }}>
            {sub}
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {chips.map((c) => (
            <div
              key={c.n}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 22px",
                backgroundColor: "white",
                borderRadius: "14px",
                border: "1px solid #e5e7eb",
              }}
            >
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#2563eb" }}>{c.n}</span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>{c.d}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
