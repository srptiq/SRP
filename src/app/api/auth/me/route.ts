import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

export async function GET(request: NextRequest) {
  try {
    const tokenUser = getTokenUser(request)
    if (!tokenUser) return Response.json({ success: false, error: 'Not authenticated' }, { status: 401 })

    let user: any
    try {
      user = await prisma.user.findUnique({ where: { id: tokenUser.id }, include: { role: true } })
      if (!user) return Response.json({ success: false, error: 'User not found' }, { status: 404 })
    } catch {
      user = await memoryStore.findUserById(tokenUser.id)
      if (!user) return Response.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const { password: _, ...userData } = user
    return Response.json({ success: true, data: userData })
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
