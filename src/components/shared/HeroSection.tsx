"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Sparkles, Shield, Zap } from "lucide-react"
import { cn, getDirection } from "@/lib/utils"

interface HeroSectionProps {
  title?: string
  description?: string
  cta1?: string
  cta2?: string
  cta1Href?: string
  cta2Href?: string
  showImage?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

const floatingElements = [
  { Icon: Sparkles, className: "top-8 left-8 text-blue/30" },
  { Icon: Shield, className: "bottom-12 right-8 text-cyan/30" },
  { Icon: Zap, className: "top-1/2 -right-4 text-blue/20" },
]

export default function HeroSection({
  title,
  description,
  cta1,
  cta2,
  cta1Href = "/products",
  cta2Href = "/request-project",
  showImage = true,
}: HeroSectionProps) {
  const t = useTranslations("hero")
  const locale = useLocale()
  const direction = getDirection(locale)
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight

  return (
    <section
      dir={direction}
      className="relative overflow-hidden bg-soft-gray pb-20 pt-24 md:pt-32"
    >
      <div className="absolute inset-0 mesh-grid" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "flex flex-col gap-12",
            showImage
              ? "lg:flex-row lg:items-center lg:justify-between"
              : "items-center text-center"
          )}
        >
          <motion.div
            variants={itemVariants}
            className={cn(
              "flex flex-col gap-6 max-w-2xl",
              !showImage && "items-center"
            )}
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-navy leading-[1.1] tracking-tight"
            >
              <span className="gradient-text">{title || t("title")}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-text leading-relaxed max-w-lg"
            >
              {description || t("description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link href={cta1Href}>
                <Button
                  size="lg"
                  className="bg-blue text-white hover:bg-blue/90 h-11 px-6 text-sm"
                >
                  {cta1 || t("cta1")}
                  <Arrow className="size-4" />
                </Button>
              </Link>
              <Link href={cta2Href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 px-6 text-sm"
                >
                  {cta2 || t("cta2")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {showImage && (
            <motion.div
              variants={itemVariants}
              className="relative hidden lg:flex items-center justify-center w-full max-w-md"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue/20 to-cyan/20 blur-3xl" />
                <div className="glass-card relative z-10 flex h-full w-full items-center justify-center rounded-2xl">
                  <span className="text-5xl font-heading font-bold gradient-text">
                    SRPTIQ
                  </span>
                </div>
                {floatingElements.map(({ Icon, className }) => (
                  <div
                    key={className}
                    className={cn(
                      "absolute flex size-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border-light",
                      className
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
