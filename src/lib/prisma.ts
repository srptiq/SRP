import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { getCloudflareContext } from '@opennextjs/cloudflare'

type HyperdriveBinding = {
  connectionString: string
}

type PrismaCache = {
  clients: Map<string, PrismaClient>
}

const globalForPrisma = globalThis as unknown as {
  __srptiqPrismaCache?: PrismaCache
}

function getPrismaCache() {
  if (!globalForPrisma.__srptiqPrismaCache) {
    globalForPrisma.__srptiqPrismaCache = {
      clients: new Map<string, PrismaClient>(),
    }
  }

  return globalForPrisma.__srptiqPrismaCache
}

function getCloudflareHyperdriveConnectionString() {
  try {
    const context = getCloudflareContext()
    const hyperdrive = (context.env as { HYPERDRIVE?: HyperdriveBinding }).HYPERDRIVE

    return hyperdrive?.connectionString ?? null
  } catch {
    return null
  }
}

function getConnectionString() {
  const hyperdriveConnectionString = getCloudflareHyperdriveConnectionString()

  if (hyperdriveConnectionString) {
    return hyperdriveConnectionString
  }

  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  throw new Error('No database connection string found. Set DATABASE_URL locally or attach the HYPERDRIVE binding in Cloudflare.')
}

export function getPrismaClient() {
  const connectionString = getConnectionString()
  const cache = getPrismaCache()
  const cachedClient = cache.clients.get(connectionString)

  if (cachedClient) {
    return cachedClient
  }

  const adapter = new PrismaPg({ connectionString })
  const prismaClient = new PrismaClient({ adapter })

  cache.clients.set(connectionString, prismaClient)

  return prismaClient
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const prismaClient = getPrismaClient()
    const value = Reflect.get(prismaClient, property, receiver)

    return typeof value === 'function' ? value.bind(prismaClient) : value
  },
})
