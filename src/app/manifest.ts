import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سرب تيك | SRPTIQ",
    short_name: "سرب تيك",
    description: "سرب تيك تجمع مدار إكس للواجهات واللوحات وأوس لإدارة مكاتب المحاماة.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7FB",
    theme_color: "#126CFF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}