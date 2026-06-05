import FAQPage, { generateMetadata as generateLocaleMetadata } from "../../[locale]/faq/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultFaqPage() {
  return <FAQPage params={Promise.resolve({ locale: "ar" })} />
}
