"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import {
  Package,
  Building2,
  FolderKanban,
  Newspaper,
  MessageSquare,
  ClipboardList,
  Users,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchAdminObject } from "@/lib/admin-mock-data"
import { adminEmptyValue, adminRequestProjectTypeName, adminText } from "@/lib/admin-ui"
import { cn, formatDate } from "@/lib/utils"
import type { ContactMessage, DashboardStats, ProjectRequest } from "@/types"

const statCards = [
  { key: "totalProducts" as const, labelKey: "products", icon: Building2, color: "bg-blue/10 text-blue" },
  { key: "totalServices" as const, labelKey: "services", icon: Package, color: "bg-cyan/10 text-cyan" },
  { key: "totalProjects" as const, labelKey: "projects", icon: FolderKanban, color: "bg-emerald-500/10 text-emerald-600" },
  { key: "totalBlogPosts" as const, labelKey: "blog", icon: Newspaper, color: "bg-violet-500/10 text-violet-600" },
  { key: "totalMessages" as const, labelKey: "messages", icon: MessageSquare, color: "bg-orange-500/10 text-orange-600" },
  { key: "totalRequests" as const, labelKey: "requests", icon: ClipboardList, color: "bg-rose-500/10 text-rose-600" },
  { key: "totalUsers" as const, labelKey: "users", icon: Users, color: "bg-indigo-500/10 text-indigo-600" },
  { key: "totalFAQ" as const, labelKey: "faq", icon: HelpCircle, color: "bg-teal-500/10 text-teal-600" },
]

const quickActions = [
  { label: "services", href: "/admin/services", icon: Package },
  { label: "products", href: "/admin/products", icon: Building2 },
  { label: "messages", href: "/admin/messages", icon: MessageSquare },
  { label: "requests", href: "/admin/requests", icon: ClipboardList },
]

type DashboardData = DashboardStats & {
  recentMessages: ContactMessage[]
  recentRequests: ProjectRequest[]
}

const emptyDashboard: DashboardData = {
  totalProducts: 0,
  totalServices: 0,
  totalProjects: 0,
  totalBlogPosts: 0,
  totalMessages: 0,
  totalRequests: 0,
  totalUsers: 0,
  totalFAQ: 0,
  recentMessages: [],
  recentRequests: [],
}

export default function AdminDashboardPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const router = useRouter()
  const [dashboard, setDashboard] = useState<DashboardData>(emptyDashboard)

  useEffect(() => {
    fetchAdminObject<DashboardData>("/api/admin/dashboard", emptyDashboard).then(setDashboard)
  }, [])

  const unreadMessages = dashboard.recentMessages.filter((message) => !message.read).length
  const unreadRequests = dashboard.recentRequests.filter((request) => !request.read).length
  const contentFootprint =
    dashboard.totalProducts +
    dashboard.totalServices +
    dashboard.totalProjects +
    dashboard.totalBlogPosts +
    dashboard.totalFAQ

  const overviewCards = [
    {
      label: adminText(locale, "بحاجة للمتابعة", "Needs attention"),
      value: unreadMessages + unreadRequests,
      description: adminText(locale, "رسائل وطلبات غير مقروءة", "Unread messages and requests"),
      accent: "text-amber-600",
    },
    {
      label: adminText(locale, "إجمالي التفاعل", "Inbox volume"),
      value: dashboard.totalMessages + dashboard.totalRequests,
      description: adminText(locale, "كل الرسائل وطلبات المشاريع", "All messages and project requests"),
      accent: "text-blue",
    },
    {
      label: adminText(locale, "محتوى الموقع", "Content footprint"),
      value: contentFootprint,
      description: adminText(locale, "كل العناصر المنشورة والقابلة للإدارة", "Published and managed content items"),
      accent: "text-emerald-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-heading font-semibold text-navy">{t("dashboard")}</h1>
        <p className="mt-0.5 text-sm text-gray-text">{t("welcome")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.key} size="sm">
            <CardContent className="flex items-center gap-3 p-3">
              <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", stat.color)}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none text-navy">{dashboard[stat.key]}</p>
                <p className="mt-0.5 text-xs text-gray-text">{t(stat.labelKey)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {overviewCards.map((item) => (
          <Card key={item.label} size="sm">
            <CardContent className="space-y-1.5 p-4">
              <p className="text-sm font-medium text-gray-text">{item.label}</p>
              <p className={cn("text-3xl font-semibold leading-none", item.accent)}>{item.value}</p>
              <p className="text-xs text-gray-text">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t("recentMessages")}
              <Button variant="ghost" size="xs" onClick={() => router.push("/admin/messages")}>
                {t("viewAll")} <ArrowUpRight className="size-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.recentMessages.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-text">{t("noData")}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("from")}</TableHead>
                    <TableHead>{t("subject")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboard.recentMessages.map((message) => (
                    <TableRow key={message.id} className={cn(message.read ? "" : "font-medium")}>
                      <TableCell>{message.name}</TableCell>
                      <TableCell className="max-w-40 truncate">{message.subject || adminEmptyValue(locale)}</TableCell>
                      <TableCell className="text-gray-text">{formatDate(message.createdAt, locale)}</TableCell>
                      <TableCell>
                        {message.read ? (
                          <Badge variant="outline">{t("read")}</Badge>
                        ) : (
                          <Badge variant="default">{t("unread")}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t("recentRequests")}
              <Button variant="ghost" size="xs" onClick={() => router.push("/admin/requests")}>
                {t("viewAll")} <ArrowUpRight className="size-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.recentRequests.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-text">{t("noData")}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("company")}</TableHead>
                    <TableHead>{t("contactName")}</TableHead>
                    <TableHead>{t("budget")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboard.recentRequests.map((request) => (
                    <TableRow key={request.id} className={cn(request.read ? "" : "font-medium")}>
                      <TableCell>{request.company}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p>{request.contactName}</p>
                          <Badge variant="outline" className="text-[11px]">
                            {adminRequestProjectTypeName(locale, request.projectType)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-text">{request.budget || adminEmptyValue(locale)}</TableCell>
                      <TableCell className="text-gray-text">{formatDate(request.createdAt, locale)}</TableCell>
                      <TableCell>
                        {request.read ? (
                          <Badge variant="outline">{t("read")}</Badge>
                        ) : (
                          <Badge variant="default">{t("unread")}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("quickActions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button key={action.label} variant="outline" size="sm" onClick={() => router.push(action.href)}>
                <action.icon className="size-4" />
                {t(action.label)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
