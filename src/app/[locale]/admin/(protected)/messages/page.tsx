"use client"

import { Fragment, useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Trash2, Search, Mail, MailOpen, Download, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { adminEmptyValue } from "@/lib/admin-ui"
import { formatDate, cn } from "@/lib/utils"
import type { ContactMessage } from "@/types"
import { mockMessages, fetchWithMockFallback } from "@/lib/admin-mock-data"

export default function AdminMessagesPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchWithMockFallback<ContactMessage[]>("/api/admin/messages", mockMessages).then(setMessages)
  }, [])

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.subject || "").toLowerCase().includes(search.toLowerCase())
  )

  const markAsRead = (msg: ContactMessage) => {
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)))
    toast.success(t("markRead"))
  }

  const exportCSV = () => {
    const headers = ["name", "email", "phone", "subject", "message", "read", "date"]
    const rows = messages.map((message) => [
      message.name,
      message.email,
      message.phone || "",
      message.subject || "",
      message.message,
      String(message.read),
      message.createdAt,
    ])
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "messages.csv"
    link.click()
    toast.success(t("export"))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("messages")}</h1>
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
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("subject")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((msg) => (
              <Fragment key={msg.id}>
                <TableRow
                  className={cn("cursor-pointer", !msg.read && "font-medium")}
                  onClick={() => expanded === msg.id ? setExpanded(null) : setExpanded(msg.id)}
                >
                  <TableCell>
                    {msg.read ? <MailOpen className="size-4 text-gray-text" /> : <Mail className="size-4 text-blue" />}
                  </TableCell>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell className="text-gray-text">{msg.email}</TableCell>
                  <TableCell className="max-w-40 truncate">{msg.subject || adminEmptyValue(locale)}</TableCell>
                  <TableCell className="text-gray-text text-xs">{formatDate(msg.createdAt, locale)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      {!msg.read && (
                        <Button variant="ghost" size="icon-sm" onClick={() => markAsRead(msg)} title={t("markRead")}>
                          <MailOpen className="size-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(msg); setDeleteOpen(true) }}>
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        {expanded === msg.id ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expanded === msg.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/30 p-4">
                      <div className="text-sm space-y-2">
                        {msg.phone && <p><span className="font-medium text-gray-text">{t("phone")}:</span> {msg.phone}</p>}
                        <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>{t("delete")}</DialogTitle><DialogDescription>{t("deleteConfirm")}</DialogDescription></DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button variant="destructive" onClick={() => { setMessages((prev) => prev.filter((m) => m.id !== deleting?.id)); toast.success(t("delete")); setDeleteOpen(false) }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
