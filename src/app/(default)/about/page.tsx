import AboutPage, { generateMetadata as generateLocaleMetadata } from "../../[locale]/about/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultAboutPage() {
  return <AboutPage params={Promise.resolve({ locale: "ar" })} />
}
