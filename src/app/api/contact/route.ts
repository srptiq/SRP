import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { memoryStore } from '@/lib/memory-store'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  product: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const data = parsed.data
    try {
      await prisma.contactMessage.create({ data })
    } catch {
      await memoryStore.createContactMessage(data as Parameters<typeof memoryStore.createContactMessage>[0])
    }

    return Response.json({ success: true, data: { message: 'Message sent successfully' } })
  } catch {
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
