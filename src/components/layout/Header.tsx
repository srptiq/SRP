"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname, Link } from "@/i18n/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, getDirection } from "@/lib/utils"

const navLinks = [
  { href: "/products", key: "products" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/faq", key: "faq" },
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
    router.replace(pathname, { locale: next })
  }

  return (
    <header
      dir={direction}
      className="sticky top-0 z-50 w-full border-b border-border-light bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60"
    >
      <div className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="SRPTIQ"
            width={120}
            height={32}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-gray-text hover:text-navy hover:bg-accent"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium"
          >
            {t("language")}
          </Button>
          <Link href="/request-project">
            <Button size="sm" className="bg-blue text-white hover:bg-blue/90">
              {t("startProject")}
            </Button>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link href="/request-project" onClick={() => setOpen(false)}>
            <Button size="sm" className="bg-blue text-white hover:bg-blue/90">
              {t("startProject")}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen(!open)}
            aria-label={locale === "ar" ? "القائمة" : "Menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-light bg-white">
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
