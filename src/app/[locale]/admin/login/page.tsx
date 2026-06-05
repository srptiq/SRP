"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getDirection } from "@/lib/utils"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("errors.email"),
  password: z.string().min(6, "errors.minLength"),
})

export default function AdminLoginPage() {
  const t = useTranslations("admin")
  const errT = useTranslations("errors")
  const locale = useLocale()
  const router = useRouter()
  const direction = getDirection(locale)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string
        const messageKey = issue.message.replace("errors.", "") as "email" | "minLength"
        fieldErrors[path as keyof typeof errors] = errT(messageKey, { n: 6 })
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data: { error?: string } = await res.json()
        toast.error(data.error || errT("serverError"))
        return
      }

      await res.json()
      toast.success(t("loginTitle"))
      router.replace("/admin/dashboard")
    } catch {
      toast.error(errT("serverError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir={direction} className="flex min-h-screen items-center justify-center bg-soft-gray p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl bg-white p-6 ring-1 ring-border-light shadow-sm">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Image src="/logo.png" alt="SRPTIQ" width={140} height={40} priority />
            <div>
              <h1 className="text-lg font-heading font-semibold text-navy text-center">{t("loginTitle")}</h1>
              <p className="text-sm text-gray-text text-center mt-1">{t("loginDesc")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srptiq.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 flex items-center pe-2.5 text-gray-text hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("loading") : t("loginBtn")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
