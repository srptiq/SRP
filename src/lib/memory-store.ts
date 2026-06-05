import bcrypt from 'bcryptjs'

interface StoredUser {
  id: string; email: string; password: string; name: string; roleId: string
  image: string | null; active: boolean; createdAt: Date; updatedAt: Date
}
interface StoredRole {
  id: string; name: string; label: string; permissions: string[]
  createdAt: Date; updatedAt: Date
}
interface StoredService {
  id: string; title: string; titleEn: string; description: string; descriptionEn: string
  icon: string | null; image: string | null; slug: string; published: boolean
  features: string[]; createdAt: Date; updatedAt: Date
}
interface StoredProduct {
  id: string; name: string; nameEn: string; description: string; descriptionEn: string
  slug: string; logo: string | null; images: string[]; features: string[]; featuresEn: string[]
  problem: string | null; problemEn: string | null; targetAudience: string | null
  targetAudienceEn: string | null; howItWorks: string | null; howItWorksEn: string | null
  category: string | null; status: string; published: boolean; createdAt: Date; updatedAt: Date
}
interface StoredProject {
  id: string; name: string; nameEn: string; client: string; clientEn: string
  description: string; descriptionEn: string; category: string; images: string[]
  technologies: string[]; status: string; url: string | null; published: boolean
  createdAt: Date; updatedAt: Date
}
interface StoredBlogPost {
  id: string; title: string; titleEn: string; slug: string; content: string
  contentEn: string | null; excerpt: string | null; excerptEn: string | null; image: string | null
  categoryId: string | null; tags: string[]; author: string | null; published: boolean
  metaTitle: string | null; metaDesc: string | null; createdAt: Date; updatedAt: Date
}
interface StoredFAQ {
  id: string; question: string; questionEn: string; answer: string; answerEn: string
  category: string | null; order: number; published: boolean; createdAt: Date; updatedAt: Date
}
interface StoredContactMessage {
  id: string; name: string; email: string; phone: string | null; subject: string | null
  message: string; product: string | null; read: boolean; createdAt: Date; updatedAt: Date
}
interface StoredProjectRequest {
  id: string; company: string; contactName: string; email: string; phone: string
  projectType: string; budget: string | null; description: string; attachments: string[]
  read: boolean; createdAt: Date; updatedAt: Date
}
interface StoredSiteSetting {
  id: string; key: string; value: string
}
interface StoredTranslation {
  id: string; key: string; locale: string; value: string; createdAt: Date; updatedAt: Date
}

function now() { return new Date() }

let c = 0
function id(): string {
  c++
  return `mem_${c}_${Date.now()}`
}

class MemoryStore {
  users: StoredUser[] = []
  roles: StoredRole[] = []
  services: StoredService[] = []
  products: StoredProduct[] = []
  projects: StoredProject[] = []
  blogPosts: StoredBlogPost[] = []
  faqs: StoredFAQ[] = []
  contactMessages: StoredContactMessage[] = []
  projectRequests: StoredProjectRequest[] = []
  siteSettings: StoredSiteSetting[] = []
  translations: StoredTranslation[] = []
  seeded = false

  async ensureSeed() {
    if (this.seeded) return
    this.seeded = true
    const adminRoleId = id()
    this.roles.push({ id: adminRoleId, name: 'admin', label: 'Admin', permissions: ['all'], createdAt: now(), updatedAt: now() })
    const userRoleId = id()
    this.roles.push({ id: userRoleId, name: 'user', label: 'User', permissions: ['read'], createdAt: now(), updatedAt: now() })
    this.users.push({
      id: id(), email: 'admin@srptiq.com', password: bcrypt.hashSync('admin123', 12),
      name: 'Admin', roleId: adminRoleId, image: null, active: true, createdAt: now(), updatedAt: now(),
    })
  }

  async findUserByEmail(email: string) {
    await this.ensureSeed()
    const u = this.users.find(u => u.email === email)
    if (!u) return null
    const role = this.roles.find(r => r.id === u.roleId)
    return { ...u, role: role || null }
  }

  async findUserById(id: string) {
    await this.ensureSeed()
    const u = this.users.find(u => u.id === id)
    if (!u) return null
    const role = this.roles.find(r => r.id === u.roleId)
    return { ...u, role: role || null }
  }

