import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Studija slučaja — digitalizacija građevinske firme s Briksyjem";
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
          <span
            style={{
              marginLeft: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "#dbeafe",
              color: "#2563eb",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Studija slučaja
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Građevinska firma
            <br />
            <span style={{ color: "#2563eb" }}>bez papira i Excela.</span>
          </div>
          <div style={{ fontSize: "24px", color: "#6b7280", maxWidth: "760px" }}>
            Dnevni planovi, GPS prijava radnika, skeniranje materijala i
            automatski izvještaji — u jednom sustavu.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { n: "12", d: "povezanih modula" },
            { n: "iOS + Android", d: "aplikacija za teren" },
            { n: "Offline", d: "radi i bez signala" },
            { n: "PDF", d: "izvještaji na klik" },
          ].map((s) => (
            <div key={s.d} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#2563eb" }}>
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
