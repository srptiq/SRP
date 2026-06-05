import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SRPTIQ - Saudi Technology Conglomerate",
    short_name: "SRPTIQ",
    description: "شركة تقنية سعودية متخصصة في بناء الأنظمة الذكية، منتجات SaaS، الحلول الرقمية، والذكاء الاصطناعي",
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