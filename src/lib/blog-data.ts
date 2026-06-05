export interface BlogPost {
  id: string
  title: string
  titleEn: string
  slug: string
  excerpt: string
  excerptEn: string
  content: string
  contentEn: string
  category: string
  categoryEn: string
  author: string
  authorEn: string
  date: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "كيف تبني منتج SaaS ناجح من الصفر",
    titleEn: "How to Build a Successful SaaS Product from Scratch",
    slug: "build-successful-saas-from-scratch",
    excerpt: "دليل شامل للمراحل الأساسية لبناء منتج SaaS ناجح، من الفكرة إلى الإطلاق والنمو المستمر.",
    excerptEn: "A comprehensive guide to the essential stages of building a successful SaaS product, from idea to launch and continuous growth.",
    content: `<p>بناء منتج SaaS ناجح يتطلب أكثر من مجرد فكرة جيدة. إنه رحلة متكاملة تمر بعدة مراحل أساسية:</p>
<p><strong>١. التحقق من الفكرة:</strong> قبل كتابة أي سطر كود، تأكد من وجود سوق حقيقي لمنتجك. تحدث مع العملاء المحتملين، حلل المنافسين، وابني MVP.</p>
<p><strong>٢. تصميم تجربة المستخدم:</strong> المنتج الجيد هو المنتج السهل الاستخدام. استثمر في تصميم UX/UI منذ اليوم الأول.</p>
<p><strong>٣. اختيار التقنية المناسبة:</strong> اختر stack تقني قابل للتوسع. Next.js للتطبيق، Node.js للـ Backend، و PostgreSQL للقاعدة البيانات.</p>
<p><strong>٤. بناء MVP:</strong> ركز على الميزات الأساسية فقط. أطلق سريعاً واجمع التعليقات.</p>
<p><strong>٥. النمو المستمر:</strong> استمع لعملائك، حلل البيانات، وطور منتجك بشكل مستمر.</p>
<p>في SRPTIQ، نتبع هذه المنهجية بدقة في جميع مشاريعنا، مما ساعد عملاءنا على إطلاق منتجات ناجحة في وقت قياسي.</p>`,
    contentEn: `<p>Building a successful SaaS product requires more than just a good idea. It's a complete journey through several key stages:</p>
<p><strong>1. Idea Validation:</strong> Before writing any code, ensure there's a real market for your product. Talk to potential customers, analyze competitors, and build an MVP.</p>
<p><strong>2. User Experience Design:</strong> A good product is an easy-to-use product. Invest in UX/UI design from day one.</p>
<p><strong>3. Choosing the Right Tech Stack:</strong> Select a scalable technology stack. Next.js for the frontend, Node.js for the backend, and PostgreSQL for the database.</p>
<p><strong>4. Building an MVP:</strong> Focus only on core features. Launch quickly and gather feedback.</p>
<p><strong>5. Continuous Growth:</strong> Listen to your customers, analyze data, and continuously develop your product.</p>
<p>At SRPTIQ, we follow this methodology precisely in all our projects, helping our clients launch successful products in record time.</p>`,
    category: "تطوير البرمجيات",
    categoryEn: "Software Development",
    author: "فريق SRPTIQ",
    authorEn: "SRPTIQ Team",
    date: "2026-03-15",
    image: ""
  },
  {
    id: "2",
    title: "الذكاء الاصطناعي في تحويل الأعمال: دليل شامل",
    titleEn: "AI in Business Transformation: A Complete Guide",
    slug: "ai-in-business-transformation",
    excerpt: "كيف يمكن للشركات الاستفادة من تقنيات الذكاء الاصطناعي لتحسين عملياتها وزيادة كفاءتها.",
    excerptEn: "How businesses can leverage AI technologies to improve their operations and increase efficiency.",
    content: `<p>الذكاء الاصطناعي لم يعد خياراً، بل أصبح ضرورة تنافسية للشركات في العصر الرقمي.</p>
<p><strong>أتمتة العمليات:</strong> يمكن للذكاء الاصطناعي أتمتة المهام المتكررة وتحرير الموظفين للتركيز على الأعمال الإبداعية.</p>
<p><strong>تحليل البيانات:</strong> تستطيع خوارزميات تعلم الآلة تحليل كميات هائلة من البيانات واستخراج رؤى قابلة للتنفيذ.</p>
<p><strong>التوصيات الذكية:</strong> أنظمة التوصية المدعومة بالذكاء الاصطناعي تزيد المبيعات وتحسن تجربة العملاء.</p>
<p><strong>خدمة العملاء:</strong> المساعدات الآلية المدعومة بالذكاء الاصطناعي توفر دعماً فورياً على مدار الساعة.</p>
<p>في SRPTIQ، نساعد الشركات على دمج الذكاء الاصطناعي في أنظمتها بسلاسة وفعالية.</p>`,
    contentEn: `<p>Artificial intelligence is no longer an option — it's a competitive necessity for businesses in the digital age.</p>
<p><strong>Process Automation:</strong> AI can automate repetitive tasks and free employees to focus on creative work.</p>
<p><strong>Data Analysis:</strong> Machine learning algorithms can analyze massive amounts of data and extract actionable insights.</p>
<p><strong>Smart Recommendations:</strong> AI-powered recommendation systems increase sales and improve customer experience.</p>
<p><strong>Customer Service:</strong> AI-powered chatbots provide instant 24/7 support.</p>
<p>At SRPTIQ, we help businesses integrate AI into their systems smoothly and effectively.</p>`,
    category: "الذكاء الاصطناعي",
    categoryEn: "Artificial Intelligence",
    author: "م. سارة القحطاني",
    authorEn: "Eng. Sara Al-Qahtani",
    date: "2026-03-01",
    image: ""
  },
  {
    id: "3",
    title: "أهمية تجربة المستخدم في نجاح المنتجات الرقمية",
    titleEn: "The Importance of UX in Digital Product Success",
    slug: "importance-of-ux-in-digital-products",
    excerpt: "لماذا يعتبر تصميم تجربة المستخدم عاملاً حاسماً في نجاح أو فشل المنتجات الرقمية.",
    excerptEn: "Why UX design is a critical factor in the success or failure of digital products.",
    content: `<p>تجربة المستخدم (UX) هي ما يفرق بين منتج ناجح وآخر يفشل. إليك لماذا:</p>
<p><strong>الانطباع الأول:</strong> يحتاج المستخدم أقل من ثانية لتكوين رأي عن منتجك. التصميم الجيد يخلق انطباعاً إيجابياً فورياً.</p>
<p><strong>سهولة الاستخدام:</strong> إذا كان المستخدم بحاجة إلى دليل لفهم منتجك، فهناك مشكلة في التصميم.</p>
<p><strong>تقليل التكاليف:</strong> إصلاح مشاكل UX بعد الإطلاق يكلف ١٠ أضعاف تكلفة إصلاحها أثناء التصميم.</p>
<p><strong>زيادة المبيعات:</strong> تحسين تجربة المستخدم يمكن أن يزيد معدل التحويل بنسبة تصل إلى ٤٠٠٪.</p>
<p>في SRPTIQ، نجعل تجربة المستخدم في قلب كل منتج نبنيه.</p>`,
    contentEn: `<p>User experience (UX) is what separates a successful product from one that fails. Here's why:</p>
<p><strong>First Impression:</strong> Users take less than a second to form an opinion about your product. Good design creates an instant positive impression.</p>
<p><strong>Ease of Use:</strong> If users need a manual to understand your product, there's a design problem.</p>
<p><strong>Cost Reduction:</strong> Fixing UX issues after launch costs 10x more than fixing them during design.</p>
<p><strong>Increased Sales:</strong> Improving UX can increase conversion rates by up to 400%.</p>
<p>At SRPTIQ, we put UX at the heart of every product we build.</p>`,
    category: "تصميم",
    categoryEn: "Design",
    author: "أ. أحمد الشمري",
    authorEn: "Ahmed Al-Shammari",
    date: "2026-02-20",
    image: ""
  },
  {
    id: "4",
    title: "دليل اختيار التقنية المناسبة لمشروعك القادم",
    titleEn: "A Guide to Choosing the Right Tech Stack for Your Next Project",
    slug: "choosing-right-tech-stack",
    excerpt: "كيف تختار التقنيات المناسبة لمشروعك بناءً على متطلباته وميزانيته وأهدافه المستقبلية.",
    excerptEn: "How to choose the right technologies for your project based on its requirements, budget, and future goals.",
    content: `<p>اختيار التقنية المناسبة من أهم القرارات التي تؤثر على نجاح المشروع. إليك العوامل الأساسية:</p>
<p><strong>حجم المشروع:</strong> المشاريع الصغيرة تحتاج حلولاً مختلفة عن المشاريع الكبيرة. Next.js مثالي للمشاريع المتوسطة والكبيرة.</p>
<p><strong>قابلية التوسع:</strong> اختر تقنيات يمكنها النمو مع عملك. Node.js و PostgreSQL خيارات ممتازة.</p>
<p><strong>سرعة التطوير:</strong> أطر العمل مثل Next.js تسرع التطوير بشكل كبير بفضل الميزات المدمجة.</p>
<p><strong>المجتمع والدعم:</strong> التقنيات ذات المجتمعات الكبيرة توفر دعماً أفضل وموارد أكثر.</p>
<p><strong>التكلفة:</strong> ضع في اعتبارك تكاليف التطوير والتشغيل والصيانة على المدى الطويل.</p>`,
    contentEn: `<p>Choosing the right tech stack is one of the most important decisions affecting project success. Here are the key factors:</p>
<p><strong>Project Size:</strong> Small projects need different solutions than large ones. Next.js is ideal for medium and large projects.</p>
<p><strong>Scalability:</strong> Choose technologies that can grow with your business. Node.js and PostgreSQL are excellent choices.</p>
<p><strong>Development Speed:</strong> Frameworks like Next.js significantly speed up development with built-in features.</p>
<p><strong>Community & Support:</strong> Technologies with large communities offer better support and more resources.</p>
<p><strong>Cost:</strong> Consider development, operation, and maintenance costs in the long term.</p>`,
    category: "تقنية",
    categoryEn: "Technology",
    author: "م. فيصل الحربي",
    authorEn: "Eng. Faisal Al-Harbi",
    date: "2026-02-10",
    image: ""
  },
  {
    id: "5",
    title: "التحول الرقمي في السعودية: الفرص والتحديات",
    titleEn: "Digital Transformation in Saudi Arabia: Opportunities and Challenges",
    slug: "digital-transformation-saudi-arabia",
    excerpt: "نظرة على واقع التحول الرقمي في المملكة والفرص المتاحة للشركات الناشئة والمؤسسات.",
    excerptEn: "A look at the state of digital transformation in Saudi Arabia and opportunities for startups and enterprises.",
    content: `<p>يشهد التحول الرقمي في المملكة العربية السعودية طفرة غير مسبوقة بفضل رؤية ٢٠٣٠.</p>
<p><strong>الفرص:</strong></p>
<p>• سوق ضخم يزيد عن ٣٥ مليون مستخدم رقمي<br>
• دعم حكومي غير محدود للابتكار التقني<br>
• بيئة تنظيمية مشجعة للشركات الناشئة<br>
• طلب متزايد على الحلول الرقمية في جميع القطاعات</p>
<p><strong>التحديات:</strong></p>
<p>• نقص الكوادر التقنية المؤهلة<br>
• الحاجة إلى بنية تحتية رقمية متطورة<br>
• التكيف مع الأنظمة والتشريعات الجديدة</p>
<p>في SRPTIQ، نساعد المؤسسات على تجاوز هذه التحديات وتحقيق أهدافها الرقمية.</p>`,
    contentEn: `<p>Digital transformation in Saudi Arabia is experiencing an unprecedented boom thanks to Vision 2030.</p>
<p><strong>Opportunities:</strong></p>
<p>• A massive market of over 35 million digital users<br>
• Unlimited government support for tech innovation<br>
• A regulatory environment encouraging startups<br>
• Growing demand for digital solutions across all sectors</p>
<p><strong>Challenges:</strong></p>
<p>• Shortage of qualified technical talent<br>
• Need for advanced digital infrastructure<br>
• Adapting to new regulations and legislations</p>
<p>At SRPTIQ, we help organizations overcome these challenges and achieve their digital goals.</p>`,
    category: "تحول رقمي",
    categoryEn: "Digital Transformation",
    author: "فريق SRPTIQ",
    authorEn: "SRPTIQ Team",
    date: "2026-01-25",
    image: ""
  },
  {
    id: "6",
    title: "أفضل ممارسات الأمن السيبراني لتطبيقات الويب",
    titleEn: "Best Cybersecurity Practices for Web Applications",
    slug: "cybersecurity-best-practices-web-apps",
    excerpt: "دليل أساسي لحماية تطبيقات الويب من التهديدات الأمنية الشائعة وضمان أمان بيانات المستخدمين.",
    excerptEn: "An essential guide to protecting web applications from common security threats and ensuring user data safety.",
    content: `<p>الأمن السيبراني ليس ترفاً، بل ضرورة أساسية لأي تطبيق ويب. إليك أفضل الممارسات:</p>
<p><strong>١. تشفير البيانات:</strong> استخدم HTTPS دائماً وشفر البيانات الحساسة في قاعدة البيانات.</p>
<p><strong>٢. المصادقة الآمنة:</strong> طبق OAuth 2.0 وجيل توكينات آمنة مع صلاحية محدودة.</p>
<p><strong>٣. الحماية من XSS:</strong> عقم المدخلات واستخدم Content Security Policy.</p>
<p><strong>٤. الحماية من CSRF:</strong> استخدم توكينات مضادة للتزوير في جميع النماذج.</p>
<p><strong>٥. إدارة الجلسات:</strong> طبق انتهاء صلاحية الجلسات واستخدم HttpOnly cookies.</p>
<p><strong>٦. التدقيق المنتظم:</strong> أجرِ اختبارات اختراق دورية ومراجعة أمنية للكود.</p>
<p>في SRPTIQ، نضع الأمن في صميم كل تطبيق نبنيه، مع اتباع أعلى معايير الأمان العالمية.</p>`,
    contentEn: `<p>Cybersecurity is not a luxury — it's a fundamental necessity for any web application. Here are the best practices:</p>
<p><strong>1. Data Encryption:</strong> Always use HTTPS and encrypt sensitive data in the database.</p>
<p><strong>2. Secure Authentication:</strong> Implement OAuth 2.0 and generate secure tokens with limited validity.</p>
<p><strong>3. XSS Protection:</strong> Sanitize inputs and use Content Security Policy.</p>
<p><strong>4. CSRF Protection:</strong> Use anti-forgery tokens in all forms.</p>
<p><strong>5. Session Management:</strong> Implement session expiration and use HttpOnly cookies.</p>
<p><strong>6. Regular Auditing:</strong> Conduct periodic penetration tests and security code reviews.</p>
<p>At SRPTIQ, we put security at the heart of every application we build, following the highest global security standards.</p>`,
    category: "أمن سيبراني",
    categoryEn: "Cybersecurity",
    author: "م. نورة الدوسري",
    authorEn: "Eng. Nora Al-Dosari",
    date: "2026-01-10",
    image: ""
  }
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export const blogCategories = [
  { name: "الكل", nameEn: "All", slug: "all" },
  { name: "تطوير البرمجيات", nameEn: "Software Development", slug: "software-development" },
  { name: "الذكاء الاصطناعي", nameEn: "Artificial Intelligence", slug: "ai" },
  { name: "تصميم", nameEn: "Design", slug: "design" },
  { name: "تقنية", nameEn: "Technology", slug: "technology" },
  { name: "تحول رقمي", nameEn: "Digital Transformation", slug: "digital-transformation" },
  { name: "أمن سيبراني", nameEn: "Cybersecurity", slug: "cybersecurity" },
]
