import type {
  Service, Product, Project, BlogPost, FAQ,
  ContactMessage, ProjectRequest, User, Role, SiteSetting, DashboardStats
} from "@/types"
import { v4 as uuid } from "uuid"

export const mockRoles: Role[] = [
  { id: "1", name: "admin", label: "Admin", permissions: ["all"] },
  { id: "2", name: "editor", label: "Editor", permissions: ["read", "write"] },
  { id: "3", name: "viewer", label: "Viewer", permissions: ["read"] },
]

export const mockServices: Service[] = [
  { id: "1", title: "تطوير أنظمة SaaS", titleEn: "SaaS Development", description: "تطوير منصات سحابية", descriptionEn: "Develop scalable cloud platforms", icon: "Cloud", slug: "saas-development", published: true, features: ["Scalable", "Multi-tenant", "Cloud-native"] },
  { id: "2", title: "الذكاء الاصطناعي", titleEn: "Artificial Intelligence", description: "حلول ذكاء اصطناعي", descriptionEn: "AI solutions", icon: "Brain", slug: "artificial-intelligence", published: true, features: ["ML Models", "NLP", "Computer Vision"] },
  { id: "3", title: "تطوير التطبيقات", titleEn: "Mobile Applications", description: "تطبيقات جوال", descriptionEn: "Mobile app development", icon: "Smartphone", slug: "mobile-applications", published: false, features: ["iOS", "Android", "Cross-platform"] },
]

export const mockProducts: Product[] = [
  { id: "1", name: "إضبار", nameEn: "Idbbar", slug: "idbbar", description: "منصة قانونية ذكية", descriptionEn: "Intelligent legal platform", features: ["Case Management", "Document Automation"], featuresEn: ["Case Management", "Document Automation"], status: "active", published: true, images: [], logo: "" },
  { id: "2", name: "نسختي", nameEn: "Nasakhti", slug: "nasakhti", description: "تطبيق تطوير ذاتي", descriptionEn: "Self-development app", features: ["Habit Tracking", "AI Guidance"], featuresEn: ["Habit Tracking", "AI Guidance"], status: "active", published: true, images: [], logo: "" },
  { id: "3", name: "باكلي", nameEn: "Backly", slug: "backly", description: "نظام ولاء", descriptionEn: "Loyalty system", features: ["Points System", "Rewards"], featuresEn: ["Points System", "Rewards"], status: "active", published: true, images: [], logo: "" },
]

export const mockProjects: Project[] = [
  { id: "1", name: "منصة تعليمية", nameEn: "Edu Platform", client: "وزارة التعليم", clientEn: "Ministry of Education", description: "منصة تعليمية متكاملة", descriptionEn: "Integrated educational platform", category: "web", technologies: ["Next.js", "Node.js"], status: "completed", url: "https://example.com", published: true, images: [] },
  { id: "2", name: "نظام إدارة مستشفيات", nameEn: "Hospital Management", client: "مستشفى السعودي", clientEn: "Saudi Hospital", description: "نظام إدارة متكامل", descriptionEn: "Integrated management system", category: "enterprise", technologies: ["React", "Python"], status: "in-progress", url: "", published: true, images: [] },
]

export const mockBlogPosts: BlogPost[] = [
  { id: "1", title: "مستقبل الذكاء الاصطناعي", titleEn: "Future of AI", slug: "future-of-ai", content: "محتوى المقال عن الذكاء الاصطناعي", contentEn: "Article content about AI", excerpt: "نظرة على مستقبل AI", excerptEn: "A look at the future of AI", author: "Ahmed", published: true, tags: ["AI", "Technology"], category: { id: "1", name: "تقنية", nameEn: "Technology", slug: "technology" }, createdAt: "2026-01-15" },
  { id: "2", title: "أهمية التحول الرقمي", titleEn: "Digital Transformation", slug: "digital-transformation", content: "محتوى عن التحول الرقمي", contentEn: "Content about digital transformation", author: "Sara", published: false, tags: ["Digital", "Business"], category: { id: "2", name: "أعمال", nameEn: "Business", slug: "business" }, createdAt: "2026-02-20" },
]

export const mockMessages: ContactMessage[] = [
  { id: "1", name: "أحمد علي", email: "ahmed@example.com", phone: "0555000011", subject: "استفسار عن منتج", message: "أرغب في معرفة المزيد عن منتج إضبار", read: false, createdAt: "2026-05-27T10:00:00Z" },
  { id: "2", name: "Sara Smith", email: "sara@example.com", subject: "Project Inquiry", message: "I'd like to discuss a new project", read: true, createdAt: "2026-05-26T14:30:00Z" },
  { id: "3", name: "خالد محمد", email: "khalid@example.com", phone: "0555000022", subject: "طلب خدمة", message: "نحتاج إلى تطوير تطبيق جوال", read: false, createdAt: "2026-05-25T09:15:00Z" },
  { id: "4", name: "John Doe", email: "john@example.com", subject: "Partnership", message: "Interested in partnership opportunities", read: false, createdAt: "2026-05-24T16:45:00Z" },
  { id: "5", name: "فاطمة الزهراء", email: "fatima@example.com", phone: "0555000033", subject: "استشارة", message: "نحتاج استشارة في التحول الرقمي", read: true, createdAt: "2026-05-23T11:00:00Z" },
]

