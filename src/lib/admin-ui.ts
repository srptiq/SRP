type LocaleText = {
  ar: string
  en: string
}

function pickLocale(locale: string, text: LocaleText) {
  return locale === "ar" ? text.ar : text.en
}

export function adminText(locale: string, ar: string, en: string) {
  return pickLocale(locale, { ar, en })
}

export function adminLanguageName(locale: string, language: "ar" | "en") {
  return pickLocale(
    locale,
    language === "ar"
      ? { ar: "العربية", en: "Arabic" }
      : { ar: "الإنجليزية", en: "English" }
  )
}

export function adminLocaleName(locale: string, value: "all" | "ar" | "en") {
  if (value === "all") {
    return pickLocale(locale, { ar: "الكل", en: "All" })
  }

  return adminLanguageName(locale, value)
}

export function adminRoleName(locale: string, role: string) {
  const labels: Record<string, LocaleText> = {
    admin: { ar: "مدير", en: "Admin" },
    editor: { ar: "محرر", en: "Editor" },
    viewer: { ar: "مشاهد", en: "Viewer" },
  }

  return pickLocale(locale, labels[role] ?? { ar: role, en: role })
}

export function adminProductStatusName(locale: string, status: string) {
  const labels: Record<string, LocaleText> = {
    active: { ar: "نشط", en: "Active" },
    development: { ar: "قيد التطوير", en: "Development" },
    archived: { ar: "مؤرشف", en: "Archived" },
  }

  return pickLocale(locale, labels[status] ?? { ar: status, en: status })
}

export function adminProjectStatusName(locale: string, status: string) {
  const labels: Record<string, LocaleText> = {
    planning: { ar: "قيد التخطيط", en: "Planning" },
    "in-progress": { ar: "قيد التنفيذ", en: "In Progress" },
    completed: { ar: "مكتمل", en: "Completed" },
    "on-hold": { ar: "معلق", en: "On Hold" },
  }

  return pickLocale(locale, labels[status] ?? { ar: status, en: status })
}

export function adminFaqCategoryName(locale: string, category: string) {
  const labels: Record<string, LocaleText> = {
    general: { ar: "عام", en: "General" },
    project: { ar: "المشاريع", en: "Project" },
    services: { ar: "الخدمات", en: "Services" },
    pricing: { ar: "الأسعار", en: "Pricing" },
    technical: { ar: "تقني", en: "Technical" },
    other: { ar: "أخرى", en: "Other" },
  }

  return pickLocale(locale, labels[category] ?? { ar: category, en: category })
}

export function adminRequestProjectTypeName(locale: string, type: string) {
  const labels: Record<string, LocaleText> = {
    web: { ar: "ويب", en: "Web" },
    mobile: { ar: "جوال", en: "Mobile" },
    enterprise: { ar: "مؤسسي", en: "Enterprise" },
    ai: { ar: "ذكاء اصطناعي", en: "AI" },
    design: { ar: "تصميم", en: "Design" },
    consulting: { ar: "استشارات", en: "Consulting" },
    other: { ar: "أخرى", en: "Other" },
  }

  return pickLocale(locale, labels[type] ?? { ar: type, en: type })
}

export function adminEmptyValue(locale: string) {
  return pickLocale(locale, { ar: "غير محدد", en: "Not set" })
}

export function adminProjectCategoryName(locale: string, category: string) {
  const labels: Record<string, LocaleText> = {
    web: { ar: "ويب", en: "Web" },
    mobile: { ar: "جوال", en: "Mobile" },
    enterprise: { ar: "مؤسسي", en: "Enterprise" },
    ai: { ar: "ذكاء اصطناعي", en: "AI" },
    design: { ar: "تصميم", en: "Design" },
    other: { ar: "أخرى", en: "Other" },
  }

  return pickLocale(locale, labels[category] ?? { ar: category, en: category })
}
