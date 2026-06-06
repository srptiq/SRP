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
import { formatDate } from "@/lib/utils"
import { adminEmptyValue, adminLanguageName, adminText } from "@/lib/admin-ui"
import type { BlogPost } from "@/types"
import { fetchAdminList, adminCreate, adminUpdate, adminDelete } from "@/lib/admin-mock-data"

const blogCategories = [
  { id: "1", name: "تقنية", nameEn: "Technology", slug: "technology" },
  { id: "2", name: "أعمال", nameEn: "Business", slug: "business" },
  { id: "3", name: "تصميم", nameEn: "Design", slug: "design" },
]

const initialForm = {
  title: "", titleEn: "", slug: "",
  content: "", contentEn: "",
  excerpt: "", excerptEn: "",
  category: undefined as { id: string; name: string; nameEn: string; slug: string } | undefined,
  tags: [] as string[],
  author: "", image: "",
  published: false,
}

export default function AdminBlogPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [deleting, setDeleting] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(initialForm)
  const [tagInput, setTagInput] = useState("")

  const loadPosts = () => fetchAdminList<BlogPost>("/api/admin/blog").then(setPosts)

  useEffect(() => {
    loadPosts()
  }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.titleEn.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditing(null); setForm(initialForm); setDialogOpen(true) }

  const openEdit = (post: BlogPost) => {
    setEditing(post)
    setForm({
      title: post.title, titleEn: post.titleEn, slug: post.slug,
      content: post.content, contentEn: post.contentEn || "",
      excerpt: post.excerpt || "", excerptEn: post.excerptEn || "",
      category: post.category, tags: [...post.tags],
      author: post.author || "", image: post.image || "",
      published: post.published,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.titleEn) { toast.error(t("required")); return }
    // `category` is a relation object, not a DB column — exclude it from the payload.
    const { category, ...payload } = form
    void category
    const ok = editing
      ? await adminUpdate("/api/admin/blog", { id: editing.id, ...payload })
      : await adminCreate("/api/admin/blog", payload)
    if (!ok) { toast.error(adminText(locale, "فشل الحفظ", "Save failed")); return }
    toast.success(editing ? t("edit") : t("create"))
    setDialogOpen(false)
    loadPosts()
  }

  const togglePublish = async (post: BlogPost) => {
    const ok = await adminUpdate("/api/admin/blog", { id: post.id, published: !post.published })
    if (!ok) { toast.error(adminText(locale, "فشل التحديث", "Update failed")); return }
    toast.success(post.published ? t("draft") : t("publish"))
    loadPosts()
  }

  const addTag = () => {
    if (tagInput.trim()) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("blog")}</h1>
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
              <TableHead>{t("title")}</TableHead>
              <TableHead>{adminText(locale, "الكاتب", "Author")}</TableHead>
              <TableHead>{adminText(locale, "التصنيف", "Category")}</TableHead>
              <TableHead>{t("published")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-48 truncate">{post.title}</TableCell>
                <TableCell>{post.author || adminEmptyValue(locale)}</TableCell>
                <TableCell><Badge variant="outline">{post.category ? (locale === "ar" ? post.category.name : post.category.nameEn) : adminEmptyValue(locale)}</Badge></TableCell>
                <TableCell>{post.published ? <Badge variant="default">{t("published")}</Badge> : <Badge variant="outline">{t("draft")}</Badge>}</TableCell>
                <TableCell className="text-gray-text">{formatDate(post.createdAt, locale)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => togglePublish(post)}>
                      {post.published ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(post)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(post); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
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
            <DialogDescription>{t("blog")}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${t("title")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{`${t("title")} (${adminLanguageName(locale, "en")})`}</Label><Input value={form.titleEn} onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "المعرّف", "Slug")}</Label><Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} /></div>
            <div className="space-y-1.5">
              <Label>{adminText(locale, "التصنيف", "Category")}</Label>
              <Select value={form.category?.id || ""} onValueChange={(v) => v && setForm((p) => ({ ...p, category: blogCategories.find((c) => c.id === v) }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {blogCategories.map((c) => (<SelectItem key={c.id} value={c.id}>{locale === "ar" ? (c.slug === "technology" ? "تقنية" : c.slug === "business" ? "أعمال" : "تصميم") : c.nameEn}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>{adminText(locale, "الكاتب", "Author")}</Label><Input value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{adminText(locale, "رابط الصورة", "Image URL")}</Label><Input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الملخص", "Excerpt")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={form.excerpt} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "الملخص", "Excerpt")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={form.excerptEn} onChange={(e) => setForm((p) => ({ ...p, excerptEn: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "المحتوى", "Content")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea className="min-h-32" value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2"><Label>{`${adminText(locale, "المحتوى", "Content")} (${adminLanguageName(locale, "en")})`}</Label><Textarea className="min-h-32" value={form.contentEn} onChange={(e) => setForm((p) => ({ ...p, contentEn: e.target.value }))} /></div>
            <div className="space-y-1.5 col-span-2">
              <Label>{adminText(locale, "الوسوم", "Tags")}</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() }}} placeholder={adminText(locale, "أضف وسمًا", "Add tag")} />
                <Button type="button" variant="outline" size="sm" onClick={addTag}>{adminText(locale, "إضافة", "Add")}</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">{form.tags.map((t, i) => (<Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => setForm((p) => ({ ...p, tags: p.tags.filter((_, idx) => idx !== i) }))}>{t} &times;</Badge>))}</div>
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
            <Button variant="destructive" onClick={async () => { if (!deleting) return; const ok = await adminDelete(`/api/admin/blog?id=${deleting.id}`); if (!ok) { toast.error(adminText(locale, "فشل الحذف", "Delete failed")); return } toast.success(t("delete")); setDeleteOpen(false); loadPosts() }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
