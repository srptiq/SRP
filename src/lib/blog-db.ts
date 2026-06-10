import { prisma } from '@/lib/prisma'
import type { BlogPost } from '@/lib/blog-data'

type DbPost = {
  id: string
  slug: string
  title: string
  titleEn: string
  excerpt: string | null
  excerptEn: string | null
  content: string
  contentEn: string | null
  author: string | null
  image: string | null
  createdAt: Date
  category?: { name: string; nameEn: string } | null
}

function mapPost(p: DbPost): BlogPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    titleEn: p.titleEn,
    excerpt: p.excerpt ?? '',
    excerptEn: p.excerptEn ?? '',
    content: p.content,
    contentEn: p.contentEn ?? '',
    category: p.category?.name ?? 'عام',
    categoryEn: p.category?.nameEn ?? 'General',
    author: p.author ?? 'SRPTIQ',
    authorEn: p.author ?? 'SRPTIQ',
    date: (p.createdAt instanceof Date ? p.createdAt : new Date(p.createdAt)).toISOString(),
    image: p.image ?? '',
  }
}

// Published posts from the database, falling back to the built-in content when
// the database is empty or unavailable.
export async function getPublicBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    return (posts as DbPost[]).map(mapPost)
  } catch {
    return []
  }
}

export async function getPublicBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (post && post.published) return mapPost(post as DbPost)
  } catch {
    // ignore — treated as not found below
  }
  return undefined
}
