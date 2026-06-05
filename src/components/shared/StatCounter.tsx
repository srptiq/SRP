"use client"

import { useRef, useState } from "react"
import { type LucideIcon } from "lucide-react"
import {
  motion,
  useInView,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface StatCounterProps {
  value: number
  suffix?: string
  label: string
  icon: LucideIcon
  className?: string
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 80, damping: 30 })
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest))
  })

  if (inView) {
    spring.set(value)
  }

  return <span ref={ref}>{display}</span>
}

export default function StatCounter({
  value,
  suffix = "",
  label,
  icon: Icon,
  className,
}: StatCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center gap-2 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center size-12 rounded-full bg-accent text-blue">
        <Icon className="size-5" />
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl md:text-4xl font-heading font-bold gradient-text">
          <Counter value={value} />
        </span>
        {suffix && (
          <span className="text-lg font-semibold text-blue">+</span>
        )}
      </div>
      <p className="text-sm text-gray-text">{label}</p>
    </motion.div>
  )
}
