import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"
import { products } from "@/lib/products-data"
import { projects } from "@/lib/projects-data"

const locales = ["ar", "en"]
const baseUrl = "https://srptiq.com"

const staticPages = [
  "", "about", "services", "products", "projects", "blog", "faq", "contact", "request-project", "privacy", "terms", "careers",
]

function localizedPath(locale: string, page: string) {
  return page ? `/${locale}/${page}` : `/${locale}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}${localizedPath(locale, page)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}${localizedPath(l, page)}`])
          ),
        },
      })
    }

    for (const product of products) {
      entries.push({
        url: `${baseUrl}${localizedPath(locale, `products/${product.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }

    for (const project of projects) {
      entries.push({
        url: `${baseUrl}${localizedPath(locale, `projects/${project.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }

    for (const post of blogPosts) {
      entries.push({
        url: `${baseUrl}${localizedPath(locale, `blog/${post.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return entries
}
