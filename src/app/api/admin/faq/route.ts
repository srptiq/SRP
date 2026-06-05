import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  question: z.string().min(1), questionEn: z.string().min(1),
  answer: z.string().min(1), answerEn: z.string().min(1),
  category: z.string().optional(), order: z.number().optional().default(0),
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
      const data = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getFAQs()
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
      const data = await prisma.fAQ.create({ data: parsed.data })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.createFAQ(parsed.data as any)
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
      const result = await prisma.fAQ.update({ where: { id }, data })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateFAQ(id, data as any)
      if (!result) return Response.json({ success: false, error: 'FAQ not found' }, { status: 404 })
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
      await prisma.fAQ.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteFAQ(id)
      if (!result) return Response.json({ success: false, error: 'FAQ not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
