"use client"

import { useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Link, useRouter } from "@/i18n/navigation"
import Image from "next/image"
import {
  LayoutDashboard, Settings, Package, Building2, FolderKanban,
  Newspaper, MessageSquare, ClipboardList, Users, HelpCircle,
  FileText, Languages, LogOut, Menu, X, ChevronDown
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
    <div dir={direction} className="flex h-screen overflow-hidden bg-soft-gray">
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
          "fixed inset-y-0 z-50 flex w-64 flex-col bg-white border-l border-border-light transition-transform duration-200 md:relative md:translate-x-0",
          direction === "rtl"
            ? "right-0 border-l-0 border-r"
            : "left-0",
          sidebarOpen ? "translate-x-0" : direction === "rtl" ? "translate-x-full" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border-light">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SRPTIQ" width={100} height={28} />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 pb-1 text-xs font-medium text-gray-text uppercase tracking-wider">
                {t(group.label)}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <item.icon className="size-4 shrink-0" />
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-border-light">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2 text-destructive">
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
            className="md:hidden p-1 rounded-lg hover:bg-muted"
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden md:block" />

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
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
