"use client"

import { Fragment, useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Trash2, Search, Mail, MailOpen, Download, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { adminEmptyValue, adminRequestProjectTypeName } from "@/lib/admin-ui"
import { formatDate, cn } from "@/lib/utils"
import type { ProjectRequest } from "@/types"
import { mockRequests, fetchWithMockFallback } from "@/lib/admin-mock-data"

export default function AdminRequestsPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [requests, setRequests] = useState<ProjectRequest[]>([])
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState<ProjectRequest | null>(null)

  useEffect(() => {
    fetchWithMockFallback<ProjectRequest[]>("/api/admin/requests", mockRequests).then(setRequests)
  }, [])

  const filtered = requests.filter((r) =>
    r.company.toLowerCase().includes(search.toLowerCase()) ||
    r.contactName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  )

  const markAsRead = (req: ProjectRequest) => {
    setRequests((prev) => prev.map((r) => (r.id === req.id ? { ...r, read: true } : r)))
    toast.success(t("markRead"))
  }

  const exportCSV = () => {
    const headers = ["company", "contactName", "email", "phone", "projectType", "budget", "description", "read", "date"]
    const rows = requests.map((request) => [
      request.company,
      request.contactName,
      request.email,
      request.phone,
      request.projectType,
      request.budget || "",
      request.description,
      String(request.read),
      request.createdAt,
    ])
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "project-requests.csv"
    link.click()
    toast.success(t("export"))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("requests")}</h1>
        <Button variant="outline" size="sm" onClick={exportCSV}>
          <Download className="size-4" /> {t("export")}
        </Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-text" />
        <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
      </div>
      <div className="rounded-xl bg-white ring-1 ring-border-light overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>{t("company")}</TableHead>
              <TableHead>{t("contactName")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("projectType")}</TableHead>
              <TableHead>{t("budget")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((req) => (
              <Fragment key={req.id}>
                <TableRow
                  className={cn("cursor-pointer", !req.read && "font-medium")}
                  onClick={() => expanded === req.id ? setExpanded(null) : setExpanded(req.id)}
                >
                  <TableCell>
                    {req.read ? <MailOpen className="size-4 text-gray-text" /> : <Mail className="size-4 text-blue" />}
                  </TableCell>
                  <TableCell>{req.company}</TableCell>
                  <TableCell>{req.contactName}</TableCell>
                  <TableCell className="text-gray-text">{req.email}</TableCell>
                  <TableCell><Badge variant="outline">{adminRequestProjectTypeName(locale, req.projectType)}</Badge></TableCell>
                  <TableCell className="text-gray-text">{req.budget || adminEmptyValue(locale)}</TableCell>
                  <TableCell className="text-gray-text text-xs">{formatDate(req.createdAt, locale)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      {!req.read && (
                        <Button variant="ghost" size="icon-sm" onClick={() => markAsRead(req)} title={t("markRead")}>
                          <MailOpen className="size-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(req); setDeleteOpen(true) }}>
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        {expanded === req.id ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expanded === req.id && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-muted/30 p-4">
                      <div className="text-sm space-y-2">
                        <p><span className="font-medium text-gray-text">{t("phone")}:</span> {req.phone}</p>
                        <p><span className="font-medium text-gray-text">{t("budget")}:</span> {req.budget || adminEmptyValue(locale)}</p>
                        <p className="text-foreground whitespace-pre-wrap">{req.description}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>{t("delete")}</DialogTitle><DialogDescription>{t("deleteConfirm")}</DialogDescription></DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button variant="destructive" onClick={() => { setRequests((prev) => prev.filter((r) => r.id !== deleting?.id)); toast.success(t("delete")); setDeleteOpen(false) }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
