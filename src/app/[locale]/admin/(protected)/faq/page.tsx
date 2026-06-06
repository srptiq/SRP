"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Plus, Pencil, Trash2, Search, EyeOff, Eye, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import type { FAQ } from "@/types"
import { adminFaqCategoryName, adminLanguageName, adminText } from "@/lib/admin-ui"
import { generateId, fetchAdminList } from "@/lib/admin-mock-data"

const faqCategories = ["general", "project", "services", "pricing", "technical", "other"]

const initialForm = {
  question: "", questionEn: "", answer: "", answerEn: "",
  category: "general", order: 1, published: false,
}

export default function AdminFAQPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [deleting, setDeleting] = useState<FAQ | null>(null)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    fetchAdminList<FAQ>("/api/admin/faq").then(setFaqs)
  }, [])

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.questionEn.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.order - b.order)

  const openCreate = () => { setEditing(null); setForm(initialForm); setDialogOpen(true) }

  const openEdit = (faq: FAQ) => {
    setEditing(faq)
    setForm({
      question: faq.question, questionEn: faq.questionEn,
      answer: faq.answer, answerEn: faq.answerEn,
      category: faq.category || "general", order: faq.order, published: faq.published,
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.question || !form.questionEn) { toast.error(t("required")); return }
    if (editing) {
      setFaqs((prev) => prev.map((f) => (f.id === editing.id ? { ...f, ...form } : f)))
      toast.success(t("edit"))
    } else {
      setFaqs((prev) => [...prev, { id: generateId(), ...form } as FAQ])
      toast.success(t("create"))
    }
    setDialogOpen(false)
  }

  const togglePublish = (faq: FAQ) => {
    setFaqs((prev) => prev.map((f) => (f.id === faq.id ? { ...f, published: !f.published } : f)))
    toast.success(faq.published ? t("draft") : t("publish"))
  }

  const moveUp = (faq: FAQ) => {
    const sorted = [...faqs].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((f) => f.id === faq.id)
    if (idx > 0) {
      const temp = sorted[idx].order
      sorted[idx].order = sorted[idx - 1].order
      sorted[idx - 1].order = temp
      setFaqs([...sorted])
    }
  }

  const moveDown = (faq: FAQ) => {
    const sorted = [...faqs].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((f) => f.id === faq.id)
    if (idx < sorted.length - 1) {
      const temp = sorted[idx].order
      sorted[idx].order = sorted[idx + 1].order
      sorted[idx + 1].order = temp
      setFaqs([...sorted])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("faq")}</h1>
        <Button size="sm" onClick={openCreate}><Plus className="size-4" /> {t("create")}</Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-text" />
        <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
      </div>
      <div className="rounded-xl bg-white ring-1 ring-border-light overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>{`${t("question")} (${adminLanguageName(locale, "ar")})`}</TableHead>
              <TableHead>{`${t("question")} (${adminLanguageName(locale, "en")})`}</TableHead>
              <TableHead>{adminText(locale, "الترتيب", "Order")}</TableHead>
              <TableHead>{t("published")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="text-gray-text text-xs">{faq.order}</TableCell>
                <TableCell className="font-medium max-w-48 truncate">{faq.question}</TableCell>
                <TableCell className="max-w-48 truncate">{faq.questionEn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon-xs" onClick={() => moveUp(faq)}><ArrowUp className="size-3" /></Button>
                    <span className="text-xs text-gray-text w-4 text-center">{faq.order}</span>
                    <Button variant="ghost" size="icon-xs" onClick={() => moveDown(faq)}><ArrowDown className="size-3" /></Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={faq.published ? "default" : "outline"}>
                    {faq.published ? t("published") : t("draft")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => togglePublish(faq)}>
                      {faq.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(faq)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(faq); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("faq")}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${t("question")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${t("question")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.questionEn} onChange={(e) => setForm((p) => ({ ...p, questionEn: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${t("answer")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${t("answer")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.answerEn} onChange={(e) => setForm((p) => ({ ...p, answerEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "التصنيف", "Category")}</Label>
              <select
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              >
                {faqCategories.map((c) => (<option key={c} value={c}>{adminFaqCategoryName(locale, c)}</option>))}
              </select>
            </div>
            <div className="space-y-1.5"><Label>{adminText(locale, "الترتيب", "Order")}</Label><Input type="number" min={1} value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 1 }))} /></div>
            <div className="flex items-center gap-2 col-span-2">
              <Checkbox checked={form.published} onCheckedChange={(v) => setForm((p) => ({ ...p, published: v as boolean }))} />
              <Label className="mb-0">{t("publish")}</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button onClick={handleSave}>{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>{t("delete")}</DialogTitle><DialogDescription>{t("deleteConfirm")}</DialogDescription></DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button variant="destructive" onClick={() => { setFaqs((prev) => prev.filter((f) => f.id !== deleting?.id)); toast.success(t("delete")); setDeleteOpen(false) }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
