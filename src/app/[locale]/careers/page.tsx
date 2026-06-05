import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Mail, Send } from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "careers" })

  return {
    title: t("title"),
    description: t("subtitle"),
  }
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "careers" })
  const isRtl = locale === "ar"

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10 text-center">
          <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
            {t("openPositions")}
          </span>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-text">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-white p-8 text-center shadow-sm md:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
              <Mail className="size-6 text-blue" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
              {t("noPositions")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {isRtl
                ? "نحتفظ دائماً بمساحة للمواهب القوية. إذا رغبت بالانضمام لنا، أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة."
                : "We always keep an eye out for strong talent. Share your CV and we will reach out when a suitable opening becomes available."}
            </p>
            <a
              href="mailto:careers@srptiq.com?subject=Career%20Application"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Send className="size-4" />
              {t("sendCV")}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
