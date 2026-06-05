import ProjectDetailPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../../[locale]/projects/[slug]/page"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar", slug }),
  })
}

export default async function DefaultProjectDetailPage({ params }: Props) {
  const { slug } = await params

  return <ProjectDetailPage params={Promise.resolve({ locale: "ar", slug })} />
}
