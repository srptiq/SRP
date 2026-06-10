import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  title: z.string().min(1), titleEn: z.string().min(1),
  slug: z.string().min(1), content: z.string().min(1),
  contentEn: z.string().nullable().optional().default(null),
  excerpt: z.string().nullable().optional().default(null),
  excerptEn: z.string().nullable().optional().default(null),
  image: z.string().nullable().optional().default(null),
  categoryId: z.string().nullable().optional().default(null),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().nullable().optional().default(null),
  published: z.boolean().optional().default(false),
  metaTitle: z.string().nullable().optional().default(null),
  metaDesc: z.string().nullable().optional().default(null),
})

async function checkAuth(request: NextRequest) {
  const tokenUser = getTokenUser(request)
  if (!tokenUser) return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  if (tokenUser.role !== 'admin') return Response.json({ success: false, error: 'Forbidden' }, { status: 403 })
  return null
}

export async function GET(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    try {
      const data = await prisma.blogPost.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getBlogPosts()
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = (await request.json()) as Record<string, unknown>
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    try {
      const data = await prisma.blogPost.create({ data: parsed.data })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.createBlogPost(parsed.data as Parameters<typeof memoryStore.createBlogPost>[0])
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = (await request.json()) as { id?: string } & Record<string, unknown>
    const { id, ...data } = body
    if (!id) return Response.json({ success: false, error: 'id is required' }, { status: 400 })
    try {
      const result = await prisma.blogPost.update({ where: { id }, data })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateBlogPost(id, data)
      if (!result) return Response.json({ success: false, error: 'Blog post not found' }, { status: 404 })
      return Response.json({ success: true, data: result })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return Response.json({ success: false, error: 'id query param is required' }, { status: 400 })
    try {
      await prisma.blogPost.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteBlogPost(id)
      if (!result) return Response.json({ success: false, error: 'Blog post not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
