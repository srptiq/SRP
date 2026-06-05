'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getDirection } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const dir = getDirection(locale)

  const products = [
    { name: 'إضبار', nameEn: 'Idbbar', href: '/products/idbbar' },
    { name: 'نسختي', nameEn: 'Nasakhti', href: '/products/nasakhti' },
    { name: 'بلنسيا', nameEn: 'Blansia', href: '/products/blansia' },
    { name: 'باكلي', nameEn: 'Backly', href: '/products/backly' },
    { name: 'مدار X', nameEn: 'Madar X', href: '/products/madar-x' },
  ] as const

  return (
    <footer className="border-t border-border/40 bg-navy text-white" dir={dir}>
      <div className="container-max py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <span className="gradient-brand inline-block rounded-lg px-3 py-1.5 text-sm font-bold text-white">
              SRPTIQ
            </span>
            <p className="text-sm leading-relaxed text-gray-text">
              {t('description')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold tracking-wide uppercase text-white">
              {t('products')}
            </h3>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-gray-text transition-colors hover:text-white">
                    {locale === 'ar' ? p.name : p.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold tracking-wide uppercase text-white">
              {t('company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-text transition-colors hover:text-white">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-text transition-colors hover:text-white">
                  {nav('services')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-text transition-colors hover:text-white">
                  {nav('contact')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-text transition-colors hover:text-white">
                  {nav('careers')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold tracking-wide uppercase text-white">
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-text">
                <Mail className="size-4 shrink-0 text-blue" />
                info@srptiq.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-text">
                <Phone className="size-4 shrink-0 text-blue" />
                +966 55 000 0000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-text">
                <MapPin className="size-4 shrink-0 text-blue" />
                {locale === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a href="https://twitter.com/srptiq" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-gray-text transition-colors hover:bg-blue/20 hover:text-white" aria-label="Twitter / X">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/srptiq" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-gray-text transition-colors hover:bg-blue/20 hover:text-white" aria-label="LinkedIn">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com/srptiq" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-gray-text transition-colors hover:bg-blue/20 hover:text-white" aria-label="Instagram">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://youtube.com/@srptiq" target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-gray-text transition-colors hover:bg-blue/20 hover:text-white" aria-label="YouTube">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-6 md:flex-row">
          <p className="text-xs text-gray-text">{t('rights')}</p>
          <div className="flex gap-4 text-xs text-gray-text">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
