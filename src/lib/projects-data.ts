export interface ProjectData {
  id: string
  name: string
  nameEn: string
  slug: string
  client: string
  clientEn: string
  category: string
  categoryEn: string
  description: string
  descriptionEn: string
  details: string
  detailsEn: string
  technologies: string[]
  status: string
  statusEn: string
  image?: string
  images?: string[]
}

export const projects: ProjectData[] = [
  {
    id: "1",
    name: "منصة المحامي الذكية",
    nameEn: "Smart Lawyer Platform",
    slug: "smart-lawyer-platform",
    client: "مكتب محاماة",
    clientEn: "Law Firm",
    category: "تقنية قانونية",
    categoryEn: "Legal Tech",
    description: "تطوير منصة شاملة لإدارة المكاتب القانونية تشمل إدارة القضايا والجلسات والمواعيد والفواتير، مع تقارير تحليلية وتكامل مع الأنظمة الحكومية.",
    descriptionEn: "Developed a comprehensive platform for managing legal offices including case management, court sessions, appointments, and invoices, with analytical reports and government system integration.",
    details: "تم تطوير هذه المنصة بالتعاون مع أحد أكبر مكاتب المحاماة في المملكة، بهدف أتمتة جميع العمليات القانونية اليومية. تشمل المنصة نظاماً متكاملاً لإدارة القضايا يتتبع كل مرحلة من مراحل الدعوى، مع جدول زمني ذكي للجلسات والمواعيد. تم ربط المنصة بقاعدة بيانات ضخمة تحتوي على آلاف السوابق القضائية المدعومة بالذكاء الاصطناعي لتقديم توصيات قانونية دقيقة. كما تم تطوير نظام فوترة إلكتروني يتكامل مع أنظمة الدفع الحكومية.",
    detailsEn: "This platform was developed in collaboration with one of the largest law firms in the Kingdom, aiming to automate all daily legal operations. The platform includes a comprehensive case management system that tracks every stage of litigation, with a smart timeline for sessions and appointments. The platform was connected to a massive database containing thousands of legal precedents supported by artificial intelligence to provide accurate legal recommendations. An electronic billing system integrated with government payment systems was also developed.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AI", "AWS"],
    status: "منجز",
    statusEn: "Completed"
  },
  {
    id: "2",
    name: "تطبيق هُويّة للهوية البصرية",
    nameEn: "Huwaya Brand Identity App",
    slug: "huwaya-brand-identity",
    client: "شركة هوية",
    clientEn: "Huwaya Co.",
    category: "هوية بصرية",
    categoryEn: "Visual Identity",
    description: "تصميم وتطوير حلول الهوية البصرية وواجهات المتاجر والمشاريع التجارية مع تنفيذ احترافي واستخدام أحدث تقنيات الإضاءة والمواد.",
    descriptionEn: "Designed and developed visual identity solutions for stores and commercial projects with professional execution using latest lighting and material technologies.",
    details: "عملنا مع شركة هوية على تطوير حلول متكاملة للهوية البصرية تشمل تصميم الشعارات، الهوية الكاملة، واجهات المتاجر، اللوحات الإعلانية، وحلول الإضاءة المبتكرة. قمنا بتطوير منصة رقمية تتيح للعملاء مشاهدة تصاميمهم ثلاثية الأبعاد قبل التنفيذ، مما ساعد في تقليل وقت الموافقة على التصاميم بنسبة 60%. كما قمنا بتطبيق أحدث تقنيات الإضاءة LED والمواد المقاومة للعوامل الجوية لضمان جودة تدوم لسنوات.",
    detailsEn: "We worked with Huwaya to develop integrated visual identity solutions including logo design, complete branding, store facades, billboards, and innovative lighting solutions. We developed a digital platform that allows clients to view their designs in 3D before execution, which helped reduce design approval time by 60%. We also implemented the latest LED lighting technologies and weather-resistant materials to ensure quality that lasts for years.",
    technologies: ["React", "Three.js", "Figma", "AutoCAD", "IoT"],
    status: "منجز",
    statusEn: "Completed"
  },
  {
    id: "3",
    name: "برنامج ولاء العملاء",
    nameEn: "Customer Loyalty Program",
    slug: "customer-loyalty-program",
    client: "سلسلة متاجر",
    clientEn: "Retail Chain",
    category: "تسويق وولاء",
    categoryEn: "Marketing & Loyalty",
    description: "بناء نظام ولاء ونقاط متكامل يربط جميع فروع السلسلة مع تطبيق جوال للعملاء، يتيح جمع النقاط واستبدالها والحصول على عروض مخصصة.",
    descriptionEn: "Built an integrated loyalty and points system connecting all chain branches with a mobile app, enabling points collection, redemption, and personalized offers.",
    details: "طورنا نظام ولاء متكاملاً لإحدى أكبر سلاسل التجزئة في المملكة، يربط أكثر من 50 فرعاً في نظام مركزي واحد. النظام مبني على Flutter للجوال و Node.js للخادم مع MongoDB للبيانات و Redis للذاكرة المؤقتة و Firebase للإشعارات الفورية. يتيح التطبيق للعملاء جمع النقاط من أي فرع واستبدالها بعروض حصرية. النظام يتضمن أيضاً محرك توصيات ذكي يحلل سلوك العملاء ويقترح عروضاً مخصصة لكل عميل، مما زاد معدل الشراء المتكرر بنسبة 35%.",
    detailsEn: "We developed an integrated loyalty system for one of the largest retail chains in the Kingdom, connecting over 50 branches in a single centralized system. The system is built on Flutter for mobile and Node.js for the server with MongoDB for data, Redis for caching, and Firebase for push notifications. The app allows customers to collect points from any branch and redeem them for exclusive offers. The system also includes a smart recommendation engine that analyzes customer behavior and suggests personalized offers, increasing repeat purchase rate by 35%.",
    technologies: ["Flutter", "Node.js", "MongoDB", "Redis", "Firebase"],
    status: "منجز",
    statusEn: "Completed"
  },
  {
    id: "4",
    name: "لوحة تحكم ذكاء الأعمال",
    nameEn: "Business Intelligence Dashboard",
    slug: "business-intelligence-dashboard",
    client: "شركة استثمارية",
    clientEn: "Investment Company",
    category: "تحليلات",
    categoryEn: "Analytics",
    description: "تطوير لوحة تحكم متقدمة لتحليل البيانات المالية والتشغيلية مع رسوم بيانية تفاعلية، تقارير لحظية، وتنبؤات ذكية تعتمد على تعلم الآلة.",
    descriptionEn: "Developed an advanced dashboard for financial and operational data analysis with interactive charts, real-time reports, and ML-based smart predictions.",
    details: "صممنا وطورنا لوحة تحكم ذكاء أعمال متقدمة لشركة استثمارية تدير محافظ مالية تتجاوز قيمتها 2 مليار ريال. اللوحة تعرض بيانات مالية وتشغيلية معقدة بطريقة بصرية سهلة الفهم مع رسوم بيانية تفاعلية مصممة باستخدام D3.js. قمنا بتطوير نماذج تعلم آلة باستخدام Python و TensorFlow للتنبؤ باتجاهات السوق وتحليل المخاطر. النظام مبني على Next.js مع ClickHouse لتحليل البيانات الضخمة في الزمن الحقيقي، مما يتيح للفريق الاستثماري اتخاذ قرارات أسرع وأكثر دقة.",
    detailsEn: "We designed and developed an advanced business intelligence dashboard for an investment company managing portfolios exceeding 2 billion SAR. The dashboard presents complex financial and operational data in an easy-to-understand visual format with interactive charts built with D3.js. We developed machine learning models using Python and TensorFlow for market trend prediction and risk analysis. The system is built on Next.js with ClickHouse for real-time big data analytics, enabling the investment team to make faster and more accurate decisions.",
    technologies: ["Next.js", "Python", "TensorFlow", "D3.js", "ClickHouse"],
    status: "قيد التطوير",
    statusEn: "In Development"
  },
  {
    id: "5",
    name: "منصة تدريب إلكتروني",
    nameEn: "E-Learning Platform",
    slug: "e-learning-platform",
    client: "مؤسسة تعليمية",
    clientEn: "Educational Institution",
    category: "تقنية تعليمية",
    categoryEn: "EdTech",
    description: "بناء منصة تعليمية متكاملة مع نظام إدارة التعلم، فصول افتراضية، مكتبة موارد، وتقييم ذكي للمتدربين مع شهادات إتمام معتمدة.",
    descriptionEn: "Built a comprehensive learning platform with LMS, virtual classrooms, resource library, and smart trainee assessment with certified completion certificates.",
    details: "قمنا ببناء منصة تعليمية متكاملة تستهدف أكثر من 100,000 متدرب سنوياً. المنصة تشمل نظام إدارة تعلم (LMS) متطور مع فصول افتراضية مدعومة بتقنية WebRTC للتواصل المباشر مع المدربين. طورنا مكتبة موارد رقمية تحتوي على آلاف الساعات من المحتوى التعليمي مع محرك بحث ذكي. نظام التقييم الذكي يحلل أداء المتدربين ويقدم توصيات مخصصة لتحسين مستواهم. كما أضفنا نظام شهادات إتمام معتمدة مع QR code للتحقق من صحتها. تم دمج المنصة مع Stripe لأنظمة الدفع، مع FFmpeg لمعالجة الفيديوهات.",
    detailsEn: "We built a comprehensive learning platform targeting over 100,000 trainees annually. The platform includes an advanced LMS with virtual classrooms powered by WebRTC technology for direct communication with trainers. We developed a digital resource library containing thousands of hours of educational content with a smart search engine. The smart assessment system analyzes trainee performance and provides personalized recommendations for improvement. We also added a certified completion certificate system with QR codes for verification. The platform was integrated with Stripe for payment systems and FFmpeg for video processing.",
    technologies: ["Next.js", "WebRTC", "PostgreSQL", "FFmpeg", "Stripe"],
    status: "منجز",
    statusEn: "Completed"
  },
  {
    id: "6",
    name: "تطبيق رعاية صحية عن بُعد",
    nameEn: "Telehealth Application",
    slug: "telehealth-application",
    client: "مجموعة طبية",
    clientEn: "Medical Group",
    category: "تقنية صحية",
    categoryEn: "HealthTech",
    description: "تطوير تطبيق للاستشارات الطبية عن بُعد مع حجز المواعيد، استشارات فيديو، وصفات إلكترونية، وتكامل مع الأنظمة الصحية المحلية.",
    descriptionEn: "Developed a telemedicine app with appointment booking, video consultations, e-prescriptions, and integration with local health systems.",
    details: "طورنا تطبيق رعاية صحية عن بُعد يربط المرضى بأكثر من 500 طبيب واستشاري في مختلف التخصصات. التطبيق مبني على Flutter للجوال مع Node.js للخادم و Firebase للبنية التحتية. قمنا بتطوير نظام حجز مواعيد ذكي مع جدولة متقدمة تراعي أوقات الأطباء وتفضيلات المرضى. الاستشارات تتم عبر فيديو عالي الجودة باستخدام WebRTC مع تشفير كامل للبيانات. التطبيق يتكامل مع الأنظمة الصحية المحلية باستخدام معيار HL7 FHIR لتبادل البيانات الصحية بشكل آمن، ويتيح إصدار وصفات إلكترونية متوافقة مع لوائح وزارة الصحة.",
    detailsEn: "We developed a telemedicine app connecting patients with over 500 doctors and consultants across various specialties. The app is built on Flutter for mobile with Node.js for the server and Firebase for infrastructure. We developed a smart appointment booking system with advanced scheduling that considers doctor availability and patient preferences. Consultations are conducted via high-quality video using WebRTC with full data encryption. The app integrates with local health systems using the HL7 FHIR standard for secure health data exchange, and enables e-prescriptions compliant with Ministry of Health regulations.",
    technologies: ["Flutter", "Node.js", "WebRTC", "Firebase", "HL7 FHIR"],
    status: "قيد التطوير",
    statusEn: "In Development"
  }
]

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug)
}
