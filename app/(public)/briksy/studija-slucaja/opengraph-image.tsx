import { ogImage, ogSize } from "@/app/components/og-template";

export const runtime = "edge";
export const alt = "Studija slučaja — građevinska firma bez papira i Excela";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogImage({
    headline: "Građevinska firma",
    accent: "bez papira i Excela.",
    sub: "Dan firme u kojoj informacije putuju same, od gradilišta do ureda.",
    chips: [
      { n: "GPS prijava", d: "radnika" },
      { n: "Materijal", d: "skeniranjem" },
      { n: "Izvještaji", d: "automatski" },
      { n: "Offline", d: "radi bez signala" },
    ],
  });
}
