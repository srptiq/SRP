import { getLocale, getTranslations } from "next-intl/server"
import NotFoundView from "@/components/shared/NotFoundView"

export default async function LocaleNotFound() {
  // This can render under an invalid/unknown locale segment (e.g. /contact),
  // where the next-intl request context is unavailable. Fall back to static
  // Arabic copy so the 404 renders instead of throwing a 500.
  let title = "الصفحة غير موجودة"
  let description = "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
  let backHomeLabel = "العودة للرئيسية"
  let homeHref = "/"
  let isRtl = true

  try {
    const t = await getTranslations("errors")
    const locale = await getLocale()
    title = t("notFound")
    description = t("notFoundDescription")
    backHomeLabel = t("backHome")
    homeHref = locale === "ar" ? "/" : "/en"
    isRtl = locale === "ar"
  } catch {
    // Keep the static Arabic fallback defined above.
  }

  return (
    <NotFoundView
      title={title}
      description={description}
      backHomeLabel={backHomeLabel}
      homeHref={homeHref}
      isRtl={isRtl}
    />
  )
}
