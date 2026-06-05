"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { usePathname, Link } from "@/i18n/navigation"
import {
  LayoutDashboard,
  Settings,
  Package,
  FolderKanban,
  FileText,
  Mail,
  ClipboardList,
  Users,
  HelpCircle,
  File,
  Cog,
  Languages,
  ArrowLeftFromLine,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, getDirection } from "@/lib/utils"

interface AdminSidebarProps {
  locale: string
}

const sidebarLinks = [
  { href: "/admin/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/services", key: "services", icon: Settings },
  { href: "/admin/products", key: "products", icon: Package },
  { href: "/admin/projects", key: "projects", icon: FolderKanban },
  { href: "/admin/blog", key: "blog", icon: FileText },
  { href: "/admin/messages", key: "messages", icon: Mail },
  { href: "/admin/requests", key: "requests", icon: ClipboardList },
  { href: "/admin/users", key: "users", icon: Users },
  { href: "/admin/faq", key: "faq", icon: HelpCircle },
  { href: "/admin/pages", key: "pages", icon: File },
  { href: "/admin/settings", key: "settings", icon: Cog },
  { href: "/admin/translations", key: "translations", icon: Languages },
] as const

export default function AdminSidebar({ locale }: AdminSidebarProps) {
  const t = useTranslations("admin")
  const navT = useTranslations("nav")
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const direction = getDirection(locale)

  return (
    <>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        dir={direction}
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 md:z-30 h-screen bg-navy text-white flex flex-col transition-all duration-300",
          collapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "translate-x-0 w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          {!collapsed && (
            <Link href="/admin/dashboard" className="text-lg font-heading font-bold">
              SRPTIQ
            </Link>
          )}
          {collapsed && (
            <Link href="/admin/dashboard" className="mx-auto text-lg font-heading font-bold">
              S
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-text hover:text-white md:flex hidden"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {direction === "rtl" ? (
              collapsed ? (
                <PanelRightOpen className="size-4" />
              ) : (
                <PanelRightClose className="size-4" />
              )
            ) : collapsed ? (
              <PanelRightClose className="size-4" />
            ) : (
              <PanelRightOpen className="size-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue text-white"
                    : "text-gray-text hover:bg-white/10 hover:text-white",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? t(link.key) : undefined}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && t(link.key)}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-text hover:bg-white/10 hover:text-white transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            <ArrowLeftFromLine className="size-4 shrink-0" />
            {!collapsed && navT("about")}
          </Link>
          <button
            onClick={() => {}}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-text hover:bg-white/10 hover:text-white transition-colors cursor-pointer",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && t("logout")}
          </button>
        </div>
      </aside>
    </>
  )
}
