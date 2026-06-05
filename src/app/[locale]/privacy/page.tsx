import type { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    description:
      locale === "ar"
        ? "كيف تتعامل SRPTIQ مع البيانات والمعلومات التي يشاركها الزوار والعملاء."
        : "How SRPTIQ handles the data and information shared by visitors and clients.",
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const isRtl = locale === "ar"

  const sections = isRtl
    ? [
        {
          title: "البيانات التي نجمعها",
          body:
            "قد نجمع بيانات التواصل الأساسية مثل الاسم، البريد الإلكتروني، رقم الجوال، وبيانات المشروع عند تعبئة النماذج أو طلب التواصل معنا.",
        },
        {
          title: "كيفية استخدام البيانات",
          body:
            "نستخدم هذه البيانات للرد على الاستفسارات، متابعة طلبات المشاريع، تحسين تجربة الموقع، وتقديم خدماتنا بشكل أدق وأكثر كفاءة.",
        },
        {
          title: "مشاركة البيانات",
          body:
            "لا نبيع بياناتك الشخصية لأي طرف ثالث. قد تتم مشاركة المعلومات فقط عند الحاجة التشغيلية أو القانونية وبالحد الأدنى اللازم.",
        },
        {
          title: "حماية المعلومات",
          body:
            "نعتمد إجراءات تنظيمية وتقنية مناسبة لحماية البيانات من الوصول غير المصرح به أو التعديل أو الفقدان.",
        },
        {
          title: "حقوقك",
          body:
            "يمكنك طلب تحديث بياناتك أو حذفها أو الاستفسار عن استخدامها عبر التواصل معنا من خلال صفحة الاتصال.",
        },
      ]
    : [
        {
          title: "Data We Collect",
          body:
            "We may collect basic contact details such as name, email address, phone number, and project information when you submit forms or contact us.",
        },
        {
          title: "How We Use Data",
          body:
            "We use this information to respond to inquiries, follow up on project requests, improve the website experience, and deliver our services more effectively.",
        },
        {
          title: "Data Sharing",
          body:
            "We do not sell personal data to third parties. Information may only be shared when required for operational or legal reasons and only to the minimum extent necessary.",
        },
        {
          title: "Information Security",
          body:
            "We apply appropriate organizational and technical measures to protect information from unauthorized access, modification, or loss.",
        },
        {
          title: "Your Rights",
          body:
            "You may request to update or delete your information, or ask about how it is used, by contacting us through the contact page.",
        },
      ]

  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="mesh-grid absolute inset-0" />
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-text">
              {isRtl
                ? "نوضح هنا بشكل مختصر كيف نتعامل مع البيانات التي يشاركها زوار الموقع وعملاؤنا."
                : "This page briefly explains how we handle the information shared by website visitors and clients."}
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
