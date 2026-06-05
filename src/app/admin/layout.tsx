import type { ReactNode } from "react"
import { IBM_Plex_Sans_Arabic, Sora } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import LocaleFrame from "@/components/layout/LocaleFrame"
import arMessages from "../../../messages/ar.json"

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${ibmPlexSansArabic.variable} ${sora.variable}`}>
      <NextIntlClientProvider locale="ar" messages={arMessages}>
        <LocaleFrame>{children}</LocaleFrame>
      </NextIntlClientProvider>
    </div>
  )
}
