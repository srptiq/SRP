import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getPublicBlogPostBySlug, getPublicBlogPosts } from "@/lib/blog-db"
import { formatDate, cn } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPublicBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: locale === "ar" ? post.title : post.titleEn,
    description: locale === "ar" ? post.excerpt : post.excerptEn,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isRtl = locale === "ar"
  const t = await getTranslations("blog")

  const post = await getPublicBlogPostBySlug(slug)
  if (!post) notFound()

  const title = isRtl ? post.title : post.titleEn
  const content = isRtl ? post.content : post.contentEn
  const category = isRtl ? post.category : post.categoryEn
  const author = isRtl ? post.author : post.authorEn

  const allPosts = await getPublicBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.categoryEn === post.categoryEn))
    .slice(0, 3)

  const readerColors = [
    "from-blue-400 to-cyan-300",
    "from-cyan-300 to-blue-500",
    "from-blue-500 to-blue-400",
  ]

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <Link
            href="/blog"
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
            {isRtl ? "العودة للمدونة" : "Back to Blog"}
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-blue bg-blue/10 px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-sm text-gray-text">
                {formatDate(post.date, locale)}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-gray-text">
              <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold">
                {author.charAt(0)}
              </div>
              <span className="text-sm">{author}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </section>

      <article className="py-16 md:py-24">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              style={{
                direction: isRtl ? "rtl" : "ltr",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-12 pt-8 border-t border-border-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white text-lg font-bold">
                    {author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-navy">{author}</p>
                    <p className="text-sm text-gray-text">
                      {isRtl ? "كاتب في SRPTIQ" : "Writer at SRPTIQ"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href)
                      alert(isRtl ? "تم نسخ الرابط" : "Link copied!")
                    } catch {
                      // silently fail
                    }
                  }}
                  className="flex items-center gap-2 text-sm text-blue hover:text-blue/80 transition-colors px-4 py-2 rounded-lg border border-blue/20 hover:border-blue/40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {isRtl ? "مشاركة" : "Share"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="container-max">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-navy mb-8 text-center">
                {t("relatedPosts")}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((rp, i) => {
                  const rpTitle = isRtl ? rp.title : rp.titleEn
                  const rpExcerpt = isRtl ? rp.excerpt : rp.excerptEn
                  const rpCategory = isRtl ? rp.category : rp.categoryEn

                  return (
                    <Link
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className="group block bg-white rounded-2xl border border-border-light overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan/30"
                    >
                      <div
                        className={cn(
                          "h-32 gradient-brand flex items-center justify-center",
                          readerColors[i]
                        )}
                      >
                        <span className="font-heading text-4xl font-bold text-white/20">
                          {rpTitle.charAt(0)}
                        </span>
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-medium text-blue bg-blue/5 px-2 py-1 rounded-full mb-2 inline-block">
                          {rpCategory}
                        </span>
                        <h3 className="font-heading text-base font-bold text-navy mb-1 group-hover:text-blue transition-colors line-clamp-2">
                          {rpTitle}
                        </h3>
                        <p className="text-sm text-text-body leading-relaxed line-clamp-2">
                          {rpExcerpt}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .prose h2 { font-family: var(--font-heading); color: #071426; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem; }
        .prose h3 { font-family: var(--font-heading); color: #071426; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose p { color: #404B5A; line-height: 1.8; margin-bottom: 1.25rem; }
        .prose strong { color: #071426; }
        .prose ul, .prose ol { color: #404B5A; margin-bottom: 1.25rem; padding-${isRtl ? "right" : "left"}: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; line-height: 1.7; }
        .prose br { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  )
}
