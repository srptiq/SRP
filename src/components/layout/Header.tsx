"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { Layers3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, getDirection } from "@/lib/utils"

const navLinks = [
  { href: "/products", key: "products" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/support", key: "support" },
  { href: "/integrations", key: "integrations" },
] as const

export default function Header() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const direction = getDirection(locale)

  const toggleLanguage = () => {
    const next = locale === "ar" ? "en" : "ar"
    setOpen(false)
    router.replace(pathname, { locale: next })
  }

  return (
    <header
      dir={direction}
      className="sticky top-0 z-50 w-full border-b border-[#d7ded3] bg-[#fafaf5]/95 backdrop-blur-md"
    >
      <div className="container-max flex h-17 items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading text-lg font-bold text-[#14312b]">
          <span className="grid size-9 place-items-center rounded-lg bg-[#15362e] text-[#cce7b5]" aria-hidden="true">
            <Layers3 size={19} />
          </span>
          <span>{locale === "ar" ? "سرب تك" : "SRPTIQ"}</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-[#42564b] hover:text-[#14312b] hover:bg-[#e5eee1]"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium"
          >
            {t("language")}
          </Button>
          <Link href="/contact" className="rounded-md bg-[#183b30] px-3 py-2 text-sm font-semibold text-white hover:bg-[#295846]">
            {t("contact")}
          </Link>
        </div>

        <div className="flex xl:hidden items-center gap-2">
          <Link href="/contact" onClick={() => setOpen(false)} className="rounded-md bg-[#183b30] px-3 py-2 text-sm font-semibold text-white hover:bg-[#295846]">
            {t("contact")}
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={locale === "ar" ? "القائمة" : "Menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border-light bg-white">
          <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-text hover:text-navy rounded-lg hover:bg-accent transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <hr className="border-border-light my-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="justify-start text-sm font-medium"
            >
              {t("language")}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
