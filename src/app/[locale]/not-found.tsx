import { getLocale, getTranslations } from "next-intl/server"
import NotFoundView from "@/components/shared/NotFoundView"

export default async function LocaleNotFound() {
  const t = await getTranslations("errors")
  const locale = await getLocale()

  return (
    <NotFoundView
      title={t("notFound")}
      description={t("notFoundDescription")}
      backHomeLabel={t("backHome")}
      homeHref={locale === "ar" ? "/" : "/en"}
      isRtl={locale === "ar"}
    />
  )
}
