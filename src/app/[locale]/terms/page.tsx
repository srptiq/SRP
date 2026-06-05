import type { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === "ar" ? "شروط الخدمة" : "Terms of Service",
    description:
      locale === "ar"
        ? "الشروط العامة لاستخدام موقع SRPTIQ والتواصل عبر خدماته."
        : "The general terms for using the SRPTIQ website and interacting with its services.",
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const isRtl = locale === "ar"

  const sections = isRtl
    ? [
        {
          title: "استخدام الموقع",
          body:
            "يُسمح باستخدام الموقع للاطلاع على خدمات SRPTIQ وطلب التواصل أو المشاريع بشكل مشروع ومسؤول ودون إساءة استخدام للمحتوى أو النماذج.",
        },
        {
          title: "دقة المعلومات",
          body:
            "نسعى إلى أن تكون المعلومات المعروضة دقيقة ومحدثة، لكن قد تتغير بعض التفاصيل أو الخدمات أو الأسعار وفقًا لطبيعة العمل والتطوير المستمر.",
        },
        {
          title: "الملكية الفكرية",
          body:
            "جميع المحتويات الظاهرة في الموقع، بما في ذلك النصوص والهوية البصرية والتصاميم، تعود إلى SRPTIQ أو الجهات المالكة لها، ولا يجوز إعادة استخدامها دون إذن.",
        },
        {
          title: "الطلبات والتواصل",
          body:
            "إرسال نموذج أو طلب مشروع لا يعني إبرام عقد نهائي، وإنما بدء تواصل أولي لمراجعة المتطلبات والاتفاق على نطاق العمل لاحقًا.",
        },
        {
          title: "التحديثات",
          body:
            "قد نقوم بتحديث هذه الشروط عند الحاجة. ويعد استمرار استخدام الموقع بعد التحديث موافقة ضمنية على النسخة الأحدث منها.",
        },
      ]
    : [
        {
          title: "Website Use",
          body:
            "The website may be used to explore SRPTIQ services and submit contact or project requests in a lawful, responsible manner without misuse of content or forms.",
        },
        {
          title: "Information Accuracy",
          body:
            "We aim to keep the information on the site accurate and up to date, but some service details, scope, or pricing may change over time.",
        },
        {
          title: "Intellectual Property",
          body:
            "All content displayed on the website, including text, branding, and designs, belongs to SRPTIQ or its respective owners and may not be reused without permission.",
        },
        {
          title: "Requests and Communication",
          body:
            "Submitting a form or project request does not create a final contract. It starts an initial conversation to review requirements and agree on scope later.",
        },
        {
          title: "Updates",
          body:
            "We may update these terms when needed. Continuing to use the website after updates means you accept the latest version.",
        },
      ]

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {isRtl ? "شروط الخدمة" : "Terms of Service"}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-text">
              {isRtl
                ? "هذه الشروط توضح الإطار العام لاستخدام الموقع والتعامل مع النماذج والخدمات المعروضة."
                : "These terms outline the general framework for using the website and interacting with the services shown on it."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="mx-auto max-w-4xl space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-navy">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-gray-text">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
