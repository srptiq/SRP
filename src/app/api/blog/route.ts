import { prisma } from '@/lib/prisma'

// Public, read-only endpoint: published blog posts mapped to the shape the
// public blog pages expect. Returns an empty list on failure so the pages can
// fall back to their built-in content.
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })

    const data = posts.map((p) => ({
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
    }))

    return Response.json({ success: true, data })
  } catch {
    return Response.json({ success: true, data: [] })
  }
}
