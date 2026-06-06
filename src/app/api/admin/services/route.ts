import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  title: z.string().min(1), titleEn: z.string().min(1),
  description: z.string().min(1), descriptionEn: z.string().min(1),
  icon: z.string().optional(), image: z.string().optional(),
  slug: z.string().min(1), published: z.boolean().optional().default(true),
  features: z.array(z.string()).optional().default([]),
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
      const data = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getServices()
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
      const data = await prisma.service.create({ data: parsed.data })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.createService(parsed.data as Parameters<typeof memoryStore.createService>[0])
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
      const result = await prisma.service.update({ where: { id }, data })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateService(id, data as Parameters<typeof memoryStore.updateService>[1])
      if (!result) return Response.json({ success: false, error: 'Service not found' }, { status: 404 })
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
      await prisma.service.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteService(id)
      if (!result) return Response.json({ success: false, error: 'Service not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
