'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowUpLeft } from 'lucide-react'

interface ProductCardProps {
  name: string
  description: string
  slug: string
  logo?: string
  cta: string
  index?: number
}

export default function ProductCard({ name, description, slug, logo, cta, index = 0 }: ProductCardProps) {
  const products: Record<string, { gradient: string }> = {
    idbbar: { gradient: 'from-blue-600 to-blue-800' },
    nasakhti: { gradient: 'from-emerald-500 to-teal-600' },
    blansia: { gradient: 'from-rose-400 to-pink-600' },
    backly: { gradient: 'from-amber-500 to-orange-600' },
    'madar-x': { gradient: 'from-violet-500 to-purple-700' },
  }

  const product = products[slug] || { gradient: 'from-blue to-cyan' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/products/${slug}`}>
        <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-blue/20 hover:shadow-lg hover:shadow-blue/5">
          <div className={`absolute top-0 right-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br ${product.gradient} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`} />

          <div className="relative z-10">
            <div className="mb-5 rounded-2xl border border-border/60 bg-white/95 p-4 shadow-sm">
              <div className="flex h-16 items-center justify-center">
                {logo ? (
                  <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={180}
                    height={64}
                    className="max-h-14 max-w-full w-auto object-contain"
                  />
                ) : (
                  <div className={`inline-flex rounded-lg bg-gradient-to-br ${product.gradient} px-4 py-2`}>
                    <span className="font-heading text-lg font-bold text-white">{name}</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="font-heading text-lg font-semibold text-foreground">{name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

            <div className="mt-4">
              <Button variant="ghost" size="sm" className="gap-1 p-0 text-blue hover:text-blue/80 hover:bg-transparent">
                {cta}
                <ArrowUpLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
