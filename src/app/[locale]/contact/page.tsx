'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { getDirection } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(1),
  message: z.string().min(10),
  product: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const locale = useLocale()
  const dir = getDirection(locale)
  const t = useTranslations('contact')
  const errorsT = useTranslations('errors')
  const [submitting, setSubmitting] = useState(false)
  const productOptions = [
    { value: 'idbbar', label: locale === 'ar' ? 'إضبار' : 'Idbbar' },
    { value: 'nasakhti', label: locale === 'ar' ? 'نسختي' : 'Nasakhti' },
    { value: 'blansia', label: locale === 'ar' ? 'بلنسيا' : 'Blansia' },
    { value: 'backly', label: locale === 'ar' ? 'باكلي' : 'Backly' },
    { value: 'madar-x', label: locale === 'ar' ? 'مدار X' : 'Madar X' },
  ]

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', product: '' },
  })

  async function onSubmit(data: ContactFormData) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
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
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" {...register('email')} />
                    {errors.email && <p className="text-xs text-destructive">{errorsT('email')}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input id="phone" type="tel" {...register('phone')} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('subject')}</Label>
                    <Select onValueChange={(v) => setValue('subject', (v ?? '') as string)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('subject')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{locale === 'ar' ? 'استفسار عام' : 'General Inquiry'}</SelectItem>
                        <SelectItem value="project">{locale === 'ar' ? 'مشروع جديد' : 'New Project'}</SelectItem>
                        <SelectItem value="partnership">{locale === 'ar' ? 'شراكة' : 'Partnership'}</SelectItem>
                        <SelectItem value="support">{locale === 'ar' ? 'دعم فني' : 'Technical Support'}</SelectItem>
                        <SelectItem value="other">{locale === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-xs text-destructive">{errorsT('required')}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المنتج المهتم به' : 'Interested Product'}</Label>
                  <Select onValueChange={(v) => setValue('product', (v ?? '') as string)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={locale === 'ar' ? 'اختر منتجاً' : 'Select a product'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{locale === 'ar' ? 'لا يوجد' : 'None'}</SelectItem>
                      {productOptions.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea id="message" rows={5} {...register('message')} />
                  {errors.message && <p className="text-xs text-destructive">{locale === 'ar' ? 'يجب أن تكون الرسالة 10 أحرف على الأقل' : 'Message must be at least 10 characters'}</p>}
                </div>

                <Button type="submit" disabled={submitting} className="gap-2 gradient-brand text-white border-0 hover:opacity-90">
                  <Send className="size-4" />
                  {t('send')}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border/60 bg-card p-8">
                <h3 className="font-heading text-lg font-semibold text-foreground">{locale === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
                <ul className="mt-6 space-y-5" dir={dir}>
                  <li className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                      <Mail className="size-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                      <p className="text-sm font-medium text-foreground">info@srptiq.com</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                      <Phone className="size-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{locale === 'ar' ? 'رقم الجوال' : 'Phone'}</p>
                      <p className="text-sm font-medium text-foreground">+966 55 000 0000</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                      <MapPin className="size-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{locale === 'ar' ? 'العنوان' : 'Address'}</p>
                      <p className="text-sm font-medium text-foreground">{t('address')}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                      <Clock className="size-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{locale === 'ar' ? 'ساعات العمل' : 'Working Hours'}</p>
                      <p className="text-sm font-medium text-foreground">{locale === 'ar' ? 'الأحد - الخميس، ٩ صباحاً - ٦ مساءً' : 'Sun - Thu, 9:00 AM - 6:00 PM'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
