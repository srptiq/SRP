"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Search, Pencil } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { adminLanguageName, adminText } from "@/lib/admin-ui"

type PageItem = {
  id: string
  slug: string
  title: string
  titleAr: string
  metaTitle: string
  metaDesc: string
}

export default function AdminPagesPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [pages, setPages] = useState<PageItem[]>([])
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<PageItem | null>(null)
  const [form, setForm] = useState({ title: "", titleAr: "", metaTitle: "", metaDesc: "" })
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const openEdit = (page: PageItem) => {
    setEditing(page)
    setForm({ title: page.title, titleAr: page.titleAr, metaTitle: page.metaTitle, metaDesc: page.metaDesc })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editing) {
      setPages((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p))
      )
      toast.success(t("edit"))
      setDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("pages")}</h1>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-text" />
        <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
      </div>
      <div className="rounded-xl bg-white ring-1 ring-border-light overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{adminText(locale, "المعرّف", "Slug")}</TableHead>
              <TableHead>{`${t("title")} (${adminLanguageName(locale, "en")})`}</TableHead>
              <TableHead>{`${t("title")} (${adminLanguageName(locale, "ar")})`}</TableHead>
              <TableHead>{adminText(locale, "عنوان الميتا", "Meta Title")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-mono text-xs text-gray-text">{page.slug}</TableCell>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.titleAr}</TableCell>
                <TableCell className="max-w-48 truncate text-gray-text">{page.metaTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(page)}>
                      <Pencil className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("edit")}</DialogTitle>
            <DialogDescription>{t("pages")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>{`${t("title")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${t("title")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.titleAr} onChange={(e) => setForm((p) => ({ ...p, titleAr: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "عنوان الميتا", "Meta Title")}</Label><Input value={form.metaTitle} onChange={(e) => setForm((p) => ({ ...p, metaTitle: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "وصف الميتا", "Meta Description")}</Label><Textarea value={form.metaDesc} onChange={(e) => setForm((p) => ({ ...p, metaDesc: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button onClick={handleSave}>{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
