import PrivacyPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../[locale]/privacy/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultPrivacyPage() {
  return <PrivacyPage params={Promise.resolve({ locale: "ar" })} />
}
