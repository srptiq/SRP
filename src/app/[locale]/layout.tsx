import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import LocaleFrame from '@/components/layout/LocaleFrame'
import { routing } from '@/i18n/routing'
import arMessages from '../../../messages/ar.json'
import enMessages from '../../../messages/en.json'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const localeMessages = {
  ar: arMessages,
  en: enMessages,
} as const

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const description = localeMessages[locale].hero.description

  return {
    title: {
      default: 'SRPTIQ | Saudi Technology Conglomerate',
      template: '%s | SRPTIQ',
    },
    description,
    openGraph: {
      title: 'SRPTIQ',
      description,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = localeMessages[locale]

  return (
    <div>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LocaleFrame>{children}</LocaleFrame>
      </NextIntlClientProvider>
    </div>
  )
}
