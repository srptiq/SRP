'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Cloud,
  Smartphone,
  Globe,
  BrainCircuit,
  Bot,
  Palette,
  LayoutDashboard,
  Users,
  Building2,
  Server,
  CreditCard,
  Bell,
  ArrowRightLeft,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  saas: Cloud,
  mobile: Smartphone,
  websites: Globe,
  ai: BrainCircuit,
  automation: Bot,
  uxui: Palette,
  dashboards: LayoutDashboard,
  crm: Users,
  hr: Building2,
  cloud: Server,
  payments: CreditCard,
  notifications: Bell,
  transformation: ArrowRightLeft,
  mvp: Rocket,
}

interface ServiceCardProps {
  id: string
  title: string
  description: string
  index?: number
  variant?: 'default' | 'large'
}

export default function ServiceCard({ id, title, description, index = 0, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[id] || Cloud

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-blue/20 hover:shadow-lg hover:shadow-blue/5',
        variant === 'large' && 'p-8'
      )}
    >
      <div className="mesh-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
          <Icon className="size-6 text-blue" />
        </div>

        <h3 className={cn(
          'font-heading font-semibold text-foreground',
          variant === 'large' ? 'text-lg' : 'text-base'
        )}>
          {title}
        </h3>

        <p className={cn(
          'mt-2 text-muted-foreground leading-relaxed',
          variant === 'large' ? 'text-sm' : 'text-sm'
        )}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
