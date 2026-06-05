import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
export const AUTH_COOKIE_NAME = 'token'
export const LEGACY_AUTH_COOKIE_NAME = 'srptiq_admin_token'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string }
  } catch {
    return null
  }
}

export function getTokenUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  let token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    token =
      request.cookies.get(AUTH_COOKIE_NAME)?.value ??
      request.cookies.get(LEGACY_AUTH_COOKIE_NAME)?.value ??
      null
  }
  if (!token) return null
  return verifyToken(token)
}
