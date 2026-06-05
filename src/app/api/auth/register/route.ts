import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    let user: any
    try {
      const existing = await prisma.user.findUnique({ where: { email } })
      if (existing) return Response.json({ success: false, error: 'Email already registered' }, { status: 409 })

      const hashedPassword = await hashPassword(password)
      const userRole = await prisma.role.findUnique({ where: { name: 'user' } })
      const roleId = userRole?.id || (await prisma.role.create({ data: { name: 'user', label: 'User', permissions: ['read'] } })).id

      user = await prisma.user.create({
        data: { name, email, password: hashedPassword, roleId },
        include: { role: true },
      })
    } catch {
      const existingMem = await memoryStore.findUserByEmail(email)
      if (existingMem) return Response.json({ success: false, error: 'Email already registered' }, { status: 409 })

      user = await memoryStore.createUser({ name, email, password: await hashPassword(password) })
    }

    const tokenUser = { id: user.id, email: user.email, role: user.role?.name || 'user' }
    const token = generateToken(tokenUser)

    const { password: _, ...userData } = user
    return Response.json({ success: true, data: { token, user: userData } })
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
