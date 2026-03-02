import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://briksygroup.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-03-02",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/usluge`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-nama`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digitalizacija`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/briksy`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: "2026-03-02",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
