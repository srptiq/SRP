import ServicesPage, {
  generateMetadata as generateLocaleMetadata,
} from "../../[locale]/services/page"

export async function generateMetadata() {
  return generateLocaleMetadata({
    params: Promise.resolve({ locale: "ar" }),
  })
}

export default function DefaultServicesPage() {
  return <ServicesPage params={Promise.resolve({ locale: "ar" })} />
}
