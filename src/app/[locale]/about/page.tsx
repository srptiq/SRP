import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Package, Lightbulb, Shield, Handshake, TrendingUp } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowUpLeft } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('title'), description: t('description') }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const cta = await getTranslations({ locale, namespace: 'cta' })

  const valueIcons = [Package, Lightbulb, Shield, Handshake, TrendingUp]

  const statsData = locale === 'ar'
    ? [
        { value: '5+', label: 'منتج رقمي' },
        { value: '120+', label: 'عميل' },
        { value: '45+', label: 'نظام سحابي' },
        { value: '200+', label: 'مشروع' },
      ]
    : [
        { value: '5+', label: 'Digital Products' },
        { value: '120+', label: 'Clients & Partners' },
        { value: '45+', label: 'Cloud Systems' },
        { value: '200+', label: 'Completed Projects' },
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
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-max">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">{t('description')}</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <span className="gradient-brand mb-4 inline-block rounded-lg px-3 py-1 text-xs font-medium text-white">
                {locale === 'ar' ? 'الرؤية' : 'Vision'}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('vision')}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <span className="gradient-brand mb-4 inline-block rounded-lg px-3 py-1 text-xs font-medium text-white">
                {locale === 'ar' ? 'الرسالة' : 'Mission'}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('mission')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-max">
          <h2 className="font-heading text-3xl font-bold text-center text-foreground md:text-4xl">
            {locale === 'ar' ? 'قيمنا' : 'Our Values'}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={i} className="group rounded-xl border border-border/60 bg-background p-6 text-center transition-all duration-300 hover:border-blue/20 hover:shadow-lg hover:shadow-blue/5">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                    <Icon className="size-6 text-blue" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{t(`values.${i}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`values.${i}.description`)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-white py-16">
        <div className="container-max">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsData.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-3xl font-bold gradient-text md:text-4xl">{stat.value}</div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {t('teamTitle')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {t('teamTitle')}
            </h2>
            <p className="mt-4 text-muted-foreground">{t('teamDescription')}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="group rounded-xl border border-border/60 bg-card p-6 text-center transition-all duration-300 hover:border-blue/20 hover:shadow-lg hover:shadow-blue/5">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-blue/10 to-cyan/10 ring-2 ring-blue/20">
                  <span className="font-heading text-xl font-bold text-blue">
                    {t(`team.${i}.name`).charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{t(`team.${i}.name`)}</h3>
                <p className="mt-1 text-xs font-medium text-blue">{t(`team.${i}.role`)}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t(`team.${i}.bio`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-max text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{cta('title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-text">{cta('description')}</p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="gradient-brand h-11 border-0 px-6 text-white hover:opacity-90">
                {cta('button')}
                <ArrowUpLeft className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
