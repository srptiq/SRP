import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  name: z.string().min(1), nameEn: z.string().min(1),
  description: z.string().min(1), descriptionEn: z.string().min(1),
  slug: z.string().min(1), logo: z.string().optional(),
  images: z.array(z.string()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  featuresEn: z.array(z.string()).optional().default([]),
  problem: z.string().optional(), problemEn: z.string().optional(),
  targetAudience: z.string().optional(), targetAudienceEn: z.string().optional(),
  howItWorks: z.string().optional(), howItWorksEn: z.string().optional(),
  category: z.string().optional(), status: z.string().optional().default('active'),
  published: z.boolean().optional().default(true),
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
      const data = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getProducts()
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
      const data = await prisma.product.create({ data: parsed.data })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.createProduct(parsed.data as Parameters<typeof memoryStore.createProduct>[0])
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
      const result = await prisma.product.update({ where: { id }, data })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateProduct(id, data as Parameters<typeof memoryStore.updateProduct>[1])
      if (!result) return Response.json({ success: false, error: 'Product not found' }, { status: 404 })
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
      await prisma.product.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteProduct(id)
      if (!result) return Response.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
