"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import type { User } from "@/types"
import { adminRoleName, adminText } from "@/lib/admin-ui"
import { mockUsers, mockRoles, generateId, fetchWithMockFallback } from "@/lib/admin-mock-data"

const initialForm = { name: "", email: "", password: "", roleId: "1" }

export default function AdminUsersPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)
  const [deleting, setDeleting] = useState<User | null>(null)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    fetchWithMockFallback<User[]>("/api/admin/users", mockUsers).then(setUsers)
  }, [])

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditing(null); setForm(initialForm); setDialogOpen(true) }

  const openEdit = (user: User) => {
    setEditing(user)
    setForm({ name: user.name, email: user.email, password: "", roleId: user.role.id })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.email) { toast.error(t("required")); return }
    if (!editing && !form.password) { toast.error(t("required")); return }

    const role = mockRoles.find((r) => r.id === form.roleId) || mockRoles[0]

    if (editing) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editing.id
            ? { ...u, name: form.name, email: form.email, role }
            : u
        )
      )
      toast.success(t("edit"))
    } else {
      const newUser: User = { id: generateId(), name: form.name, email: form.email, role, active: true }
      setUsers((prev) => [...prev, newUser])
      toast.success(t("create"))
    }
    setDialogOpen(false)
  }

  const toggleActive = (user: User) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)))
    toast.success(user.active ? t("inactive") : t("active"))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("users")}</h1>
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
              <TableHead>{t("email")}</TableHead>
              <TableHead>{adminText(locale, "الدور", "Role")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-end">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-gray-text">{user.email}</TableCell>
                <TableCell><Badge variant="outline">{adminRoleName(locale, user.role.name)}</Badge></TableCell>
                <TableCell>
                  <Badge variant={user.active ? "default" : "outline"}>
                    {user.active ? t("active") : t("inactive")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => toggleActive(user)} title={user.active ? t("inactive") : t("active")}>
                      {user.active ? <ToggleRight className="size-3.5 text-green-600" /> : <ToggleLeft className="size-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(user)}><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setDeleting(user); setDeleteOpen(true) }}><Trash2 className="size-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-gray-text py-8">{t("noData")}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? t("edit") : t("create")}</DialogTitle>
            <DialogDescription>{t("users")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>{t("name")}</Label><Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>{t("email")}</Label><Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></div>
            {!editing && (
              <div className="space-y-1.5"><Label>{t("password")}</Label><Input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} /></div>
            )}
            <div className="space-y-1.5">
              <Label>{adminText(locale, "الدور", "Role")}</Label>
              <Select value={form.roleId} onValueChange={(v) => setForm((p) => ({ ...p, roleId: v ?? "" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {mockRoles.map((r) => (<SelectItem key={r.id} value={r.id}>{adminRoleName(locale, r.name)}</SelectItem>))}
                </SelectContent>
              </Select>
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
            <Button variant="destructive" onClick={() => { setUsers((prev) => prev.filter((u) => u.id !== deleting?.id)); toast.success(t("delete")); setDeleteOpen(false) }}>{t("delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
