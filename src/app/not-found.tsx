import NotFoundView from "@/components/shared/NotFoundView"

export default function RootNotFound() {
  return (
    <NotFoundView
      title="الصفحة غير موجودة"
      description="عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
      backHomeLabel="العودة للرئيسية"
      homeHref="/"
      isRtl
    />
  )
}
