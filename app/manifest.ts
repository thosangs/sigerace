import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "X-Anda | Racephoria",
		short_name: "X-Anda | Racephoria",
		description:
			"X-Anda | Racephoria by Pushbike Lampung Academy ~ Lampung Selatan",
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
