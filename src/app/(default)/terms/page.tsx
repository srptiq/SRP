import TermsPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../[locale]/terms/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultTermsPage() {
  return <TermsPage params={Promise.resolve({ locale: "ar" })} />
}