  async createUser(data: { name: string; email: string; password: string }) {
    await this.ensureSeed()
    const userRole = this.roles.find(r => r.name === 'user')!
    const user: StoredUser = { id: id(), ...data, roleId: userRole.id, image: null, active: true, createdAt: now(), updatedAt: now() }
    this.users.push(user)
    return { ...user, role: userRole }
  }

  async updateUser(id: string, data: Partial<Omit<StoredUser, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed()
    const idx = this.users.findIndex(u => u.id === id)
    if (idx === -1) return null
    this.users[idx] = { ...this.users[idx], ...data, updatedAt: now() }
    const role = this.roles.find(r => r.id === this.users[idx].roleId)
    return { ...this.users[idx], role: role || null }
  }

  async deleteUser(id: string) {
    await this.ensureSeed()
    const idx = this.users.findIndex(u => u.id === id)
    if (idx === -1) return null
    const [del] = this.users.splice(idx, 1)
    const role = this.roles.find(r => r.id === del.roleId)
    return { ...del, role: role || null }
  }

  async getUsers() {
    await this.ensureSeed()
    return this.users.map(u => { const r = this.roles.find(role => role.id === u.roleId); return { ...u, role: r || null } })
  }

  async getServices() { await this.ensureSeed(); return [...this.services] }
  async createService(data: Omit<StoredService, 'id' | 'createdAt' | 'updatedAt'>) {
    await this.ensureSeed(); const s: StoredService = { id: id(), ...data, createdAt: now(), updatedAt: now() }; this.services.push(s); return s
  }
  async updateService(id: string, data: Partial<Omit<StoredService, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.services.findIndex(s => s.id === id); if (i === -1) return null
    this.services[i] = { ...this.services[i], ...data, updatedAt: now() }; return this.services[i]
  }
  async deleteService(id: string) {
    await this.ensureSeed(); const i = this.services.findIndex(s => s.id === id); if (i === -1) return null
    return this.services.splice(i, 1)[0]
  }

  async getProducts() { await this.ensureSeed(); return [...this.products] }
  async createProduct(data: Omit<StoredProduct, 'id' | 'createdAt' | 'updatedAt'>) {
    await this.ensureSeed(); const p: StoredProduct = { id: id(), ...data, createdAt: now(), updatedAt: now() }; this.products.push(p); return p
  }
  async updateProduct(id: string, data: Partial<Omit<StoredProduct, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.products.findIndex(p => p.id === id); if (i === -1) return null
    this.products[i] = { ...this.products[i], ...data, updatedAt: now() }; return this.products[i]
  }
  async deleteProduct(id: string) {
    await this.ensureSeed(); const i = this.products.findIndex(p => p.id === id); if (i === -1) return null
    return this.products.splice(i, 1)[0]
  }

  async getProjects() { await this.ensureSeed(); return [...this.projects] }
  async createProject(data: Omit<StoredProject, 'id' | 'createdAt' | 'updatedAt'>) {
    await this.ensureSeed(); const p: StoredProject = { id: id(), ...data, createdAt: now(), updatedAt: now() }; this.projects.push(p); return p
  }
  async updateProject(id: string, data: Partial<Omit<StoredProject, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.projects.findIndex(p => p.id === id); if (i === -1) return null
    this.projects[i] = { ...this.projects[i], ...data, updatedAt: now() }; return this.projects[i]
  }
  async deleteProject(id: string) {
    await this.ensureSeed(); const i = this.projects.findIndex(p => p.id === id); if (i === -1) return null
    return this.projects.splice(i, 1)[0]
  }

  async getBlogPosts() { await this.ensureSeed(); return [...this.blogPosts] }
  async createBlogPost(data: Omit<StoredBlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
    await this.ensureSeed(); const p: StoredBlogPost = { id: id(), ...data, createdAt: now(), updatedAt: now() }; this.blogPosts.push(p); return p
  }
  async updateBlogPost(id: string, data: Partial<Omit<StoredBlogPost, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.blogPosts.findIndex(p => p.id === id); if (i === -1) return null
    this.blogPosts[i] = { ...this.blogPosts[i], ...data, updatedAt: now() }; return this.blogPosts[i]
  }
  async deleteBlogPost(id: string) {
    await this.ensureSeed(); const i = this.blogPosts.findIndex(p => p.id === id); if (i === -1) return null
    return this.blogPosts.splice(i, 1)[0]
  }

