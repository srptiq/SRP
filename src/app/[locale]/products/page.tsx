import type { Metadata } from "next"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPublicProducts } from "@/lib/products-db"
import { cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "products" })
  return {
    title: t("title"),
    description: t("subtitle"),
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations("products")
  const isRtl = locale === "ar"
  const products = await getPublicProducts()

  const statusColors: Record<string, string> = {
    نشط: "bg-green-100 text-green-700",
    بيتا: "bg-blue-100 text-blue-700",
    "قريباً": "bg-amber-100 text-amber-700",
    Active: "bg-green-100 text-green-700",
    Beta: "bg-blue-100 text-blue-700",
    "Coming Soon": "bg-amber-100 text-amber-700",
  }

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-text leading-relaxed max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const displayName = isRtl ? product.name : product.nameEn
              const displayFeatures = isRtl ? product.features.slice(0, 3) : product.featuresEn.slice(0, 3)
              const statusLabel = isRtl ? product.status : {
                "نشط": "Active",
                "بيتا": "Beta",
                "قريباً": "Coming Soon",
              }[product.status] || product.status

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                  >
                    <div
                      className="bg-white rounded-2xl border border-border-light p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan/30"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border-light bg-white p-3 shadow-sm">
                        <Image
                          src={product.logo}
                          alt={`${displayName} logo`}
                          width={96}
                          height={96}
                          className="max-h-10 max-w-full w-auto object-contain"
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium px-3 py-1 rounded-full",
                          statusColors[statusLabel] || "bg-gray-100 text-gray-600"
                        )}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-blue transition-colors">
                      {displayName}
                    </h3>

                    <p className="text-gray-text text-sm leading-relaxed mb-4 line-clamp-3">
                      {isRtl ? product.description : product.descriptionEn}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {displayFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-2 text-blue font-medium text-sm group-hover:gap-3 transition-all">
                      {isRtl ? "اكتشف المزيد" : "Discover More"}
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                          isRtl && "rotate-180"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
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
