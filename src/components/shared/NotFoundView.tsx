import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type NotFoundViewProps = {
  title: string
  description: string
  backHomeLabel: string
  homeHref: string
  isRtl?: boolean
}

export default function NotFoundView({
  title,
  description,
  backHomeLabel,
  homeHref,
  isRtl = false,
}: NotFoundViewProps) {
  return (
    <div className="min-h-screen bg-soft-gray" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mesh-grid pointer-events-none absolute inset-0" />
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-white p-10 text-center shadow-sm">
            <span className="gradient-brand inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              404
            </span>
            <h1 className="mt-6 font-heading text-3xl font-bold text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
            <div className="mt-8">
              <Link
                href={homeHref}
                className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <ArrowLeft className={cn("size-4", !isRtl && "rotate-180")} />
                {backHomeLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
