"use client"

import type { ReactNode } from "react"
import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation"
import { getDirection } from "@/lib/utils"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"

export default function LocaleFrame({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const pathname = usePathname()
  const dir = getDirection(locale)
  const isAdminRoute = pathname.startsWith("/admin")

  if (isAdminRoute) {
    return (
      <div className={`flex min-h-full flex-col ${dir === "rtl" ? "rtl" : ""}`} dir={dir}>
        {children}
        <Toaster />
      </div>
    )
  }

  return (
    <div className={`flex min-h-full flex-col ${dir === "rtl" ? "rtl" : ""}`} dir={dir}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}
