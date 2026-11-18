export interface ProductData {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string
  descriptionEn: string
  logo: string
  images: string[]
  features: string[]
  featuresEn: string[]
  problem: string
  problemEn: string
  targetAudience: string
  targetAudienceEn: string
  howItWorks: string
  howItWorksEn: string
  status: string
  category: string
}

export const products: ProductData[] = [
  {
    "id": "madar-x",
    "slug": "madar-x",
    "name": "مدار إكس",
    "nameEn": "Madar X",
    "description": "تصميم وتنفيذ الواجهات واللوحات الإعلانية والحروف البارزة للمنشآت التجارية والمشاريع.",
    "descriptionEn": "Design and installation of commercial façades, signage, and dimensional lettering.",
    "logo": "/logos/madar-x.png",
    "images": [],
    "features": [
      "كسوة الواجهات",
      "اللوحات الإعلانية والحروف البارزة",
      "حلول إضاءة الواجهات واللوحات"
    ],
    "featuresEn": [
      "Façade cladding",
      "Signage and dimensional lettering",
      "Façade and sign lighting"
    ],
    "problem": "تحتاج المنشآت إلى تنفيذ واجهات ولوحات تتوافق مع هوية المشروع وظروف الموقع.",
    "problemEn": "Businesses need façades and signage that fit their brand and site conditions.",
    "targetAudience": "المتاجر والمطاعم والمقاهي والمشاريع التجارية.",
    "targetAudienceEn": "Retailers, restaurants, cafés, and commercial projects.",
    "howItWorks": "مراجعة الموقع والمتطلبات\nإعداد التصميم وعرض التنفيذ\nالتصنيع والتركيب بعد الاعتماد",
    "howItWorksEn": "Review the site and requirements\nPrepare the design and proposal\nManufacture and install after approval",
    "status": "نشط",
    "category": "الواجهات واللوحات"
  },
  {
    "id": "ous",
    "slug": "ous",
    "name": "أوس",
    "nameEn": "OUS",
    "description": "موقع إلكتروني لمكتب المحاماة ونظام متكامل لإدارته، بنسخة خاصة لكل مكتب.",
    "descriptionEn": "A law firm website and a complete practice management system, delivered as a dedicated instance for each firm.",
    "logo": "",
    "images": [],
    "features": [
      "موقع إلكتروني بهوية المكتب لخدماته واستقبال الاستفسارات",
      "إدارة القضايا والجلسات والعقود والملفات",
      "تنظيم المهام والمواعيد وصلاحيات الفريق",
      "أقسام وسير عمل قابلة للتخصيص"
    ],
    "featuresEn": [
      "A branded website for firm services and enquiries",
      "Case, hearing, contract, and file management",
      "Tasks, appointments, and team permissions",
      "Customisable sections and workflows"
    ],
    "problem": "يساعد أوس المكتب على إدارة حضوره الإلكتروني وأعماله القانونية اليومية ضمن منتج واحد.",
    "problemEn": "OUS brings the firm’s public website and daily legal operations into one product.",
    "targetAudience": "مكاتب وشركات المحاماة.",
    "targetAudienceEn": "Law offices and law firms.",
    "howItWorks": "تحديد هوية المكتب واحتياجاته\nتهيئة الموقع ونظام الإدارة بنسخة خاصة بالمكتب\nضبط الأقسام والصلاحيات وفق طريقة عمل الفريق",
    "howItWorksEn": "Identify the firm’s brand and requirements\nSet up its website and dedicated management system\nConfigure sections and permissions around the team’s workflow",
    "status": "نشط",
    "category": "إدارة مكاتب المحاماة"
  }
]
