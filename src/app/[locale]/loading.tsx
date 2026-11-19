import { useLocale } from "next-intl"

export default function Loading() {
  const ar = useLocale() === "ar"

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white px-8 py-6">
        <div aria-hidden="true" className="size-9 animate-spin rounded-full border-4 border-blue/20 border-t-blue motion-reduce:animate-none" />
        <span className="text-sm text-muted-foreground">{ar ? "جارٍ التحميل" : "Loading"}</span>
      </div>
    </div>
  )
}
