"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  className?: string
}

export default function TestimonialCard({
  content,
  author,
  role,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-xl bg-card p-6 ring-1 ring-border-light",
        className
      )}
    >
      <Quote className="size-8 text-blue/20 absolute top-4 left-4" />
      <div className="relative z-10">
        <p className="text-sm text-gray-text leading-relaxed mb-6">
          {content}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-accent text-blue font-semibold text-sm">
            {author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">{author}</p>
            <p className="text-xs text-gray-text">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
