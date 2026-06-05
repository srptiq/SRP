import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is required")
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin role
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      id: "role-admin",
      name: "admin",
      label: "مدير",
      permissions: ["all"],
    },
  })

  await prisma.role.upsert({
    where: { name: "editor" },
    update: {},
    create: {
      id: "role-editor",
      name: "editor",
      label: "محرر",
      permissions: ["content:read", "content:write"],
    },
  })

  await prisma.role.upsert({
    where: { name: "viewer" },
    update: {},
    create: {
      id: "role-viewer",
      name: "viewer",
      label: "مشاهد",
      permissions: ["content:read"],
    },
  })

  // Create admin user (password: admin123)
  const hashedPassword = await bcrypt.hash("admin123", 12)
  await prisma.user.upsert({
    where: { email: "admin@srptiq.com" },
    update: {},
    create: {
      id: "user-admin",
      email: "admin@srptiq.com",
      password: hashedPassword,
      name: "مدير النظام",
      roleId: adminRole.id,
      active: true,
    },
  })

  // Create services
  const services = [
    { id: "svc-01", title: "تطوير أنظمة SaaS", titleEn: "SaaS Development", slug: "saas", description: "نبني منصات سحابية متكاملة بنموذج الاشتراك، مع لوحات تحكم، أنظمة دفع، وإدارة مستخدمين متكاملة، مصممة للنمو والتوسع.", descriptionEn: "Build scalable cloud-based SaaS platforms with dashboards, payment systems, and user management.", icon: "cloud", features: ["تطوير كامل", "استضافة سحابية", "دعم فني"] },
    { id: "svc-02", title: "تطوير تطبيقات الجوال", titleEn: "Mobile Applications", slug: "mobile", description: "نطور تطبيقات جوال احترافية لنظامي iOS و Android باستخدام أحدث التقنيات.", descriptionEn: "Develop professional mobile apps for iOS and Android using the latest technologies.", icon: "smartphone", features: ["iOS", "Android", "UI/UX"] },
    { id: "svc-03", title: "تطوير المواقع والمنصات", titleEn: "Websites & Platforms", slug: "websites", description: "نصمم ونطور مواقع ويب ومنصات رقمية متكاملة.", descriptionEn: "Design and develop websites and integrated digital platforms.", icon: "globe", features: ["تصميم متجاوب", "أداء عالي", "SEO"] },
    { id: "svc-04", title: "الذكاء الاصطناعي", titleEn: "Artificial Intelligence", slug: "ai", description: "نوظف تقنيات الذكاء الاصطناعي وتعلم الآلة لبناء حلول ذكية.", descriptionEn: "Leverage AI and machine learning to build intelligent solutions.", icon: "cpu", features: ["تعلم آلة", "معالجة لغة", "رؤية حاسوبية"] },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }

  // Create products
  const products = [
    {
      id: "prod-01", name: "إضبار", nameEn: "Idbbar", slug: "idbbar",
      description: "منصة قانونية ذكية لإدارة المكاتب والمحاماة والقضايا والجلسات.",
      descriptionEn: "An intelligent legal platform for managing law offices, cases, and court sessions.",
      logo: "/logos/idbbar.png", features: ["إدارة القضايا", "جدولة ذكية", "أرشفة إلكترونية"],
      featuresEn: ["Case management", "Smart scheduling", "Digital archiving"],
      status: "نشط", category: "تقنية قانونية",
    },
    {
      id: "prod-02", name: "نسختي", nameEn: "Nasakhti", slug: "nasakhti",
      description: "تطبيق ذكي يساعد المستخدم على بناء نسخة أفضل من نفسه.",
      descriptionEn: "A smart app that helps users build a better version of themselves.",
      logo: "/logos/nasakhti.png", features: ["خطط تطوير", "متابعة عادات", "مجتمع داعم"],
      featuresEn: ["Development plans", "Habit tracking", "Supportive community"],
      status: "نشط", category: "تطوير شخصي",
    },
    {
      id: "prod-03", name: "بلنسيا", nameEn: "Blansia", slug: "blansia",
      description: "علامة فاخرة للورود والهدايا والتجارب الفريدة.",
      descriptionEn: "A luxury brand for flowers, gifts, and unique experiences.",
      logo: "/logos/blansia.png", features: ["باقات فاخرة", "توصيل متميز", "تجارب مخصصة"],
      featuresEn: ["Luxury bouquets", "Premium delivery", "Customized experiences"],
      status: "نشط", category: "تجارة فاخرة",
    },
    {
      id: "prod-04", name: "باكلي", nameEn: "Backly", slug: "backly",
      description: "نظام ولاء ونقاط ذكي يعيد العملاء للمتاجر.",
      descriptionEn: "A smart loyalty and points system that brings customers back to stores.",
      logo: "/logos/backly.png", features: ["برامج ولاء", "نظام نقاط", "تحليلات"],
      featuresEn: ["Loyalty programs", "Points system", "Analytics"],
      status: "بيتا", category: "تسويق وولاء",
    },
    {
      id: "prod-05", name: "مدار X", nameEn: "Madar X", slug: "madar-x",
      description: "شركة حلول واجهات وهوية خارجية للمشاريع والمتاجر.",
      descriptionEn: "A signage and identity solutions company for projects and stores.",
      logo: "/logos/madar-x.png", features: ["تصميم لوحات", "هوية بصرية", "حلول إضاءة"],
      featuresEn: ["Signage design", "Visual identity", "Lighting solutions"],
      status: "قريباً", category: "هوية بصرية",
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  // Create FAQ entries
  const faqs = [
    { id: "faq-01", question: "كم تستغرق مدة تطوير المشروع؟", questionEn: "How long does project development take?", answer: "تعتمد المدة على حجم المشروع. المشاريع الصغيرة 4-6 أسابيع، المتوسطة والكبيرة 3-6 أشهر.", answerEn: "Depends on project size. Small projects 4-6 weeks, medium to large 3-6 months.", order: 1 },
    { id: "faq-02", question: "هل تقدمون دعماً فنياً بعد التسليم؟", questionEn: "Do you provide post-delivery support?", answer: "نعم، نقدم دعماً فنياً لمدة 3 أشهر بعد التسليم مع عقود دعم سنوية.", answerEn: "Yes, we provide 3 months of support after delivery with annual maintenance contracts.", order: 2 },
    { id: "faq-03", question: "ما هي التقنيات التي تستخدمونها؟", questionEn: "What technologies do you use?", answer: "نستخدم Next.js، React، Node.js، Python، Flutter، AWS، وغيرها.", answerEn: "We use Next.js, React, Node.js, Python, Flutter, AWS, and more.", order: 3 },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: {},
      create: faq,
    })
  }

  // Create site settings
  const settings = [
    { key: "site_name_ar", value: "SRPTIQ" },
    { key: "site_name_en", value: "SRPTIQ" },
    { key: "site_desc_ar", value: "شركة تقنية سعودية متخصصة في بناء الأنظمة الذكية" },
    { key: "site_desc_en", value: "Saudi technology conglomerate building intelligent systems" },
    { key: "site_email", value: "info@srptiq.com" },
    { key: "site_phone", value: "+966 55 000 0000" },
    { key: "site_address_ar", value: "الرياض، المملكة العربية السعودية" },
    { key: "site_address_en", value: "Riyadh, Saudi Arabia" },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log("📧 Admin login: admin@srptiq.com / admin123")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })