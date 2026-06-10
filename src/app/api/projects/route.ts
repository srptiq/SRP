import { getPublicProjects } from '@/lib/projects-db'

// Public, read-only endpoint used by the projects listing page.
export async function GET() {
  const data = await getPublicProjects()
  return Response.json({ success: true, data })
}
