import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { memoryStore } from '@/lib/memory-store'

const schema = z.object({
  company: z.string().min(1, 'Company is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  attachments: z.array(z.string()).optional().default([]),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const data = parsed.data
    try {
      await prisma.projectRequest.create({ data })
    } catch {
      await memoryStore.createProjectRequest(data as any)
    }

    return Response.json({ success: true, data: { message: 'Project request submitted successfully' } })
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
