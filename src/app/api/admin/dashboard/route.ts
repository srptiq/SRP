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
    let totalProducts: number, totalServices: number, totalProjects: number
    let totalBlogPosts: number, totalUsers: number, totalFAQ: number
    let totalMessages: number, totalRequests: number
    let recentMessages: any[], recentRequests: any[]

    try {
      const [pCount, sCount, prCount, bCount, uCount, fCount, mCount, rCount, messages, requests] = await Promise.all([
        prisma.product.count(),
        prisma.service.count(),
        prisma.project.count(),
        prisma.blogPost.count(),
        prisma.user.count(),
        prisma.fAQ.count(),
        prisma.contactMessage.count(),
        prisma.projectRequest.count(),
        prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        prisma.projectRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      ])
      totalProducts = pCount; totalServices = sCount; totalProjects = prCount
      totalBlogPosts = bCount; totalUsers = uCount; totalFAQ = fCount
      totalMessages = mCount; totalRequests = rCount
      recentMessages = messages; recentRequests = requests
    } catch {
      totalProducts = memoryStore.products.length
      totalServices = memoryStore.services.length
      totalProjects = memoryStore.projects.length
      totalBlogPosts = memoryStore.blogPosts.length
      totalUsers = memoryStore.users.length
      totalFAQ = memoryStore.faqs.length
      totalMessages = memoryStore.contactMessages.length
      totalRequests = memoryStore.projectRequests.length
      recentMessages = memoryStore.contactMessages
        .slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
      recentRequests = memoryStore.projectRequests
        .slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
    }

    return Response.json({
      success: true,
      data: {
        totalProducts, totalServices, totalProjects, totalBlogPosts,
        totalMessages, totalRequests, totalUsers, totalFAQ,
        recentMessages, recentRequests,
      },
    })
  } catch { return Response.json({ success: false, error: 'Internal server error' }, { status: 500 }) }
}
