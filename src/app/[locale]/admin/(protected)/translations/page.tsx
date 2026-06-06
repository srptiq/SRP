"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Plus, Pencil, Trash2, Search, Download, Upload } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { adminLocaleName, adminText } from "@/lib/admin-ui"
import { fetchAdminList, adminCreate, adminDelete } from "@/lib/admin-mock-data"

interface Translation {
  id: string
  key: string
  locale: string
  value: string
}

export default function AdminTranslationsPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [translations, setTranslations] = useState<Translation[]>([])
  const [search, setSearch] = useState("")

  const loadTranslations = () => fetchAdminList<Translation>("/api/admin/translations").then(setTranslations)

  useEffect(() => {
    loadTranslations()
  }, [])

  const [localeFilter, setLocaleFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Translation | null>(null)
  const [deleting, setDeleting] = useState<Translation | null>(null)
  const [form, setForm] = useState({ key: "", locale: "ar", value: "" })
  const [importOpen, setImportOpen] = useState(false)
  const [importText, setImportText] = useState("")

  const filtered = translations.filter((tr) => {
    const matchesSearch = tr.key.toLowerCase().includes(search.toLowerCase()) ||
      tr.value.toLowerCase().includes(search.toLowerCase())
    const matchesLocale = localeFilter === "all" || tr.locale === localeFilter
    return matchesSearch && matchesLocale
  })

  const openCreate = () => {
    setEditing(null)
    setForm({ key: "", locale: "ar", value: "" })
    setDialogOpen(true)
  }

  const openEdit = (tr: Translation) => {
    setEditing(tr)
    setForm({ key: tr.key, locale: tr.locale, value: tr.value })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.key || !form.value) { toast.error(t("required")); return }
    // POST upserts by (key, locale), covering both create and edit.
    const ok = await adminCreate("/api/admin/translations", form)
    if (!ok) { toast.error(adminText(locale, "فشل الحفظ", "Save failed")); return }
    toast.success(editing ? t("edit") : t("create"))
    setDialogOpen(false)
    loadTranslations()
  }

  const exportJSON = () => {
    const grouped: Record<string, Record<string, string>> = {}
    for (const tr of translations) {
      if (!grouped[tr.locale]) grouped[tr.locale] = {}
      grouped[tr.locale][tr.key] = tr.value
    }
    const blob = new Blob([JSON.stringify(grouped, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "translations.json"
    link.click()
    toast.success(t("export"))
  }

  const importJSON = async () => {
    let data: Record<string, Record<string, string>>
    try {
      data = JSON.parse(importText)
    } catch {
      toast.error(adminText(locale, "صيغة JSON غير صحيحة", "Invalid JSON format"))
      return
    }
    let count = 0
    for (const loc of Object.keys(data)) {
      for (const key of Object.keys(data[loc])) {
        const ok = await adminCreate("/api/admin/translations", { key, locale: loc, value: data[loc][key] })
        if (ok) count++
      }
    }
    toast.success(adminText(locale, `تم استيراد ${count} ترجمة`, `Imported ${count} translations`))
    setImportOpen(false)
    setImportText("")
    loadTranslations()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("translations")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
            <Upload className="size-4" /> {adminText(locale, "استيراد", "Import")}
          </Button>
          <Button variant="outline" size="sm" onClick={exportJSON}>
            <Download className="size-4" /> {t("export")}
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" /> {t("create")}
          </Button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-text" />
          <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
        </div>
        <Select value={localeFilter} onValueChange={(v) => v && setLocaleFilter(v)}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{adminLocaleName(locale, "all")}</SelectItem>
            <SelectItem value="ar">{adminLocaleName(locale, "ar")}</SelectItem>
            <SelectItem value="en">{adminLocaleName(locale, "en")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl bg-white ring-1 ring-border-light overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{adminText(locale, "المفتاح", "Key")}</TableHead>
              <TableHead>{adminText(locale, "اللغة", "Locale")}</TableHead>
              <TableHead>{adminText(locale, "القيمة", "Value")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((tr) => (
              <TableRow key={tr.id}>
                <TableCell className="font-mono text-xs">{tr.key}</TableCell>
                <TableCell><Badge variant="outline">{adminLocaleName(locale, tr.locale as "ar" | "en")}</Badge></TableCell>
                <TableCell className="max-w-64 truncate text-gray-text">{tr.value}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(tr)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(tr); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("translations")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>{adminText(locale, "المفتاح", "Key")}</Label><Input value={form.key} onChange={(e) => setForm((p) => ({ ...p, key: e.target.value }))} placeholder="nav.products" /></div>
            <div className="space-y-1.5">
              <Label>{adminText(locale, "اللغة", "Locale")}</Label>
              <Select value={form.locale} onValueChange={(v) => setForm((p) => ({ ...p, locale: v ?? "ar" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">{adminLocaleName(locale, "ar")}</SelectItem>
                  <SelectItem value="en">{adminLocaleName(locale, "en")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>{adminText(locale, "القيمة", "Value")}</Label><Textarea value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button onClick={handleSave}>{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{adminText(locale, "استيراد الترجمات", "Import Translations")}</DialogTitle>
            <DialogDescription>{adminText(locale, "ألصق JSON بالصيغة التالية:", "Paste JSON with this format:")} {`{"ar": {"key": "value"}, "en": {"key": "value"}}`}</DialogDescription>
          </DialogHeader>
          <Textarea
            className="min-h-40 font-mono text-xs"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={locale === "ar" ? '{"ar": {"nav.home": "الرئيسية"}}' : '{"en": {"nav.home": "Home"}}'}
          />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button onClick={importJSON}>{adminText(locale, "استيراد", "Import")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>{t("delete")}</DialogTitle><DialogDescription>{t("deleteConfirm")}</DialogDescription></DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button variant="destructive" onClick={async () => { if (!deleting) return; const ok = await adminDelete(`/api/admin/translations?id=${deleting.id}`); if (!ok) { toast.error(adminText(locale, "فشل الحذف", "Delete failed")); return } toast.success(t("delete")); setDeleteOpen(false); loadTranslations() }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
