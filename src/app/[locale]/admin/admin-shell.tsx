"use client"

import { useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import {
  LayoutDashboard, Settings, Package, Building2, FolderKanban,
  Newspaper, MessageSquare, ClipboardList, Users, HelpCircle,
  FileText, Languages, LogOut, Menu, X, ChevronDown, Orbit, ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

const navGroups = [
  {
    label: "main",
    items: [
      { href: "/admin/dashboard", icon: LayoutDashboard, key: "dashboard" },
    ],
  },
  {
    label: "content",
    items: [
      { href: "/admin/services", icon: Package, key: "services" },
      { href: "/admin/products", icon: Building2, key: "products" },
      { href: "/admin/projects", icon: FolderKanban, key: "projects" },
      { href: "/admin/blog", icon: Newspaper, key: "blog" },
      { href: "/admin/faq", icon: HelpCircle, key: "faq" },
    ],
  },
  {
    label: "inbox",
    items: [
      { href: "/admin/messages", icon: MessageSquare, key: "messages" },
      { href: "/admin/requests", icon: ClipboardList, key: "requests" },
    ],
  },
  {
    label: "management",
    items: [
      { href: "/admin/users", icon: Users, key: "users" },
      { href: "/admin/pages", icon: FileText, key: "pages" },
      { href: "/admin/translations", icon: Languages, key: "translations" },
      { href: "/admin/settings", icon: Settings, key: "settings" },
    ],
  },
]

export function AdminShell({
  children,
  locale,
  user,
}: {
  children: ReactNode
  locale: string
  user: { name: string; email: string }
}) {
  const t = useTranslations("admin")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const current = navGroups.flatMap(({ items }) => items).find(({ href }) => pathname === href)
  const direction = locale === "ar" ? "rtl" : "ltr"

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      router.replace("/admin/login")
    }
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div dir={direction} className="srp-admin flex h-dvh overflow-hidden bg-soft-gray">
      <Toaster position={direction === "rtl" ? "top-left" : "top-right"} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex w-64 flex-col srp-admin-sidebar border-l border-white/10 transition-transform duration-200 md:relative md:translate-x-0",
          direction === "rtl"
            ? "right-0 border-l-0 border-r"
            : "left-0",
          sidebarOpen ? "translate-x-0" : direction === "rtl" ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Orbit className="size-7 text-[#bfb1ff]" aria-hidden="true" />
            <span className="font-heading text-lg font-bold">{locale === "ar" ? "سرب تيك" : "SRPTIQ"}</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label={locale === "ar" ? "إغلاق القائمة" : "Close navigation"}
            className="md:hidden rounded-lg p-1 hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 pb-1 text-xs font-medium text-[#abb0d0] uppercase tracking-wider">
                {t(group.label)}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="srp-admin-nav-link flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <item.icon className="size-4 shrink-0" />
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2 text-[#ffd3d8] hover:bg-white/10 hover:text-white">
            <LogOut className="size-4" />
            {t("logout")}
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-4 bg-white border-b border-border-light">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label={locale === "ar" ? "فتح القائمة" : "Open navigation"}
            aria-expanded={sidebarOpen}
            className="md:hidden p-1 rounded-lg hover:bg-muted"
          >
            <Menu className="size-5" />
          </button>

          <p className="hidden font-heading text-sm font-semibold text-navy md:block">{t(current?.key ?? "dashboard")}</p>
          <div className="ms-auto flex items-center gap-3">
            <Link href="/" className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-blue hover:bg-accent sm:inline-flex">
              {locale === "ar" ? "عرض الموقع" : "View website"}<ArrowUpRight className="size-4" />
            </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted transition-colors cursor-pointer">
              <Avatar size="sm">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="text-left text-sm leading-tight hidden sm:block">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-gray-text text-xs">{user.email}</p>
              </div>
              <ChevronDown className="size-3.5 text-gray-text hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut className="size-4" />
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="srp-admin-content flex-1 overflow-y-auto p-4 md:p-7">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
