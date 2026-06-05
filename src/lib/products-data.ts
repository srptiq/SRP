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
    id: "1",
    name: "إضبار",
    nameEn: "Idbbar",
    slug: "idbbar",
    description: "منصة قانونية ذكية لإدارة المكاتب والمحاماة والقضايا والجلسات. تنظم أعمال المحامين والمكاتب القانونية برقمنة شاملة للملفات والجلسات والمواعيد مع تقنيات الذكاء الاصطناعي.",
    descriptionEn: "An intelligent legal platform for managing law offices, cases, and court sessions. Organizes lawyers' and legal offices' work with comprehensive digitization of files, sessions, and appointments using AI technologies.",
    logo: "/logos/idbbar.png",
    images: ["/images/idbbar-1.png", "/images/idbbar-2.png", "/images/idbbar-3.png"],
    features: [
      "إدارة القضايا والجلسات بشكل رقمي متكامل",
      "جدولة ذكية للمواعيد والجلسات مع تذكيرات آلية",
      "أرشفة إلكترونية آمنة للمستندات والملفات القانونية",
      "تقارير وتحليلات لحظية لأداء المكتب",
      "تكامل مع وزارة العدل والأنظمة القانونية",
      "مساعد ذكي للبحث في السوابق القضائية",
      "فوترة إلكترونية وإدارة حسابات العملاء"
    ],
    featuresEn: [
      "Complete digital management of cases and court sessions",
      "Smart scheduling with automated reminders",
      "Secure electronic archiving of legal documents",
      "Real-time reports and analytics",
      "Integration with Ministry of Justice and legal systems",
      "AI assistant for legal precedent research",
      "Electronic invoicing and client account management"
    ],
    problem: "يعاني المحامون والمكاتب القانونية من صعوبة إدارة القضايا والمواعيد والجلسات يدوياً، مما يؤدي إلى تداخل المواعيد وفقدان المستندات وضعف متابعة العملاء. كما أن الاعتماد على الأرشفة الورقية يسبب بطئاً في الوصول للمعلومات وصعوبة في إعداد التقارير.",
    problemEn: "Lawyers and legal offices struggle with manual management of cases, appointments, and sessions, leading to scheduling conflicts, lost documents, and poor client follow-up. Paper-based archiving causes slow information retrieval and difficult reporting.",
    targetAudience: "المحامون والمستشارون القانونيون، مكاتب المحاماة، شركات الاستشارات القانونية، إدارات الشؤون القانونية في الشركات والمؤسسات.",
    targetAudienceEn: "Lawyers and legal consultants, law firms, legal consulting companies, legal affairs departments in corporations and institutions.",
    howItWorks: "1. تسجيل الدخول وإضافة بيانات المكتب\n2. إضافة القضايا والعملاء والمواعيد\n3. متابعة الجلسات والتحديثات بشكل لحظي\n4. إصدار التقارير والفواتير إلكترونياً",
    howItWorksEn: "1. Login and add office information\n2. Add cases, clients, and appointments\n3. Track sessions and updates in real-time\n4. Generate reports and invoices electronically",
    status: "نشط",
    category: "تقنية قانونية"
  },
  {
    id: "2",
    name: "نسختي",
    nameEn: "Nasakhti",
    slug: "nasakhti",
    description: "تطبيق ذكي يساعد المستخدم على بناء نسخة أفضل من نفسه من خلال خطط تطوير شخصية مدعومة بالذكاء الاصطناعي، متابعة عادات يومية، وإنجاز الأهداف بطريقة منظمة وفعالة.",
    descriptionEn: "A smart app that helps users build a better version of themselves through AI-powered personal development plans, daily habit tracking, and goal achievement in an organized and effective way.",
    logo: "/logos/nasakhti.png",
    images: ["/images/nasakhti-1.png", "/images/nasakhti-2.png", "/images/nasakhti-3.png"],
    features: [
      "خطط تطوير شخصية مخصصة بناءً على أهداف المستخدم",
      "متابعة العادات اليومية وتقارير الأداء الأسبوعية",
      "تمارين تأمل ووعي ذاتي مدعومة بالذكاء الاصطناعي",
      "مجتمع داعم وتحديات أسبوعية مع المستخدمين",
      "مكتبة موارد من كتب ومقالات وفيديوهات تطويرية",
      "تحليل تقدم المستخدم وتوصيات ذكية للتحسين",
      "مزامنة مع التطبيقات الصحية ومنصات اللياقة"
    ],
    featuresEn: [
      "Personalized development plans based on user goals",
      "Daily habit tracking and weekly performance reports",
      "AI-powered meditation and self-awareness exercises",
      "Supportive community and weekly challenges",
      "Resource library of books, articles, and videos",
      "Progress analysis and smart improvement recommendations",
      "Integration with health apps and fitness platforms"
    ],
    problem: "يعاني الكثيرون من صعوبة الالتزام بخطط التطوير الشخصي وعدم وجود نظام منظم يساعدهم على تتبع تقدمهم. كما أن الافتقار إلى التحفيز والتوجيه المناسب يؤدي إلى التخلي عن الأهداف بعد فترة قصيرة.",
    problemEn: "Many struggle with sticking to self-development plans and lack an organized system to track their progress. The absence of motivation and proper guidance leads to abandoning goals after a short period.",
    targetAudience: "الأفراد المهتمون بالتطوير الذاتي، الباحثون عن تحسين الإنتاجية الشخصية، الطلاب، الموظفون، رواد الأعمال، والمدربون الشخصيون.",
    targetAudienceEn: "Individuals interested in self-development, productivity seekers, students, employees, entrepreneurs, and personal coaches.",
    howItWorks: "1. إنشاء الملف الشخصي وتحديد الأهداف\n2. اختيار خطة التطوير المناسبة\n3. متابعة العادات اليومية والتقدم\n4. الحصول على تحليلات أسبوعية وتوصيات ذكية",
    howItWorksEn: "1. Create profile and set goals\n2. Choose the right development plan\n3. Track daily habits and progress\n4. Receive weekly analytics and smart recommendations",
    status: "نشط",
    category: "تطوير شخصي"
  },
  {
    id: "3",
    name: "بلنسيا",
    nameEn: "Blansia",
    slug: "blansia",
    description: "علامة فاخرة للورود والهدايا والتجارب الفريدة. تقدم باقات ورد راقية وتجارب مخصصة تناسب أذواق العملاء المميزين، مع خدمة توصيل استثنائية وتغليف فاخر.",
    descriptionEn: "A luxury brand for flowers, gifts, and unique experiences. Offers premium flower bouquets and personalized experiences that suit discerning clients, with exceptional delivery service and luxury packaging.",
    logo: "/logos/blansia.png",
    images: ["/images/blansia-1.png", "/images/blansia-2.png", "/images/blansia-3.png"],
    features: [
      "باقات ورد فاخرة من أجود الأنواع العالمية",
      "خدمة توصيل متميزة مع تغليف فاخر",
      "تجارب مخصصة حسب مناسبة العميل",
      "اشتراكات شهرية للورود الطازجة",
      "بطاقات تهنئة مخصصة مع كل باقة",
      "مجموعة حصرية من الهدايا والإكسسوارات",
      "معرض افتراضي ثلاثي الأبعاد لاختيار الباقات"
    ],
    featuresEn: [
      "Luxury flower bouquets from finest global varieties",
      "Premium delivery service with luxury packaging",
      "Customized experiences based on client occasion",
      "Monthly subscriptions for fresh flowers",
      "Personalized greeting cards with every bouquet",
      "Exclusive collection of gifts and accessories",
      "3D virtual showroom for bouquet selection"
    ],
    problem: "يواجه محبو الورود والهدايا الفاخرة صعوبة في العثور على خيارات راقية تتناسب مع المناسبات الخاصة. كما أن خدمات التوصيل التقليدية لا ترقى لمستوى التوقعات من حيث الجودة والتغليف والتوقيت.",
    problemEn: "Flower and luxury gift enthusiasts struggle to find premium options for special occasions. Traditional delivery services often fall short of expectations in quality, packaging, and timing.",
    targetAudience: "الأفراد الباحثون عن هدايا فاخرة، الشركات والمؤسسات، منسقو الحفلات والمناسبات، الفنادق والمنتجعات، ومحبو الورود.",
    targetAudienceEn: "Individuals seeking luxury gifts, corporations and institutions, event planners, hotels and resorts, and flower enthusiasts.",
    howItWorks: "1. تصفح المعرض الافتراضي واختيار الباقة\n2. تخصيص الباقة مع رسالة مرفقة\n3. اختيار موعد التوصيل المناسب\n4. استلام الهدية بتغليف فاخر وتوصيل استثنائي",
    howItWorksEn: "1. Browse virtual showroom and select bouquet\n2. Customize bouquet with attached message\n3. Choose suitable delivery time\n4. Receive gift with luxury packaging and exceptional delivery",
    status: "نشط",
    category: "تجارة فاخرة"
  },
  {
    id: "4",
    name: "باكلي",
    nameEn: "Backly",
    slug: "backly",
    description: "نظام ولاء ونقاط ذكي يعيد العملاء للمتاجر. يحوّل الزوار إلى عملاء أوفياء من خلال برامج مكافآت ونقاط مخصصة تحفز على تكرار الشراء وتعزز الارتباط بالعلامة التجارية.",
    descriptionEn: "A smart loyalty and points system that brings customers back to stores. Turns visitors into loyal customers through customized reward programs and points that incentivize repeat purchases and strengthen brand connection.",
    logo: "/logos/backly.png",
    images: ["/images/backly-1.png", "/images/backly-2.png", "/images/backly-3.png"],
    features: [
      "برامج ولاء مخصصة تناسب كل متجر ونشاط تجاري",
      "نظام نقاط ذكي مع خيارات استبدال متعددة",
      "عروض مخصصة وتوصيات ذكية لكل عميل",
      "لوحة تحكم متكاملة لتحليل سلوك العملاء",
      "إشعارات آلية وتنبيهات للعملاء والعروض الجديدة",
      "تكامل مع أنظمة نقاط البيع والمتاجر الإلكترونية",
      "تقارير تحليلية عن أداء برامج الولاء والعائد على الاستثمار"
    ],
    featuresEn: [
      "Customized loyalty programs for each store and business",
      "Smart points system with multiple redemption options",
      "Personalized offers and recommendations for each customer",
      "Comprehensive dashboard for customer behavior analysis",
      "Automated notifications for customers and new offers",
      "Integration with POS systems and e-commerce platforms",
      "Analytics reports on loyalty program performance and ROI"
    ],
    problem: "تعاني المتاجر والعلامات التجارية من ضعف ولاء العملاء وارتفاع معدل التخلي عن سلة التسوق. تفتقر الكثير من برامج الولاء التقليدية إلى التخصيص والتحفيز الحقيقي لتكرار الشراء.",
    problemEn: "Stores and brands suffer from low customer loyalty and high cart abandonment rates. Traditional loyalty programs often lack personalization and real incentive for repeat purchases.",
    targetAudience: "المتاجر ومراكز التسوق، العلامات التجارية، المطاعم والمقاهي، المتاجر الإلكترونية، مقدمي الخدمات، وأي نشاط تجاري يرغب في تعزيز ولاء العملاء.",
    targetAudienceEn: "Stores and shopping centers, brands, restaurants and cafes, e-commerce stores, service providers, and any business looking to enhance customer loyalty.",
    howItWorks: "1. تسجيل المتجر وإنشاء برنامج الولاء\n2. إضافة العملاء ونظام النقاط والمكافآت\n3. تفعيل التكامل مع نقاط البيع والمتجر الإلكتروني\n4. متابعة الأداء وتحليل سلوك العملاء وتحسين العروض",
    howItWorksEn: "1. Register store and create loyalty program\n2. Add customers, points system, and rewards\n3. Activate integration with POS and online store\n4. Monitor performance, analyze behavior, and optimize offers",
    status: "بيتا",
    category: "تسويق وولاء"
  },
  {
    id: "5",
    name: "مدار X",
    nameEn: "Madar X",
    slug: "madar-x",
    description: "شركة حلول واجهات وهوية خارجية للمشاريع والمتاجر. تقدم تصاميم عصرية وهويات بصرية مميزة تترك أثراً لا يُنسى، من اللوحات الإعلانية إلى الهوية البصرية الكاملة.",
    descriptionEn: "A signage and identity solutions company for projects and stores. Offers modern designs and distinctive visual identities that leave a lasting impression, from signage boards to complete brand identity.",
    logo: "/logos/madar-x.png",
    images: ["/images/madar-x-1.png", "/images/madar-x-2.png", "/images/madar-x-3.png"],
    features: [
      "تصميم وتنفيذ اللوحات الإعلانية والواجهات الخارجية",
      "هويات بصرية متكاملة للمشاريع والعلامات التجارية",
      "حلول إضاءة مبتكرة للواجهات واللافتات",
      "تصاميم عصرية بمواد عالية الجودة ومقاومة للعوامل الجوية",
      "استشارات تصميمية لاختيار أفضل الحلول البصرية",
      "تركيب وصيانة دورية لجميع الحلول",
      "تصميم وتنفيذ اللوحات الرقمية التفاعلية"
    ],
    featuresEn: [
      "Design and execution of billboards and exterior facades",
      "Complete visual identities for projects and brands",
      "Innovative lighting solutions for facades and signs",
      "Modern designs with high-quality weather-resistant materials",
      "Design consultations for optimal visual solutions",
      "Installation and periodic maintenance for all solutions",
      "Design and execution of interactive digital signage"
    ],
    problem: "تعاني المشاريع والمتاجر من ضعف الهوية البصرية الخارجية وعدم تناسقها مع العلامة التجارية. كما أن تصميم الواجهات واللوحات دون خبرة احترافية يؤدي إلى نتائج غير مرضية لا تجذب الانتباه.",
    problemEn: "Projects and stores suffer from weak external visual identity that doesn't align with their brand. Designing facades and signage without professional expertise leads to unsatisfactory results that fail to attract attention.",
    targetAudience: "المتاجر والعلامات التجارية، المطاعم والمقاهي، الشركات العقارية، الفنادق والمنتجعات، المشاريع الحكومية، وأي منشأة تحتاج إلى حلول واجهات وهوية بصرية.",
    targetAudienceEn: "Stores and brands, restaurants and cafes, real estate companies, hotels and resorts, government projects, and any facility needing signage and visual identity solutions.",
    howItWorks: "1. استشارة مجانية لفهم احتياجات المشروع\n2. تقديم تصاميم واقتراحات مبتكرة\n3. الموافقة على التصميم وبدء التنفيذ\n4. التركيب والتسليم مع ضمان الجودة",
    howItWorksEn: "1. Free consultation to understand project needs\n2. Present innovative designs and proposals\n3. Approve design and begin execution\n4. Installation and delivery with quality guarantee",
    status: "قريباً",
    category: "هوية بصرية"
  }
]

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): ProductData | undefined {
  return products.find((p) => p.id === id)
}
