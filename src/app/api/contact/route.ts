import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { products } from '@/lib/products-data'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Invalid email').max(254),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  product: z.string().max(80).optional(),
}).refine(
  ({ subject, product }) => (
    (subject !== 'support' && subject !== 'integration') ||
    products.some(({ slug }) => slug === product)
  ),
  { path: ['product'], message: 'Select a product for this request' },
)

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    await prisma.contactMessage.create({ data: parsed.data })

    return Response.json({ success: true, data: { message: 'Message sent successfully' } })
  } catch {
    return Response.json({ success: false, error: 'Message could not be saved' }, { status: 503 })
  }
}
