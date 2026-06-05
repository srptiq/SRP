export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-4 border-blue/20 border-t-blue" />
        <p className="text-sm text-muted-foreground animate-pulse">جاري التحميل</p>
      </div>
    </div>
  )
}