  async getFAQs() { await this.ensureSeed(); return [...this.faqs] }
  async createFAQ(data: Omit<StoredFAQ, 'id' | 'createdAt' | 'updatedAt'>) {
    await this.ensureSeed(); const f: StoredFAQ = { id: id(), ...data, createdAt: now(), updatedAt: now() }; this.faqs.push(f); return f
  }
  async updateFAQ(id: string, data: Partial<Omit<StoredFAQ, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.faqs.findIndex(f => f.id === id); if (i === -1) return null
    this.faqs[i] = { ...this.faqs[i], ...data, updatedAt: now() }; return this.faqs[i]
  }
  async deleteFAQ(id: string) {
    await this.ensureSeed(); const i = this.faqs.findIndex(f => f.id === id); if (i === -1) return null
    return this.faqs.splice(i, 1)[0]
  }

  async getContactMessages() { await this.ensureSeed(); return [...this.contactMessages] }
  async createContactMessage(data: Omit<StoredContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'read'>) {
    await this.ensureSeed(); const m: StoredContactMessage = { id: id(), ...data, read: false, createdAt: now(), updatedAt: now() }; this.contactMessages.push(m); return m
  }
  async updateContactMessage(id: string, data: Partial<Omit<StoredContactMessage, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.contactMessages.findIndex(m => m.id === id); if (i === -1) return null
    this.contactMessages[i] = { ...this.contactMessages[i], ...data, updatedAt: now() }; return this.contactMessages[i]
  }
  async deleteContactMessage(id: string) {
    await this.ensureSeed(); const i = this.contactMessages.findIndex(m => m.id === id); if (i === -1) return null
    return this.contactMessages.splice(i, 1)[0]
  }

  async getProjectRequests() { await this.ensureSeed(); return [...this.projectRequests] }
  async createProjectRequest(data: Omit<StoredProjectRequest, 'id' | 'createdAt' | 'updatedAt' | 'read'>) {
    await this.ensureSeed(); const r: StoredProjectRequest = { id: id(), ...data, read: false, createdAt: now(), updatedAt: now() }; this.projectRequests.push(r); return r
  }
  async updateProjectRequest(id: string, data: Partial<Omit<StoredProjectRequest, 'id' | 'createdAt' | 'updatedAt'>>) {
    await this.ensureSeed(); const i = this.projectRequests.findIndex(r => r.id === id); if (i === -1) return null
    this.projectRequests[i] = { ...this.projectRequests[i], ...data, updatedAt: now() }; return this.projectRequests[i]
  }
  async deleteProjectRequest(id: string) {
    await this.ensureSeed(); const i = this.projectRequests.findIndex(r => r.id === id); if (i === -1) return null
    return this.projectRequests.splice(i, 1)[0]
  }

  async getSiteSettings() { await this.ensureSeed(); return [...this.siteSettings] }
  async upsertSiteSetting(key: string, value: string) {
    await this.ensureSeed(); const i = this.siteSettings.findIndex(s => s.key === key)
    if (i === -1) { const s: StoredSiteSetting = { id: id(), key, value }; this.siteSettings.push(s); return s }
    this.siteSettings[i] = { ...this.siteSettings[i], value }; return this.siteSettings[i]
  }

  async getTranslations() { await this.ensureSeed(); return [...this.translations] }
  async upsertTranslation(key: string, locale: string, value: string) {
    await this.ensureSeed(); const i = this.translations.findIndex(t => t.key === key && t.locale === locale)
    if (i === -1) { const t: StoredTranslation = { id: id(), key, locale, value, createdAt: now(), updatedAt: now() }; this.translations.push(t); return t }
    this.translations[i] = { ...this.translations[i], value, updatedAt: now() }; return this.translations[i]
  }
  async deleteTranslation(id: string) {
    await this.ensureSeed(); const i = this.translations.findIndex(t => t.id === id); if (i === -1) return null
    return this.translations.splice(i, 1)[0]
  }
}

export const memoryStore = new MemoryStore()
