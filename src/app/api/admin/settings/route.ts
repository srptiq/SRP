import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const updateSchema = z.array(z.object({ key: z.string().min(1), value: z.string() }))

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
      const data = await prisma.siteSetting.findMany()
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getSiteSettings()
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const settings = body.settings ?? body
    const parsed = updateSchema.safeParse(settings)
    if (!parsed.success) return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })

    const results: Record<string, string> = {}
    for (const { key, value } of parsed.data) {
      try {
        await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
      } catch {
        await memoryStore.upsertSiteSetting(key, value)
      }
      results[key] = value
    }

    return Response.json({ success: true, data: results })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
