import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sigerace 2025 | by Pushbike Lampung Academy",
    short_name: "Sigerace 2025",
    description: "Sigerace 2025 | by Pushbike Lampung Academy",
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
