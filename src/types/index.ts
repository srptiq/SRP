export interface NavLink {
  label: string
  href: string
}

export interface Service {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  icon: string
  image?: string
  slug: string
  published: boolean
  features: string[]
}

export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  slug: string
  logo?: string
  images: string[]
  features: string[]
  featuresEn: string[]
  problem?: string
  problemEn?: string
  targetAudience?: string
  targetAudienceEn?: string
  howItWorks?: string
  howItWorksEn?: string
  category?: string
  status: string
  published: boolean
}

export interface Project {
  id: string
  name: string
  nameEn: string
  client: string
  clientEn: string
  description: string
  descriptionEn: string
  category: string
  images: string[]
  technologies: string[]
  status: string
  url?: string
  published: boolean
}

export interface BlogPost {
  id: string
  title: string
  titleEn: string
  slug: string
  content: string
  contentEn?: string
  excerpt?: string
  excerptEn?: string
  image?: string
  category?: BlogCategory
  tags: string[]
  author?: string
  published: boolean
  createdAt: string
}

export interface BlogCategory {
  id: string
  name: string
  nameEn: string
  slug: string
}

export interface FAQ {
  id: string
  question: string
  questionEn: string
  answer: string
  answerEn: string
  category?: string
  order: number
  published: boolean
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  product?: string
  read: boolean
  createdAt: string
}

export interface ProjectRequest {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  projectType: string
  budget?: string
  description: string
  attachments: string[]
  read: boolean
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: Role
  image?: string
  active: boolean
}

export interface Role {
  id: string
  name: string
  label: string
  permissions: string[]
}

export interface SiteSetting {
  key: string
  value: string
}

export interface DashboardStats {
  totalProducts: number
  totalProjects: number
  totalServices: number
  totalMessages: number
  totalRequests: number
  totalUsers: number
  totalBlogPosts: number
  totalFAQ: number
}

export type Locale = 'ar' | 'en'