export const mockRequests: ProjectRequest[] = [
  { id: "1", company: "شركة التقنية", contactName: "محمد أحمد", email: "mohammed@tech.com", phone: "0555111222", projectType: "web", budget: "50k-100k", description: "نريد بناء منصة تجارة إلكترونية", attachments: [], read: false, createdAt: "2026-05-27T08:00:00Z" },
  { id: "2", company: "Tech Corp", contactName: "James Wilson", email: "james@techcorp.com", phone: "0555111333", projectType: "mobile", budget: "100k-200k", description: "Mobile app for our service", attachments: [], read: true, createdAt: "2026-05-26T12:00:00Z" },
  { id: "3", company: "مؤسسة البناء", contactName: "سالم العتيبي", email: "salem@build.com", phone: "0555111444", projectType: "enterprise", budget: "200k+", description: "ERP system for construction company", attachments: [], read: false, createdAt: "2026-05-25T15:00:00Z" },
]

export const mockUsers: User[] = [
  { id: "1", email: "admin@srptiq.com", name: "مدير النظام", role: mockRoles[0], active: true },
  { id: "2", email: "editor@srptiq.com", name: "محرر المحتوى", role: mockRoles[1], active: true },
  { id: "3", email: "viewer@srptiq.com", name: "مشاهد", role: mockRoles[2], active: false },
]

export const mockFAQ: FAQ[] = [
  { id: "1", question: "ما هي خدمات SRPTIQ؟", questionEn: "What are SRPTIQ services?", answer: "نقدم خدمات تقنية متنوعة", answerEn: "We offer various tech services", category: "general", order: 1, published: true },
  { id: "2", question: "كيف أبدأ مشروعاً؟", questionEn: "How to start a project?", answer: "تواصل معنا عبر النموذج", answerEn: "Contact us via the form", category: "project", order: 2, published: true },
  { id: "3", question: "ما هي مدة التطوير؟", questionEn: "What is the development time?", answer: "تختلف حسب المشروع", answerEn: "Depends on the project", category: "project", order: 3, published: false },
]

export const mockPages = [
  { id: "1", slug: "/", title: "Home", titleAr: "الرئيسية", metaTitle: "SRPTIQ - Saudi Tech Enterprise", metaDesc: "Saudi technology company" },
  { id: "2", slug: "/about", title: "About Us", titleAr: "من نحن", metaTitle: "About SRPTIQ", metaDesc: "Learn about SRPTIQ" },
  { id: "3", slug: "/services", title: "Services", titleAr: "الخدمات", metaTitle: "Our Services", metaDesc: "Technical services" },
  { id: "4", slug: "/products", title: "Products", titleAr: "المنتجات", metaTitle: "Our Products", metaDesc: "Digital products" },
  { id: "5", slug: "/blog", title: "Blog", titleAr: "المدونة", metaTitle: "Blog", metaDesc: "Tech blog" },
  { id: "6", slug: "/contact", title: "Contact", titleAr: "تواصل معنا", metaTitle: "Contact Us", metaDesc: "Get in touch" },
  { id: "7", slug: "/faq", title: "FAQ", titleAr: "الأسئلة الشائعة", metaTitle: "FAQ", metaDesc: "Frequently asked questions" },
]

export const mockSettings: SiteSetting[] = [
  { key: "site_name_ar", value: "SRPTIQ" },
  { key: "site_name_en", value: "SRPTIQ" },
  { key: "site_desc_ar", value: "شركة تقنية سعودية" },
  { key: "site_desc_en", value: "Saudi tech enterprise" },
  { key: "site_email", value: "info@srptiq.com" },
  { key: "site_phone", value: "+966500000000" },
  { key: "site_address_ar", value: "الرياض، المملكة العربية السعودية" },
  { key: "site_address_en", value: "Riyadh, Saudi Arabia" },
  { key: "social_twitter", value: "https://twitter.com/srptiq" },
  { key: "social_linkedin", value: "https://linkedin.com/company/srptiq" },
  { key: "social_instagram", value: "https://instagram.com/srptiq" },
  { key: "social_youtube", value: "https://youtube.com/@srptiq" },
  { key: "meta_title", value: "SRPTIQ - Saudi Tech Enterprise" },
  { key: "meta_desc", value: "Leading Saudi technology company" },
  { key: "meta_keywords", value: "Saudi, technology, SaaS, AI" },
]

export const mockTranslations = [
  { id: "1", key: "hero.title", locale: "ar", value: "نحن نبني أنظمة ذكية للمستقبل" },
  { id: "2", key: "hero.title", locale: "en", value: "We Build Intelligent Systems For The Future" },
  { id: "3", key: "nav.products", locale: "ar", value: "المنتجات" },
  { id: "4", key: "nav.products", locale: "en", value: "Products" },
]

export const mockStats: DashboardStats = {
  totalProducts: 5,
  totalServices: 14,
  totalProjects: 12,
  totalBlogPosts: 8,
  totalMessages: 45,
  totalRequests: 23,
  totalUsers: 3,
  totalFAQ: 6,
}

export async function fetchWithMockFallback<T>(url: string, mockData: T): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error("API not available")
    const json = await res.json()
    return (json.data ?? json) as T
  } catch {
    return mockData
  }
}

export function generateId(): string {
  return uuid()
}
