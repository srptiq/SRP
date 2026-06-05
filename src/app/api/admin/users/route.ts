import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getTokenUser, hashPassword } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const createSchema = z.object({
  name: z.string().min(1), email: z.string().email(),
  password: z.string().min(6), roleId: z.string().optional(),
  image: z.string().optional(), active: z.boolean().optional().default(true),
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
      const data = await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: 'desc' } })
      const sanitized = data.map(({ password, ...u }: { password: string; [key: string]: unknown }) => u)
      return Response.json({ success: true, data: sanitized })
    } catch {
      const data = await memoryStore.getUsers()
      const sanitized = data.map(({ password, ...u }: { password: string; [key: string]: unknown }) => u)
      return Response.json({ success: true, data: sanitized })
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

    const { password, ...rest } = parsed.data
    const hashedPassword = await hashPassword(password)

    try {
      const existing = await prisma.user.findUnique({ where: { email: rest.email } })
      if (existing) return Response.json({ success: false, error: 'Email already exists' }, { status: 409 })

      const data = await prisma.user.create({
        data: { ...rest, password: hashedPassword } as any,
        include: { role: true },
      })
      const { password: _, ...userData } = data
      return Response.json({ success: true, data: userData })
    } catch {
      const existing = await memoryStore.findUserByEmail(rest.email)
      if (existing) return Response.json({ success: false, error: 'Email already exists' }, { status: 409 })

      const data = await memoryStore.createUser({ ...rest, password: hashedPassword })
      const { password: _, ...userData } = data
      return Response.json({ success: true, data: userData })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = (await request.json()) as { id?: string; password?: string } & Record<string, unknown>
    const { id, password, ...data } = body
    if (!id) return Response.json({ success: false, error: 'id is required' }, { status: 400 })

    const updateData: any = { ...data }
    if (password) {
      updateData.password = await hashPassword(password)
    }

    try {
      const result = await prisma.user.update({ where: { id }, data: updateData, include: { role: true } })
      const { password: _, ...userData } = result
      return Response.json({ success: true, data: userData })
    } catch {
      const result = await memoryStore.updateUser(id, updateData)
      if (!result) return Response.json({ success: false, error: 'User not found' }, { status: 404 })
      const { password: _, ...userData } = result
      return Response.json({ success: true, data: userData })
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
      await prisma.user.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteUser(id)
      if (!result) return Response.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
