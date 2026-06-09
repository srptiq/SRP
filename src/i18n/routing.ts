import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  // Always prefix the locale (/ar/..., /en/...). The app serves every page
  // under a locale segment and has no middleware to rewrite unprefixed paths,
  // so 'as-needed' would generate links like /contact that resolve to the
  // [locale] route with an invalid locale and 500. 'always' keeps links valid.
  localePrefix: 'always',
})
