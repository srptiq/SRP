import BlogDetailPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../../[locale]/blog/[slug]/page"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar", slug }),
  })
}

export default async function DefaultBlogDetailPage({ params }: Props) {
  const { slug } = await params

  return <BlogDetailPage params={Promise.resolve({ locale: "ar", slug })} />
}
