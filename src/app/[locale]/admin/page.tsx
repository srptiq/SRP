import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth"

function withLocale(locale: string, path: string) {
  return locale === "ar" ? path : `/${locale}${path}`
}

export default async function AdminEntryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cookieStore = await cookies()
  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_AUTH_COOKIE_NAME)?.value ??
    null

  const payload = token ? verifyToken(token) : null
  const destination = payload?.role === "admin" ? "/admin/dashboard" : "/admin/login"

  redirect(withLocale(locale, destination))
}
