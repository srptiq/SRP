import ProductDetailPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../../[locale]/products/[slug]/page"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar", slug }),
  })
}

export default async function DefaultProductDetailPage({ params }: Props) {
  const { slug } = await params

  return <ProductDetailPage params={Promise.resolve({ locale: "ar", slug })} />
}
