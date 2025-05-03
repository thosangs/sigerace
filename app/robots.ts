import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/peraturan", "/jadwal", "/livescore", "/sponsor"],
      disallow: "",
    },
    sitemap: "https://sigerace.pages.dev/sitemap.xml",
  };
}
