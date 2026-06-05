import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-2xl",
        centered && "items-center text-center mx-auto",
        className
      )}
    >
      {badge && (
        <span className="inline-flex w-fit rounded-full border border-blue/20 bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base text-gray-text leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  )
}
