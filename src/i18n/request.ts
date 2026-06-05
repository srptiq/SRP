import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import arMessages from '../../messages/ar.json'
import enMessages from '../../messages/en.json'

const localeMessages = {
  ar: arMessages,
  en: enMessages,
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'ar' | 'en')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: localeMessages[locale as keyof typeof localeMessages],
  }
})
