"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { Orbit, Menu, X } from "lucide-react"
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
      className="sticky top-0 z-50 w-full border-b border-[#e3e3f0] bg-[#fbfaff]/95 backdrop-blur-md"
    >
      <div className="container-max flex h-17 items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading text-lg font-bold text-[#182343]">
          <span className="grid size-9 place-items-center rounded-lg bg-[#262653] text-[#bfb1ff]" aria-hidden="true">
            <Orbit size={21} />
          </span>
          <span>{locale === "ar" ? "سرب تيك" : "SRPTIQ"}</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-[#414767] hover:text-[#182343] hover:bg-[#eeebff]"
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
          <Link href="/contact" className="rounded-md bg-[#4338ca] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3730a3]">
            {t("contact")}
          </Link>
        </div>

        <div className="flex xl:hidden items-center gap-2">
          <Link href="/contact" onClick={() => setOpen(false)} className="rounded-md bg-[#4338ca] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3730a3]">
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
