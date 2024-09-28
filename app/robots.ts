import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: ["/", "/peraturan", "/jadwal", "/livescore"],
			disallow: "",
		},
		sitemap: "https://tikum.pages.dev/sitemap.xml",
	};
}
