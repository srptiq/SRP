import { redirect } from "next/navigation"

export default async function CatchAllPage({ params }: { params: Promise<{ rest: string[] }> }) {
  const { rest } = await params
  redirect(`/ar/${rest.join("/")}`)
}
