"use client"

import { useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { blogPosts as fallbackPosts, blogCategories, type BlogPost } from "@/lib/blog-data"
import { formatDate, cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const locale = useLocale()
  const isRtl = locale === "ar"
  const t = useTranslations("blog")
  const tc = useTranslations("common")

  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackPosts)

  // Replace the built-in content with posts managed from the admin (database)
  // whenever any are published.
  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json() as Promise<{ data?: BlogPost[] }>)
      .then((d) => {
        if (Array.isArray(d?.data) && d.data.length > 0) setBlogPosts(d.data)
      })
      .catch(() => {})
  }, [])

  const filtered = activeCategory === "all"
    ? blogPosts
    : blogPosts.filter((p) => {
        const catSlug = (isRtl ? p.category : p.categoryEn)
          .toLowerCase()
          .replace(/[\s&]+/g, "-")
        return catSlug === activeCategory
      })

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

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

  const categoryItems = isRtl
    ? blogCategories
    : blogCategories.map((c) => ({ ...c, name: c.nameEn }))

  const readerColors = [
    "from-blue-400 to-cyan-300",
    "from-cyan-300 to-blue-500",
    "from-blue-500 to-blue-400",
    "from-cyan-400 to-blue-300",
    "from-blue-600 to-cyan-400",
    "from-cyan-500 to-blue-600",
  ]

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug)
    setCurrentPage(1)
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
            {categoryItems.map((cat) => {
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "gradient-brand text-white shadow-md"
                      : "bg-white text-text-body border border-border-light hover:border-blue/30"
                  )}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + currentPage}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginated.map((post, postIndex) => {
                const title = isRtl ? post.title : post.titleEn
                const excerpt = isRtl ? post.excerpt : post.excerptEn
                const category = isRtl ? post.category : post.categoryEn
                const author = isRtl ? post.author : post.authorEn
                const parsedId = parseInt(post.id, 10)
                const colorIdx = (Number.isNaN(parsedId) ? postIndex : parsedId) % readerColors.length

                return (
                  <motion.div key={post.id} variants={item} layout>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white rounded-2xl border border-border-light overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan/30 h-full"
                    >
                      <div
                        className={cn(
                          "h-48 gradient-brand flex items-center justify-center",
                          readerColors[colorIdx]
                        )}
                      >
                        <span className="font-heading text-6xl font-bold text-white/20">
                          {title.charAt(0)}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium text-blue bg-blue/5 px-3 py-1 rounded-full">
                            {category}
                          </span>
                          <span className="text-xs text-gray-text">
                            {formatDate(post.date, locale)}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-blue transition-colors line-clamp-2">
                          {title}
                        </h3>
                        <p className="text-sm text-text-body leading-relaxed mb-4 line-clamp-2">
                          {excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-text">{author}</span>
                          <span className="inline-flex items-center gap-1 text-blue text-sm font-medium group-hover:gap-2 transition-all">
                            {isRtl ? "اقرأ المزيد" : "Read More"}
                            <svg
                              className={cn("w-4 h-4", isRtl && "rotate-180")}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {paginated.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-text text-lg">
                {isRtl ? "لا توجد مقالات في هذا التصنيف" : "No posts in this category"}
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-16">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                  currentPage === 1
                    ? "border-border-light text-gray-text cursor-not-allowed"
                    : "border-border-light text-text-body hover:border-blue/30 hover:text-blue"
                )}
              >
                {tc("previous")}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                    page === currentPage
                      ? "gradient-brand text-white shadow-md"
                      : "border border-border-light text-text-body hover:border-blue/30 hover:text-blue"
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                  currentPage === totalPages
                    ? "border-border-light text-gray-text cursor-not-allowed"
                    : "border-border-light text-text-body hover:border-blue/30 hover:text-blue"
                )}
              >
                {tc("next")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
