"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { getDirection } from "@/lib/utils"

interface CTASectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref = "/request-project",
}: CTASectionProps) {
  const t = useTranslations("cta")
  const locale = useLocale()
  const direction = getDirection(locale)

  return (
    <section dir={direction} className="relative overflow-hidden bg-navy py-20">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-0 mesh-grid" />

      <div className="relative z-10 container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
            {title || t("title")}
          </h2>
          <p className="text-base text-gray-text leading-relaxed">
            {description || t("description")}
          </p>
          <Link href={buttonHref}>
            <Button
              size="lg"
              className="mt-2 bg-blue text-white hover:bg-blue/90 px-8 h-11 text-base"
            >
              {buttonText || t("button")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
