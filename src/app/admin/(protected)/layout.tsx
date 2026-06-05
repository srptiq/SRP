import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { AdminShell } from "../../[locale]/admin/admin-shell"
import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth"

export default async function RootProtectedAdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = await cookies()
  const token =
    cookieStore.get(AUTH_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_AUTH_COOKIE_NAME)?.value ??
    null

  if (!token) {
    redirect("/admin/login")
  }

  const payload = verifyToken(token)

  if (!payload || payload.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminShell
      locale="ar"
      user={{
        name: "مدير النظام",
        email: payload.email || "admin@srptiq.com",
      }}
    >
      {children}
    </AdminShell>
  )
}
