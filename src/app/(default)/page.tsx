import HomePage, { generateMetadata as generateLocaleMetadata } from "../[locale]/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultHomePage() {
  return <HomePage params={Promise.resolve({ locale: "ar" })} />
}
