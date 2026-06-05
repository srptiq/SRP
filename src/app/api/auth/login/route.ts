import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken, AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const { email, password } = parsed.data

    let user: any
    try {
      const found = await prisma.user.findUnique({ where: { email }, include: { role: true } })
      if (!found) return Response.json({ success: false, error: 'Invalid email or password' }, { status: 401 })

      const valid = await verifyPassword(password, found.password)
      if (!valid) return Response.json({ success: false, error: 'Invalid email or password' }, { status: 401 })

      user = found
    } catch {
      const found = await memoryStore.findUserByEmail(email)
      if (!found) return Response.json({ success: false, error: 'Invalid email or password' }, { status: 401 })

      const valid = await verifyPassword(password, found.password)
      if (!valid) return Response.json({ success: false, error: 'Invalid email or password' }, { status: 401 })

      user = found
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role?.name || 'user' })

    const { password: _, ...userData } = user
    const response = NextResponse.json({ success: true, data: { token, user: userData } })
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    response.cookies.set(LEGACY_AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    return response
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
