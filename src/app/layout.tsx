import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://srptiq.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/manifest",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
