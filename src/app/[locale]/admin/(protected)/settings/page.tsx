"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Save, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SiteSetting } from "@/types"
import { adminLanguageName, adminText } from "@/lib/admin-ui"
import { fetchAdminList, adminUpdate } from "@/lib/admin-mock-data"

export default function AdminSettingsPage() {
  const t = useTranslations("admin")
  const locale = useLocale()
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAdminList<SiteSetting>("/api/admin/settings").then(setSettings)
  }, [])

  const get = (key: string) => settings.find((s) => s.key === key)?.value || ""

  const set = (key: string, value: string) => {
    setSettings((prev) => {
      const exists = prev.find((s) => s.key === key)
      if (exists) {
        return prev.map((s) => (s.key === key ? { ...s, value } : s))
      }
      return [...prev, { key, value }]
    })
  }

  const handleSave = async () => {
    setLoading(true)
    const ok = await adminUpdate("/api/admin/settings", { settings })
    setLoading(false)
    if (!ok) {
      toast.error(adminText(locale, "فشل الحفظ", "Save failed"))
      return
    }
    toast.success(t("save"))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading font-semibold text-navy">{t("settings")}</h1>
        <Button size="sm" onClick={handleSave} disabled={loading}>
          <Save className="size-4" /> {t("save")}
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>{adminText(locale, "معلومات الموقع", "Site Info")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${adminText(locale, "اسم الموقع", "Site Name")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={get("site_name_ar")} onChange={(e) => set("site_name_ar", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "اسم الموقع", "Site Name")} (${adminLanguageName(locale, "en")})`}</Label><Input value={get("site_name_en")} onChange={(e) => set("site_name_en", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "ar")})`}</Label><Textarea value={get("site_desc_ar")} onChange={(e) => set("site_desc_ar", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "الوصف", "Description")} (${adminLanguageName(locale, "en")})`}</Label><Textarea value={get("site_desc_en")} onChange={(e) => set("site_desc_en", e.target.value)} /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{adminText(locale, "التواصل", "Contact")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{t("email")}</Label><Input type="email" value={get("site_email")} onChange={(e) => set("site_email", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>{t("phone")}</Label><Input value={get("site_phone")} onChange={(e) => set("site_phone", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>{`${adminText(locale, "العنوان", "Address")} (${adminLanguageName(locale, "ar")})`}</Label><Input value={get("site_address_ar")} onChange={(e) => set("site_address_ar", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>{`${adminText(locale, "العنوان", "Address")} (${adminLanguageName(locale, "en")})`}</Label><Input value={get("site_address_en")} onChange={(e) => set("site_address_en", e.target.value)} /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t("social")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5"><Label>Twitter</Label><Input value={get("social_twitter")} onChange={(e) => set("social_twitter", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>LinkedIn</Label><Input value={get("social_linkedin")} onChange={(e) => set("social_linkedin", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Instagram</Label><Input value={get("social_instagram")} onChange={(e) => set("social_instagram", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>YouTube</Label><Input value={get("social_youtube")} onChange={(e) => set("social_youtube", e.target.value)} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{adminText(locale, "الشعار والأيقونة", "Logo & Favicon")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-lg border border-border bg-muted">
              <ImageIcon className="size-6 text-gray-text" />
            </div>
            <div className="space-y-1.5 flex-1"><Label>{adminText(locale, "رابط الشعار", "Logo URL")}</Label><Input placeholder="/logo.png" /></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-muted">
              <ImageIcon className="size-5 text-gray-text" />
            </div>
            <div className="space-y-1.5 flex-1"><Label>{adminText(locale, "رابط الأيقونة", "Favicon URL")}</Label><Input placeholder="/favicon.ico" /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t("meta")}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5"><Label>{adminText(locale, "عنوان الميتا", "Meta Title")}</Label><Input value={get("meta_title")} onChange={(e) => set("meta_title", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>{adminText(locale, "وصف الميتا", "Meta Description")}</Label><Textarea value={get("meta_desc")} onChange={(e) => set("meta_desc", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>{adminText(locale, "الكلمات المفتاحية", "Meta Keywords")}</Label><Input value={get("meta_keywords")} onChange={(e) => set("meta_keywords", e.target.value)} /></div>
        </CardContent>
      </Card>
    </div>
  )
}
