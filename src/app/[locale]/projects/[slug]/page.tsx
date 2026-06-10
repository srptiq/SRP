import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { getPublicProjectBySlug } from "@/lib/projects-db"
import { cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = await getPublicProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }
  return {
    title: locale === "ar" ? project.name : project.nameEn,
    description: locale === "ar" ? project.description : project.descriptionEn,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isRtl = locale === "ar"

  const project = await getPublicProjectBySlug(slug)
  if (!project) notFound()

  const name = isRtl ? project.name : project.nameEn
  const client = isRtl ? project.client : project.clientEn
  const description = isRtl ? project.description : project.descriptionEn
  const details = isRtl ? project.details : project.detailsEn
  const category = isRtl ? project.category : project.categoryEn
  const status = isRtl ? project.status : project.statusEn

  const statusColor = status === "Completed" || status === "منجز"
    ? "bg-green-100 text-green-700"
    : "bg-blue-100 text-blue-700"

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-text hover:text-white transition-colors mb-8 text-sm"
          >
            <svg
              className={cn("w-4 h-4", isRtl && "rotate-180")}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isRtl ? "العودة للمشاريع" : "Back to Projects"}
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
              {project.nameEn.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
                  {name}
                </h1>
                <span className={cn("text-sm font-medium px-3 py-1 rounded-full", statusColor)}>
                  {status}
                </span>
              </div>
              <p className="text-lg text-gray-text">{client}</p>
              <span className="inline-block mt-3 text-xs font-medium text-cyan bg-cyan/10 px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="lg:w-5/6 mx-auto">
            <div
              className="bg-white rounded-2xl border border-border-light p-8 md:p-10 mb-8"
              style={{ animation: "fadeInUp 0.5s ease-out both" }}
            >
              <h2 className="font-heading text-2xl font-bold text-navy mb-4">
                {isRtl ? "عن المشروع" : "About the Project"}
              </h2>
              <p className="text-text-body leading-relaxed text-lg mb-6">{description}</p>
              <p className="text-text-body leading-relaxed">{details}</p>
            </div>

            <div
              className="bg-white rounded-2xl border border-border-light p-8 md:p-10 mb-8"
              style={{ animation: "fadeInUp 0.5s ease-out 0.1s both" }}
            >
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                {isRtl ? "التقنيات المستخدمة" : "Technologies Used"}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-soft-gray text-text-body px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-blue/5 to-cyan/5 rounded-2xl border border-blue/10 p-8 md:p-10 text-center"
              style={{ animation: "fadeInUp 0.5s ease-out 0.2s both" }}
            >
              <h3 className="font-heading text-xl font-bold text-navy mb-3">
                {isRtl ? "هل لديك مشروع مشابه؟" : "Have a Similar Project?"}
              </h3>
              <p className="text-text-body mb-6 max-w-lg mx-auto">
                {isRtl
                  ? "نحن هنا لمساعدتك في تحويل فكرتك إلى واقع. تواصل معنا اليوم لمناقشة مشروعك."
                  : "We're here to help turn your idea into reality. Contact us today to discuss your project."}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 gradient-brand text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                {isRtl ? "تواصل معنا" : "Contact Us"}
                <svg
                  className={cn("w-4 h-4", isRtl && "rotate-180")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
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
