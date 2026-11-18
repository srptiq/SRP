import { prisma } from '@/lib/prisma'
import { products, type ProductData } from '@/lib/products-data'

export async function getPublicProducts(): Promise<ProductData[]> {
  try {
    const entries = await prisma.product.findMany({
      where: { published: true, slug: { in: products.map(({ slug }) => slug) } },
      select: { id: true, slug: true, logo: true },
    })

    return products.map((product) => {
      const entry = entries.find(({ slug }) => slug === product.slug)
      return entry ? { ...product, id: entry.id, logo: product.logo || entry.logo || '' } : product
    })
  } catch {
    return products
  }
}

export async function getPublicProductBySlug(slug: string): Promise<ProductData | undefined> {
  if (!products.some((product) => product.slug === slug)) return undefined
  return (await getPublicProducts()).find((product) => product.slug === slug)
}
