import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ServiceCard from '@/components/shared/ServiceCard'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowUpLeft } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return { title: t('title'), description: t('subtitle') }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const cta = await getTranslations({ locale, namespace: 'cta' })

  const serviceIds = ['saas', 'mobile', 'websites', 'ai', 'automation', 'uxui', 'dashboards', 'crm', 'hr', 'cloud', 'payments', 'notifications', 'transformation', 'mvp']

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mesh-grid pointer-events-none absolute inset-0" />
        <div className="container-max relative z-10 text-center">
          <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
            {t('title')}
          </span>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-max">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceIds.map((id, i) => (
              <ServiceCard
                key={id}
                id={id}
                title={t(`items.${i}.title`)}
                description={t(`items.${i}.description`)}
                index={i}
                variant="large"
              />
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
