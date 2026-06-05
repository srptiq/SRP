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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import type { Service } from "@/types"
import { adminLanguageName, adminText } from "@/lib/admin-ui"
import { mockServices, generateId, fetchWithMockFallback } from "@/lib/admin-mock-data"

export default function AdminServicesPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [services, setServices] = useState<Service[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [deleting, setDeleting] = useState<Service | null>(null)

  const emptyForm: Omit<Service, "id"> = {
    title: "", titleEn: "", description: "", descriptionEn: "",
    icon: "", slug: "", published: false, features: [],
  }
  const [form, setForm] = useState<Omit<Service, "id">>(emptyForm)
  const [featureInput, setFeatureInput] = useState("")

  useEffect(() => {
    fetchWithMockFallback<Service[]>("/api/admin/services", mockServices).then(setServices)
  }, [])

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.titleEn.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFeatureInput("")
    setDialogOpen(true)
  }

  const openEdit = (service: Service) => {
    setEditing(service)
    setForm({
      title: service.title, titleEn: service.titleEn,
      description: service.description, descriptionEn: service.descriptionEn,
      icon: service.icon, slug: service.slug,
      published: service.published, features: [...service.features],
    })
    setFeatureInput("")
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.title || !form.titleEn) {
      toast.error(t("required"))
      return
    }

    if (editing) {
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s))
      )
      toast.success(t("edit"))
    } else {
      const newService: Service = { id: generateId(), ...form }
      setServices((prev) => [...prev, newService])
      toast.success(t("create"))
    }
    setDialogOpen(false)
  }

  const confirmDelete = () => {
    if (deleting) {
      setServices((prev) => prev.filter((s) => s.id !== deleting.id))
      toast.success(t("delete"))
      setDeleteOpen(false)
      setDeleting(null)
    }
  }

  const togglePublish = (service: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, published: !s.published } : s))
    )
    toast.success(service.published ? t("draft") : t("publish"))
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
      setFeatureInput("")
    }
  }

  const removeFeature = (index: number) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("services")}</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus className="size-4" /> {t("create")}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-text" />
        <Input
          placeholder={t("search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="rounded-xl bg-white ring-1 ring-border-light overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{adminText(locale, "المعرف", "ID")}</TableHead>
              <TableHead>{`${t("title")} (${adminLanguageName(locale, "ar")})`}</TableHead>
              <TableHead>{`${t("title")} (${adminLanguageName(locale, "en")})`}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="text-gray-text text-xs">{service.id.slice(0, 8)}</TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.titleEn}</TableCell>
                <TableCell>
                  <Badge variant={service.published ? "default" : "outline"}>
                    {service.published ? t("published") : t("draft")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => togglePublish(service)}>
                      {service.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(service)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(service); setDeleteOpen(true) }}>
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-text py-8">{t("noData")}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("services")}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>{`${t("title")} (${adminLanguageName(locale, "ar")})`}</Label>
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>{`${t("title")} (${adminLanguageName(locale, "en")})`}</Label>
              <Input value={form.titleEn} onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "ar")})`}</Label>
              <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "en")})`}</Label>
              <Textarea value={form.descriptionEn} onChange={(e) => setForm((p) => ({ ...p, descriptionEn: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>{adminText(locale, "الأيقونة", "Icon")}</Label>
              <Input value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>{adminText(locale, "المعرّف", "Slug")}</Label>
              <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>{adminText(locale, "الميزات", "Features")}</Label>
              <div className="flex gap-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
                  placeholder={adminText(locale, "اكتب ثم اضغط إدخال", "Type and press Enter")}
                />
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>{adminText(locale, "إضافة", "Add")}</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {form.features.map((f, i) => (
                  <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeFeature(i)}>
                    {f} &times;
                  </Badge>
                ))}
              </div>
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
          <DialogHeader>
            <DialogTitle>{t("delete")}</DialogTitle>
            <DialogDescription>{t("deleteConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t("cancel")}</Button>} />
            <Button variant="destructive" onClick={confirmDelete}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
