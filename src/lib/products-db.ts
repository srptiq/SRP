import { prisma } from '@/lib/prisma'
import type { ProductData } from '@/lib/products-data'

type DbProduct = {
  id: string; name: string; nameEn: string; slug: string
  description: string; descriptionEn: string
  logo: string | null; images: string[]; features: string[]; featuresEn: string[]
  problem: string | null; problemEn: string | null
  targetAudience: string | null; targetAudienceEn: string | null
  howItWorks: string | null; howItWorksEn: string | null
  status: string; category: string | null; published: boolean
}

function mapProduct(p: DbProduct): ProductData {
  return {
    id: p.id,
    name: p.name,
    nameEn: p.nameEn,
    slug: p.slug,
    description: p.description,
    descriptionEn: p.descriptionEn,
    logo: p.logo ?? '',
    images: p.images ?? [],
    features: p.features ?? [],
    featuresEn: p.featuresEn ?? [],
    problem: p.problem ?? '',
    problemEn: p.problemEn ?? '',
    targetAudience: p.targetAudience ?? '',
    targetAudienceEn: p.targetAudienceEn ?? '',
    howItWorks: p.howItWorks ?? '',
    howItWorksEn: p.howItWorksEn ?? '',
    status: p.status ?? 'active',
    category: p.category ?? '',
  }
}

export async function getPublicProducts(): Promise<ProductData[]> {
  try {
    const items = await prisma.product.findMany({ where: { published: true }, orderBy: { createdAt: 'asc' } })
    return (items as DbProduct[]).map(mapProduct)
  } catch {
    return []
  }
}

export async function getPublicProductBySlug(slug: string): Promise<ProductData | undefined> {
  try {
    const p = await prisma.product.findUnique({ where: { slug } })
    if (p && p.published) return mapProduct(p as DbProduct)
  } catch {
    // ignore — treated as not found
  }
  return undefined
}
