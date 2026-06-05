import CareersPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../[locale]/careers/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultCareersPage() {
  return <CareersPage params={Promise.resolve({ locale: "ar" })} />
}
