import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth"

export default async function RootAdminEntryPage() {
  const cookieStore = await cookies()
  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_AUTH_COOKIE_NAME)?.value ??
    null

  const payload = token ? verifyToken(token) : null
  redirect(payload?.role === "admin" ? "/admin/dashboard" : "/admin/login")
}
