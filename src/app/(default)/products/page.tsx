import ProductsPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../[locale]/products/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultProductsPage() {
  return <ProductsPage params={Promise.resolve({ locale: "ar" })} />
}
