"use client"

import { useTranslations, useLocale } from "next-intl"
import { Menu, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { getDirection } from "@/lib/utils"

interface AdminHeaderProps {
  title: string
  onMenuToggle?: () => void
}

export default function AdminHeader({ title, onMenuToggle }: AdminHeaderProps) {
  const t = useTranslations("admin")
  const locale = useLocale()
  const direction = getDirection(locale)

  return (
    <header
      dir={direction}
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-light bg-white/80 backdrop-blur-md px-6"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenuToggle}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="size-5" />
        </Button>
        <h1 className="text-lg font-heading font-semibold text-navy">{title}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="flex items-center gap-2 rounded-lg hover:bg-accent p-1.5 transition-colors cursor-pointer">
            <Avatar size="sm">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium text-navy">
              Admin
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>{t("dashboard")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="size-4" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
