import { prisma } from '@/lib/prisma'
import type { ProjectData } from '@/lib/projects-data'

type DbProject = {
  id: string; name: string; nameEn: string; slug: string | null
  client: string; clientEn: string; category: string; categoryEn: string | null
  description: string; descriptionEn: string; details: string | null; detailsEn: string | null
  images: string[]; technologies: string[]; status: string; statusEn: string | null; published: boolean
}

function mapProject(p: DbProject): ProjectData {
  return {
    id: p.id,
    name: p.name,
    nameEn: p.nameEn,
    slug: p.slug ?? p.id,
    client: p.client,
    clientEn: p.clientEn,
    category: p.category,
    categoryEn: p.categoryEn ?? p.category,
    description: p.description,
    descriptionEn: p.descriptionEn,
    details: p.details ?? '',
    detailsEn: p.detailsEn ?? '',
    technologies: p.technologies ?? [],
    status: p.status,
    statusEn: p.statusEn ?? p.status,
    image: p.images?.[0] ?? '',
  }
}

export async function getPublicProjects(): Promise<ProjectData[]> {
  try {
    const items = await prisma.project.findMany({ where: { published: true }, orderBy: { createdAt: 'asc' } })
    return (items as DbProject[]).map(mapProject)
  } catch {
    return []
  }
}

export async function getPublicProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  try {
    const p = await prisma.project.findUnique({ where: { slug } })
    if (p && p.published) return mapProject(p as DbProject)
  } catch {
    // ignore — treated as not found
  }
  return undefined
}
