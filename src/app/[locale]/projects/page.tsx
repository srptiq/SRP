"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { projects } from "@/lib/projects-data"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const allCategories = [
  { name: "الكل", nameEn: "All", slug: "all" },
  { name: "تقنية قانونية", nameEn: "Legal Tech", slug: "legal-tech" },
  { name: "هوية بصرية", nameEn: "Visual Identity", slug: "visual-identity" },
  { name: "تسويق وولاء", nameEn: "Marketing & Loyalty", slug: "marketing-loyalty" },
  { name: "تحليلات", nameEn: "Analytics", slug: "analytics" },
  { name: "تقنية تعليمية", nameEn: "EdTech", slug: "edtech" },
  { name: "تقنية صحية", nameEn: "HealthTech", slug: "healthtech" },
]

const statusColors: Record<string, string> = {
  "منجز": "bg-green-100 text-green-700",
  "Completed": "bg-green-100 text-green-700",
  "قيد التطوير": "bg-blue-100 text-blue-700",
  "In Development": "bg-blue-100 text-blue-700",
}

export default function ProjectsPage() {
  const locale = useLocale()
  const isRtl = locale === "ar"
  const t = useTranslations("projects")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => {
        const catSlug = isRtl
          ? p.category
          : p.categoryEn.toLowerCase().replace(/\s+/g, "-")
        return catSlug === activeFilter
      })

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "linear" as const } },
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
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allCategories.map((cat) => {
              const label = isRtl ? cat.name : cat.nameEn
              const isActive = activeFilter === cat.slug
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveFilter(cat.slug)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "gradient-brand text-white shadow-md"
                      : "bg-white text-text-body border border-border-light hover:border-blue/30"
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => {
              const name = isRtl ? project.name : project.nameEn
              const client = isRtl ? project.client : project.clientEn
              const description = isRtl ? project.description : project.descriptionEn
              const category = isRtl ? project.category : project.categoryEn
              const status = isRtl ? project.status : project.statusEn

              return (
              <Link
                  href={`/projects/${project.slug}`}
                  key={project.id + "-card"}
                  className="block"
                >
                <motion.div variants={item}>
                  <div className="bg-white rounded-2xl border border-border-light p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan/30 group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0">
                        {project.nameEn.charAt(0)}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium px-3 py-1 rounded-full",
                          statusColors[status] || "bg-gray-100 text-gray-600"
                        )}
                      >
                        {status}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-navy mb-1 group-hover:text-blue transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-text mb-3">{client}</p>

                    <span className="inline-block text-xs font-medium text-blue bg-blue/5 px-3 py-1 rounded-full mb-4">
                      {category}
                    </span>

                    <p className="text-sm text-text-body leading-relaxed mb-4 line-clamp-3">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-soft-gray text-text-body px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
              )
            })}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-text text-lg">
                {isRtl ? "لا توجد مشاريع في هذا التصنيف" : "No projects in this category"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
