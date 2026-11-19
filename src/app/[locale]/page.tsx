import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { ArrowDown, ArrowUpRight, Building2, Headphones, Layers3, Plug2, Scale } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getPublicProducts } from '@/lib/products-db'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: locale === 'ar' ? 'سرب تيك | أوس ومدار إكس' : 'SRPTIQ | OUS & Madar X' },
    description: locale === 'ar'
      ? 'سرب تيك تجمع أوس لمواقع مكاتب المحاماة وإدارة أعمالها، ومدار إكس لتصميم وتنفيذ الواجهات واللوحات.'
      : 'SRPTIQ brings together OUS for law firm websites and practice management, and Madar X for façades and signage.',
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) redirect(`/${routing.defaultLocale}/${locale}`)
  const ar = locale === 'ar'
  const products = await getPublicProducts()
  const featured = [...products].sort((left, right) => Number(right.slug === 'ous') - Number(left.slug === 'ous'))

  return (
    <div className="srp-home">
      <section className="srp-hero">
        <div className="srp-wrap srp-hero-layout">
          <div>
            <p className="srp-brandline">{ar ? 'سرب تيك' : 'SRPTIQ'}</p>
            <h1>{ar ? <>أعمالك الرقمية.<br /><em>وحضورك على الأرض.</em></> : <>Your digital operations.<br /><em>Your physical presence.</em></>}</h1>
            <p className="srp-intro">{ar
              ? 'أوس يجمع الموقع الإلكتروني لمكتب المحاماة وإدارة أعماله في نسخة خاصة به. ومدار إكس يصمّم وينفّذ واجهات ولوحات المنشآت.'
              : 'OUS pairs a law firm’s website with a dedicated practice management system. Madar X designs and builds façades and signage.'}</p>
            <div className="srp-actions">
              <a href="#products" className="srp-button srp-button-primary">{ar ? 'استكشف المنتجات' : 'Explore products'}<ArrowDown size={17} /></a>
              <Link href="/contact" className="srp-button srp-button-outline">{ar ? 'تواصل معنا' : 'Contact us'}<ArrowUpRight size={17} /></Link>
            </div>
          </div>
          <div className="srp-art" aria-hidden="true">
            <div className="srp-art-grid" />
            <div className="srp-orbit srp-orbit-outer" />
            <div className="srp-orbit srp-orbit-inner" />
            <div className="srp-art-desk">
              <div className="srp-art-desk-top"><span>OUS</span><Scale size={20} /></div>
              <div className="srp-art-desk-body">
                <span className="srp-art-rail" />
                <div><i /><i /><i /></div>
              </div>
            </div>
            <div className="srp-art-facade">
              <div className="srp-art-facade-panels" />
              <span><Building2 size={19} /> MADAR X</span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="srp-wrap srp-products">
        <div className="srp-section-top">
          <h2>{ar ? 'منتجات سرب تيك' : 'Our products'}</h2>
          <Link href="/products" className="srp-inline-link">{ar ? 'عرض المنتجات' : 'View products'}<ArrowUpRight size={18} /></Link>
        </div>
        <div className="srp-product-grid">
          {featured.map((product) => {
            const ous = product.slug === 'ous'
            const Icon = ous ? Layers3 : Building2
            const name = ar ? product.name : product.nameEn
            return (
              <Link key={product.slug} href={`/products/${product.slug}`} className={`srp-product ${ous ? 'srp-product-ous' : 'srp-product-madar'}`}>
                <div className="srp-product-visual" aria-hidden="true">
                  <Icon size={32} strokeWidth={1.4} />
                  <span>{product.nameEn}</span>
                </div>
                <div className="srp-product-copy">
                  <div><h3>{name}</h3><p>{ar ? product.description : product.descriptionEn}</p></div>
                  <ArrowUpRight className="srp-product-arrow" size={24} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="srp-contact">
        <div className="srp-wrap srp-contact-layout">
          <h2>{ar ? 'كيف نقدر نساعدك؟' : 'How can we help?'}</h2>
          <div className="srp-contact-grid">
            <Link href="/support"><Headphones size={23} /><span>{ar ? 'الدعم الفني' : 'Technical support'}</span><ArrowUpRight size={18} /></Link>
            <Link href="/integrations"><Plug2 size={23} /><span>{ar ? 'طلب تكامل' : 'Request an integration'}</span><ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
