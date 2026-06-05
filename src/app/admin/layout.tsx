import type { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import LocaleFrame from "@/components/layout/LocaleFrame"
import arMessages from "../../../messages/ar.json"

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NextIntlClientProvider locale="ar" messages={arMessages}>
        <LocaleFrame>{children}</LocaleFrame>
      </NextIntlClientProvider>
    </div>
  )
}
