import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

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
      const data = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
      return Response.json({ success: true, data })
    } catch {
      const data = await memoryStore.getContactMessages()
      return Response.json({ success: true, data })
    }
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}

export async function PATCH(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError
  try {
    const body = (await request.json()) as { id?: string; read?: boolean } & Record<string, unknown>
    const { id, read } = body
    if (!id) return Response.json({ success: false, error: 'id is required' }, { status: 400 })
    try {
      const result = await prisma.contactMessage.update({ where: { id }, data: { read: read ?? true } })
      return Response.json({ success: true, data: result })
    } catch {
      const result = await memoryStore.updateContactMessage(id, { read: read ?? true })
      if (!result) return Response.json({ success: false, error: 'Message not found' }, { status: 404 })
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
      await prisma.contactMessage.delete({ where: { id } })
    } catch {
      const result = await memoryStore.deleteContactMessage(id)
      if (!result) return Response.json({ success: false, error: 'Message not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: { id } })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
