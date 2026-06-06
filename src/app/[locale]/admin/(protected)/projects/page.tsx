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
import type { Project } from "@/types"
import { adminLanguageName, adminProjectCategoryName, adminProjectStatusName, adminText } from "@/lib/admin-ui"
import { fetchAdminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-mock-data"

const categories = ["web", "mobile", "enterprise", "ai", "design", "other"]

const initialForm = {
  name: "", nameEn: "", client: "", clientEn: "",
  description: "", descriptionEn: "", category: "",
  technologies: [] as string[], status: "planning", url: "",
  published: false, images: [] as string[],
}

export default function AdminProjectsPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState<Project | null>(null)
  const [form, setForm] = useState(initialForm)
  const [techInput, setTechInput] = useState("")

  const loadProjects = () => fetchAdminList<Project>("/api/admin/projects").then(setProjects)

  useEffect(() => {
    loadProjects()
  }, [])

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditing(null); setForm(initialForm); setDialogOpen(true) }

  const openEdit = (project: Project) => {
    setEditing(project)
    setForm({
      name: project.name, nameEn: project.nameEn,
      client: project.client, clientEn: project.clientEn,
      description: project.description, descriptionEn: project.descriptionEn,
      category: project.category, technologies: [...project.technologies],
      status: project.status, url: project.url || "",
      published: project.published, images: [...project.images],
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.nameEn) { toast.error(t("required")); return }
    const ok = editing
      ? await adminUpdate("/api/admin/projects", { id: editing.id, ...form })
      : await adminCreate("/api/admin/projects", form)
    if (!ok) { toast.error(adminText(locale, "فشل الحفظ", "Save failed")); return }
    toast.success(editing ? t("edit") : t("create"))
    setDialogOpen(false)
    loadProjects()
  }

  const togglePublish = async (project: Project) => {
    const ok = await adminUpdate("/api/admin/projects", { id: project.id, published: !project.published })
    if (!ok) { toast.error(adminText(locale, "فشل التحديث", "Update failed")); return }
    toast.success(project.published ? t("draft") : t("publish"))
    loadProjects()
  }

  const addTech = () => {
    if (techInput.trim()) {
      setForm((prev) => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }))
      setTechInput("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("projects")}</h1>
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
              <TableHead>{t("name")}</TableHead>
              <TableHead>{adminText(locale, "العميل", "Client")}</TableHead>
              <TableHead>{adminText(locale, "التصنيف", "Category")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("published")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell><Badge variant="outline">{adminProjectCategoryName(locale, project.category)}</Badge></TableCell>
                <TableCell><Badge variant={project.status === "completed" ? "default" : "secondary"}>{adminProjectStatusName(locale, project.status)}</Badge></TableCell>
                <TableCell>{project.published ? <Badge variant="default">{t("published")}</Badge> : <Badge variant="outline">{t("draft")}</Badge>}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => togglePublish(project)}>
                      {project.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(project)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(project); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("projects")}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${t("name")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${t("name")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "العميل", "Client")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.client} onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "العميل", "Client")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.clientEn} onChange={(e) => setForm((p) => ({ ...p, clientEn: e.target.value }))} /></div>
            <div className="space-y-1.5">
              <Label>{adminText(locale, "التصنيف", "Category")}</Label>
              <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v ?? "web" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => (<SelectItem key={c} value={c}>{adminProjectCategoryName(locale, c)}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{t("status")}</Label>
              <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v ?? "completed" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">{adminProjectStatusName(locale, "planning")}</SelectItem>
                  <SelectItem value="in-progress">{adminProjectStatusName(locale, "in-progress")}</SelectItem>
                  <SelectItem value="completed">{adminProjectStatusName(locale, "completed")}</SelectItem>
                  <SelectItem value="on-hold">{adminProjectStatusName(locale, "on-hold")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>{adminText(locale, "الرابط", "URL")}</Label><Input value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.descriptionEn} onChange={(e) => setForm((p) => ({ ...p, descriptionEn: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2">
              <Label>{adminText(locale, "التقنيات", "Technologies")}</Label>
              <div className="flex gap-2">
                <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech() }}} placeholder={adminText(locale, "مثال: Next.js", "e.g. Next.js")} />
                <Button type="button" variant="outline" size="sm" onClick={addTech}>{adminText(locale, "إضافة", "Add")}</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">{form.technologies.map((t, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => setForm((p) => ({ ...p, technologies: p.technologies.filter((_, idx) => idx !== i) }))}>{t} &times;</Badge>))}</div>
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
            <Button variant="destructive" onClick={async () => { if (!deleting) return; const ok = await adminDelete(`/api/admin/projects?id=${deleting.id}`); if (!ok) { toast.error(adminText(locale, "فشل الحذف", "Delete failed")); return } toast.success(t("delete")); setDeleteOpen(false); loadProjects() }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
