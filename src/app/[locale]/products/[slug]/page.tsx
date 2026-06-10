import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPublicProductBySlug } from "@/lib/products-db"
import { cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const product = await getPublicProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }
  return {
    title: locale === "ar" ? product.name : product.nameEn,
    description: locale === "ar" ? product.description : product.descriptionEn,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isRtl = locale === "ar"
  const t = await getTranslations("productDetail")

  const product = await getPublicProductBySlug(slug)
  if (!product) notFound()

  const name = isRtl ? product.name : product.nameEn
  const description = isRtl ? product.description : product.descriptionEn
  const features = isRtl ? product.features : product.featuresEn
  const problem = isRtl ? product.problem : product.problemEn
  const targetAudience = isRtl ? product.targetAudience : product.targetAudienceEn
  const howItWorks = isRtl ? product.howItWorks : product.howItWorksEn

  const statusLabel = isRtl ? product.status : ({
    "نشط": "Active",
    "بيتا": "Beta",
    "قريباً": "Coming Soon",
  } as Record<string, string>)[product.status] || product.status

  const statusColor = isRtl
    ? product.status === "نشط"
      ? "bg-green-100 text-green-700"
      : product.status === "بيتا"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-700"
    : product.status === "نشط"
      ? "bg-green-100 text-green-700"
      : product.status === "بيتا"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-700"

  const howItWorksList = howItWorks.split("\n").filter(Boolean)

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-text hover:text-white transition-colors mb-8 text-sm"
          >
            <svg
              className={cn("w-4 h-4", isRtl && "rotate-180")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isRtl ? "العودة للمنتجات" : "Back to Products"}
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white p-4 shadow-2xl">
              <Image
                src={product.logo}
                alt={`${name} logo`}
                width={200}
                height={120}
                className="max-h-20 max-w-full w-auto object-contain"
                priority
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
                  {name}
                </h1>
                <span className={cn("text-sm font-medium px-3 py-1 rounded-full", statusColor)}>
                  {statusLabel}
                </span>
              </div>
              <p className="text-lg text-gray-text leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="lg:w-5/6 mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <div
                className="bg-white rounded-2xl border border-border-light p-8"
                style={{
                  animation: "fadeInUp 0.5s ease-out both",
                }}
              >
                <h2 className="font-heading text-2xl font-bold text-navy mb-4">
                  {t("overview")}
                </h2>
                <p className="text-text-body leading-relaxed">{description}</p>
              </div>

              <div
                className="bg-white rounded-2xl border border-border-light p-8 mt-6"
                style={{
                  animation: "fadeInUp 0.5s ease-out 0.1s both",
                }}
              >
                <h2 className="font-heading text-2xl font-bold text-navy mb-4">
                  {t("problem")}
                </h2>
                <p className="text-text-body leading-relaxed">{problem}</p>
              </div>
            </div>

            <div>
              <div
                className="bg-white rounded-2xl border border-border-light p-8"
                style={{
                  animation: "fadeInUp 0.5s ease-out 0.2s both",
                }}
              >
                <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                  {t("features")}
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-5/6 mx-auto grid md:grid-cols-2 gap-8 mt-8">
            <div
              className="bg-white rounded-2xl border border-border-light p-8"
              style={{
                animation: "fadeInUp 0.5s ease-out 0.3s both",
              }}
            >
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">
                {t("targetAudience")}
              </h2>
              <p className="text-text-body leading-relaxed">{targetAudience}</p>
            </div>

            <div
              className="bg-white rounded-2xl border border-border-light p-8"
              style={{
                animation: "fadeInUp 0.5s ease-out 0.4s both",
              }}
            >
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                {t("howItWorks")}
              </h2>
              <ol className="space-y-4">
                {howItWorksList.map((step, i) => {
                  const stepMatch = step.match(/^\d+[\.\s]*(.+)$/)
                  const stepText = stepMatch ? stepMatch[1] : step
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-text-body">{stepText}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 gradient-brand text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg shadow-lg"
            >
              {t("cta")}
              <svg
                className={cn("w-5 h-5", isRtl && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
