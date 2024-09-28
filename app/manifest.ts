import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Titik Kumpul | Exhibition Race",
		short_name: "Titik Kumpul | Exhibition Race",
		description:
			"Titik Kumpul | Exhibition Race by Pushbike Lampung Academy ~ Metro",
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/public/logo-text.webp",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
