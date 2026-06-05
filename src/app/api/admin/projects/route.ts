import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  name: z.string().min(1), nameEn: z.string().min(1),
  client: z.string().min(1), clientEn: z.string().min(1),
  description: z.string().min(1), descriptionEn: z.string().min(1),
  category: z.string().min(1),
  images: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  status: z.string().optional().default('completed'),
  url: z.string().optional(), published: z.boolean().optional().default(true),
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
      const data = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getProjects()
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    try {
      const data = await prisma.project.create({ data: parsed.data })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.createProject(parsed.data as any)
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return Response.json({ success: false, error: 'id is required' }, { status: 400 })
    try {
      const result = await prisma.project.update({ where: { id }, data })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateProject(id, data as any)
      if (!result) return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
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
      await prisma.project.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteProject(id)
      if (!result) return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
