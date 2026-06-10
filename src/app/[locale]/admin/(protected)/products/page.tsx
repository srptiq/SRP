"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Plus, Pencil, Trash2, Search, EyeOff, Eye } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/types"
import { adminLanguageName, adminProductStatusName, adminText } from "@/lib/admin-ui"
import { fetchAdminList, adminCreate, adminUpdate, adminDelete, slugify } from "@/lib/admin-mock-data"

const initialForm = {
  name: "", nameEn: "", description: "", descriptionEn: "", slug: "",
  features: [] as string[], featuresEn: [] as string[],
  problem: "", problemEn: "", targetAudience: "", targetAudienceEn: "",
  howItWorks: "", howItWorksEn: "", category: "", status: "active",
  published: false, images: [] as string[], logo: "",
}

export default function AdminProductsPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<Product | null>(null)
  const [form, setForm] = useState(initialForm)
  const [tagInput, setTagInput] = useState("")
  const [tagInputEn, setTagInputEn] = useState("")

  const loadProducts = () => fetchAdminList<Product>("/api/admin/products").then(setProducts)

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.nameEn.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing(null)
    setForm(initialForm)
    setDialogOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name, nameEn: product.nameEn,
      description: product.description, descriptionEn: product.descriptionEn,
      slug: product.slug, features: [...product.features], featuresEn: [...product.featuresEn],
      problem: product.problem || "", problemEn: product.problemEn || "",
      targetAudience: product.targetAudience || "", targetAudienceEn: product.targetAudienceEn || "",
      howItWorks: product.howItWorks || "", howItWorksEn: product.howItWorksEn || "",
      category: product.category || "", status: product.status,
      published: product.published, images: [...product.images], logo: product.logo || "",
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.nameEn) {
      toast.error(t("required"))
      return
    }
    const payload = { ...form, slug: form.slug.trim() || slugify(form.nameEn || form.name) }
    const ok = editing
      ? await adminUpdate("/api/admin/products", { id: editing.id, ...payload })
      : await adminCreate("/api/admin/products", payload)
    if (!ok) {
      toast.error(adminText(locale, "فشل الحفظ", "Save failed"))
      return
    }
    toast.success(editing ? t("edit") : t("create"))
    setDialogOpen(false)
    loadProducts()
  }

  const togglePublish = async (product: Product) => {
    const ok = await adminUpdate("/api/admin/products", { id: product.id, published: !product.published })
    if (!ok) {
      toast.error(adminText(locale, "فشل التحديث", "Update failed"))
      return
    }
    toast.success(product.published ? t("draft") : t("publish"))
    loadProducts()
  }

  const addTag = (field: "features" | "featuresEn") => {
    const val = field === "features" ? tagInput : tagInputEn
    if (val.trim()) {
      setForm((prev) => ({ ...prev, [field]: [...prev[field], val.trim()] }))
      if (field === "features") {
        setTagInput("")
      } else {
        setTagInputEn("")
      }
    }
  }

  const removeTag = (field: "features" | "featuresEn", index: number) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("products")}</h1>
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
              <TableHead>{adminText(locale, "المعرف", "ID")}</TableHead>
              <TableHead>{`${t("name")} (${adminLanguageName(locale, "ar")})`}</TableHead>
              <TableHead>{`${t("name")} (${adminLanguageName(locale, "en")})`}</TableHead>
              <TableHead>{adminText(locale, "المعرّف", "Slug")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("published")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-gray-text text-xs">{product.id.slice(0, 8)}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.nameEn}</TableCell>
                <TableCell className="text-gray-text">{product.slug}</TableCell>
                <TableCell><Badge variant={product.status === "active" ? "default" : "outline"}>{adminProductStatusName(locale, product.status)}</Badge></TableCell>
                <TableCell>{product.published ? <Badge variant="default">{t("published")}</Badge> : <Badge variant="outline">{t("draft")}</Badge>}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => togglePublish(product)}>
                      {product.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(product)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(product); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("products")}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${t("name")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${t("name")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "المعرّف", "Slug")}</Label><Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} /></div>
            <div className="space-y-1.5">
              <Label>{t("status")}</Label>
              <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v ?? "active" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{adminProductStatusName(locale, "active")}</SelectItem>
                  <SelectItem value="development">{adminProductStatusName(locale, "development")}</SelectItem>
                  <SelectItem value="archived">{adminProductStatusName(locale, "archived")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.descriptionEn} onChange={(e) => setForm((p) => ({ ...p, descriptionEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "المشكلة", "Problem")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.problem} onChange={(e) => setForm((p) => ({ ...p, problem: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "المشكلة", "Problem")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.problemEn} onChange={(e) => setForm((p) => ({ ...p, problemEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "الفئة المستهدفة", "Target Audience")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.targetAudience} onChange={(e) => setForm((p) => ({ ...p, targetAudience: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "الفئة المستهدفة", "Target Audience")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.targetAudienceEn} onChange={(e) => setForm((p) => ({ ...p, targetAudienceEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "آلية العمل", "How It Works")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.howItWorks} onChange={(e) => setForm((p) => ({ ...p, howItWorks: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "آلية العمل", "How It Works")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.howItWorksEn} onChange={(e) => setForm((p) => ({ ...p, howItWorksEn: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2">
              <Label>{`${adminText(locale, "الميزات", "Features")} (${adminLanguageName(locale, "ar")})`}</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("features") }}} placeholder={adminText(locale, "أضف ميزة", "Add feature")} />
                <Button type="button" variant="outline" size="sm" onClick={() => addTag("features")}>{adminText(locale, "إضافة", "Add")}</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">{form.features.map((f, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag("features", i)}>{f} &times;</Badge>))}</div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>{`${adminText(locale, "الميزات", "Features")} (${adminLanguageName(locale, "en")})`}</Label>
              <div className="flex gap-2">
                <Input value={tagInputEn} onChange={(e) => setTagInputEn(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("featuresEn") }}} placeholder={adminText(locale, "أضف ميزة", "Add feature")} />
                <Button type="button" variant="outline" size="sm" onClick={() => addTag("featuresEn")}>{adminText(locale, "إضافة", "Add")}</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">{form.featuresEn.map((f, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag("featuresEn", i)}>{f} &times;</Badge>))}</div>
            </div>
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
            <Button variant="destructive" onClick={async () => { if (!deleting) return; const ok = await adminDelete(`/api/admin/products?id=${deleting.id}`); if (!ok) { toast.error(adminText(locale, "فشل الحذف", "Delete failed")); return } toast.success(t("delete")); setDeleteOpen(false); loadProducts() }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
