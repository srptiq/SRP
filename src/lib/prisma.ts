// Use the edge client entry: it loads the query-compiler wasm via a static
// `import('*.wasm')` (workerd-compatible) instead of runtime base64 compilation,
// which Cloudflare Workers disallow ("Wasm code generation disallowed by embedder").
import { PrismaClient } from '@prisma/client/edge'
import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { getCloudflareContext } from '@opennextjs/cloudflare'

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

function getCloudflareEnvValue(key: string) {
  try {
    const context = getCloudflareContext()
    const value = (context.env as unknown as Record<string, unknown>)[key]

    return typeof value === 'string' && value.length > 0 ? value : null
  } catch {
    return null
  }
}

function getConnectionString() {
  // The Neon HTTP adapter connects directly to Neon over HTTPS (fetch),
  // which works natively on Cloudflare Workers. It must receive the direct
  // Neon connection string — NOT a Hyperdrive proxy string (different transport).
  const cloudflareDatabaseUrl = getCloudflareEnvValue('DATABASE_URL')

  if (cloudflareDatabaseUrl) {
    return cloudflareDatabaseUrl
  }

  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  throw new Error('No database connection string found. Set the DATABASE_URL secret in Cloudflare or DATABASE_URL locally.')
}

export function getPrismaClient() {
  const connectionString = getConnectionString()
  const cache = getPrismaCache()
  const cachedClient = cache.clients.get(connectionString)

  if (cachedClient) {
    return cachedClient
  }

  const adapter = new PrismaNeonHttp(connectionString, {} as never)
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
