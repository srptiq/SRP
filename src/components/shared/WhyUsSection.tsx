"use client"

import { type LucideIcon } from "lucide-react"
import {
  Award,
  Cpu,
  Expand,
  Zap,
  Brain,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import SectionHeader from "@/components/shared/SectionHeader"
import { getDirection } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  quality: Award,
  technology: Cpu,
  scalability: Expand,
  speed: Zap,
  intelligence: Brain,
  "growth-ready": TrendingUp,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

interface WhyUsItem {
  title: string
  description: string
}

interface WhyUsSectionProps {
  items?: WhyUsItem[]
}

export default function WhyUsSection({ items }: WhyUsSectionProps) {
  const t = useTranslations("whyUs")
  const locale = useLocale()
  const direction = getDirection(locale)

  const whyUsItems: WhyUsItem[] =
    items || (t.raw("items") as WhyUsItem[])

  return (
    <section dir={direction} className="py-20 bg-soft-gray">
      <div className="container-max">
        <SectionHeader
          centered
          title={t("title")}
          className="mb-12"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyUsItems.map((item, i) => {
            const keys = ["quality", "technology", "scalability", "speed", "intelligence", "growth-ready"]
            const IconComponent = iconMap[keys[i]] || Award
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group rounded-xl bg-card p-6 ring-1 ring-border-light transition-shadow duration-300 hover:shadow-lg hover:shadow-blue/5"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-accent text-blue group-hover:gradient-brand group-hover:text-white transition-all duration-300">
                  <IconComponent className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-heading font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-text leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
