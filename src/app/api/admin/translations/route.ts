import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  key: z.string().min(1), locale: z.string().min(1), value: z.string().min(1),
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
      const data = await prisma.translation.findMany()
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getTranslations()
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

    const { key, locale, value } = parsed.data
    try {
      const data = await prisma.translation.upsert({
        where: { key_locale: { key, locale } },
        update: { value },
        create: { key, locale, value },
      })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.upsertTranslation(key, locale, value)
      return Response.json({ success: true, data })
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
      await prisma.translation.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteTranslation(id)
      if (!result) return Response.json({ success: false, error: 'Translation not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
