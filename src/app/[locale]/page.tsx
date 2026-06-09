import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import HeroSection from '@/components/shared/HeroSection'
import ServiceCard from '@/components/shared/ServiceCard'
import ProductCard from '@/components/shared/ProductCard'
import FAQItem from '@/components/shared/FAQItem'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { products as productCatalog } from '@/lib/products-data'
import { Package, Server, Users, Briefcase, Star, ArrowUpLeft, Quote } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    return { title: 'SRPTIQ | Saudi Technology Conglomerate' }
  }
  const t = await getTranslations({ locale, namespace: 'hero' })
  return {
    title: 'SRPTIQ | Saudi Technology Conglomerate',
    description: t('description'),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  // An unprefixed path (e.g. /contact) lands here with the path segment as an
  // invalid "locale". Redirect it to the default-locale-prefixed equivalent
  // (/ar/contact) instead of trying to render with a missing locale.
  if (!hasLocale(routing.locales, locale)) {
    redirect(`/${routing.defaultLocale}/${locale}`)
  }
  const hero = await getTranslations({ locale, namespace: 'hero' })
  const services = await getTranslations({ locale, namespace: 'services' })
  const products = await getTranslations({ locale, namespace: 'products' })
  const whyUs = await getTranslations({ locale, namespace: 'whyUs' })
  const testimonials = await getTranslations({ locale, namespace: 'testimonials' })
  const faq = await getTranslations({ locale, namespace: 'faq' })
  const cta = await getTranslations({ locale, namespace: 'cta' })

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

  const serviceIds = ['saas', 'mobile', 'websites', 'ai']
  const featuredProductSlugs = ['idbbar', 'nasakhti', 'blansia', 'backly', 'madar-x']
  const whyUsIcons = [Package, Server, Users, Briefcase, Star, Package]

  return (
    <>
      <HeroSection
        title={hero('title')}
        description={hero('description')}
        cta1={hero('cta1')}
        cta2={hero('cta2')}
        cta1Href="/products"
        cta2Href="/request-project"
      />

      <section className="relative border-y border-border/40 bg-white py-16">
        <div className="container-max">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsData.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-3xl font-bold gradient-text md:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {services('title')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {services('title')}
            </h2>
            <p className="mt-4 text-muted-foreground">{services('subtitle')}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceIds.map((id, i) => (
              <ServiceCard
                key={id}
                id={id}
                title={services(`items.${i}.title`)}
                description={services(`items.${i}.description`)}
                index={i}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" className="gap-2">
                {locale === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                <ArrowUpLeft className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {products('title')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {products('title')}
            </h2>
            <p className="mt-4 text-muted-foreground">{products('subtitle')}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {featuredProductSlugs.map((slug, i) => (
              <ProductCard
                key={slug}
                name={products(`items.${i}.name`)}
                description={products(`items.${i}.description`)}
                slug={slug}
                logo={productCatalog.find((product) => product.slug === slug)?.logo}
                cta={products(`items.${i}.cta`)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {whyUs('title')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {whyUs('title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => {
              const Icon = whyUsIcons[i]
              return (
                <div key={i} className="group rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-blue/20 hover:shadow-lg hover:shadow-blue/5">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue/10 to-cyan/10 ring-1 ring-blue/20">
                    <Icon className="size-6 text-blue" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {whyUs(`items.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {whyUs(`items.${i}.description`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {testimonials('title')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {testimonials('title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="relative rounded-xl border border-border/60 bg-card p-6">
                <Quote className={`absolute ${locale === 'ar' ? 'top-4 left-4' : 'top-4 right-4'} size-8 text-blue/10`} />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {testimonials(`items.${i}.text`)}
                </p>
                <div className="mt-4 border-t border-border/40 pt-4">
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {testimonials(`items.${i}.name`)}
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonials(`items.${i}.role`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <span className="gradient-brand mb-4 inline-block rounded-full px-4 py-1 text-xs font-medium text-white">
              {faq('title')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {faq('title')}
            </h2>
          </div>

          <div className="mt-12 mx-auto max-w-3xl space-y-3">
            {Array.from({ length: 4 }, (_, i) => (
              <FAQItem
                key={i}
                question={faq(`items.${i}.question`)}
                answer={faq(`items.${i}.answer`)}
                defaultOpen={i === 0}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/faq">
              <Button variant="outline" className="gap-2">
                {locale === 'ar' ? 'عرض جميع الأسئلة' : 'View All FAQs'}
                <ArrowUpLeft className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/40 bg-navy py-24">
        <div className="mesh-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-max relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {cta('title')}
            </h2>
            <p className="mt-4 text-gray-text">
              {cta('description')}
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="gradient-brand h-11 border-0 px-6 text-white hover:opacity-90">
                  {cta('button')}
                  <ArrowUpLeft className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
