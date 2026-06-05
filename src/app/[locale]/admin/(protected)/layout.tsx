import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { AdminShell } from "../admin-shell"
import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth"

function withLocale(locale: string, path: string) {
  return locale === "ar" ? path : `/${locale}${path}`
}

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const cookieStore = await cookies()
  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_AUTH_COOKIE_NAME)?.value ??
    null

  if (!token) {
    redirect(withLocale(locale, "/admin/login"))
  }

  let user = { name: locale === "ar" ? "مدير النظام" : "Admin", email: "admin@srptiq.com" }
  const payload = verifyToken(token)

  if (!payload || payload.role !== "admin") {
    redirect(withLocale(locale, "/admin/login"))
  }

  user = {
    name: user.name,
    email: payload.email || user.email,
  }

  return (
    <AdminShell locale={locale} user={user}>
      {children}
    </AdminShell>
  )
}
