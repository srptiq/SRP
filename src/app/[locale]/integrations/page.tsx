import ContactForm from '@/components/shared/ContactForm'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('integrationsTitle'), description: t('integrationsDescription') }
}


export default function Page() {
  return <ContactForm topic="integration" />
}
