'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send } from 'lucide-react'
import { useState } from 'react'

const requestSchema = z.object({
  company: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  projectType: z.string().min(1),
  budget: z.string().optional(),
  description: z.string().min(20),
})

type RequestFormData = z.infer<typeof requestSchema>

export default function RequestProjectPage() {
  const locale = useLocale()
  const t = useTranslations('requestProject')
  const errorsT = useTranslations('errors')
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { company: '', contactName: '', email: '', phone: '', projectType: '', budget: '', description: '' },
  })

  async function onSubmit(data: RequestFormData) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(t('success'))
      reset()
    } catch {
      toast.error(errorsT('serverError'))
    } finally {
      setSubmitting(false)
    }
  }

  const projectTypes = [
    { value: 'saas', label: locale === 'ar' ? 'تطوير البرمجيات كخدمة' : 'SaaS Development' },
    { value: 'mobile', label: locale === 'ar' ? 'تطبيق جوال' : 'Mobile App' },
    { value: 'website', label: locale === 'ar' ? 'موقع إلكتروني' : 'Website' },
    { value: 'ai', label: locale === 'ar' ? 'ذكاء اصطناعي وتعلم آلي' : 'AI/ML' },
    { value: 'automation', label: locale === 'ar' ? 'أتمتة' : 'Automation' },
    { value: 'dashboard', label: locale === 'ar' ? 'لوحة تحكم' : 'Dashboard' },
    { value: 'uxui', label: locale === 'ar' ? 'تصميم تجربة وواجهة المستخدم' : 'UX/UI Design' },
    { value: 'other', label: locale === 'ar' ? 'أخرى' : 'Other' },
  ]

  const budgetRanges = [
    { value: '10k-30k', label: locale === 'ar' ? '10,000 - 30,000 ر.س' : '10,000 - 30,000 SAR' },
    { value: '30k-60k', label: locale === 'ar' ? '30,000 - 60,000 ر.س' : '30,000 - 60,000 SAR' },
    { value: '60k-100k', label: locale === 'ar' ? '60,000 - 100,000 ر.س' : '60,000 - 100,000 SAR' },
    { value: '100k-200k', label: locale === 'ar' ? '100,000 - 200,000 ر.س' : '100,000 - 200,000 SAR' },
    { value: '200k+', label: locale === 'ar' ? '200,000+ ر.س' : '200,000+ SAR' },
    { value: 'not-sure', label: locale === 'ar' ? 'غير محدد' : 'Not Sure' },
  ]

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mesh-grid pointer-events-none absolute inset-0" />
        <div className="container-max relative z-10 text-center">
          <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
            {t('title')}
          </span>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('description')}</p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">{t('company')}</Label>
                  <Input id="company" {...register('company')} />
                  {errors.company && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">{t('contactName')}</Label>
                  <Input id="contactName" {...register('contactName')} />
                  {errors.contactName && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && <p className="text-xs text-destructive">{errorsT('email')}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input id="phone" type="tel" {...register('phone')} />
                  {errors.phone && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t('projectType')}</Label>
                  <Select onValueChange={(v) => setValue('projectType', (v ?? '') as string)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('projectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((pt) => (
                        <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectType && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                </div>
                <div className="space-y-2">
                  <Label>{t('budget')}</Label>
                  <Select onValueChange={(v) => setValue('budget', (v ?? '') as string)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('budget')} />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((br) => (
                        <SelectItem key={br.value} value={br.value}>{br.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('descriptionField')}</Label>
                <Textarea id="description" rows={6} {...register('description')} />
                {errors.description && <p className="text-xs text-destructive">{errorsT('minLength')}</p>}
              </div>

              <Button type="submit" disabled={submitting} className="gap-2 gradient-brand text-white border-0 hover:opacity-90">
                <Send className="size-4" />
                {t('submit')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
