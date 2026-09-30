import Image from 'next/image'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { WaysToEnjoy } from '@/components/site/ways-to-enjoy'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { ShopGrid } from '@/components/shop/shop-grid'

import { Download } from 'lucide-react'
import type { Metadata } from 'next'
import { getServerCurrency } from '@/lib/currency-server'
import { getCatalogueForCurrency } from '@/lib/catalogue'

export const metadata: Metadata = {
  title: 'Shop All Flavors',
  description:
    "A Flavor for Every Moment. Browse Ridge & Root's full collection of premium dry-roasted Kenyan macadamia nuts — seven distinctive flavors.",
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop All Flavors — Ridge & Root',
    description:
      "A Flavor for Every Moment. Browse Ridge & Root's full collection of premium dry-roasted Kenyan macadamia nuts — seven distinctive flavors.",
    url: 'https://ridgeandroot.co.ke/shop',
    images: [{ url: '/images/shop_hero.png', width: 1200, height: 630, alt: 'Ridge & Root macadamia nut collection' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All Flavors — Ridge & Root',
    description: "Browse Ridge & Root's full collection of premium dry-roasted Kenyan macadamia nuts.",
    images: ['/images/shop_hero.png'],
  },
}

export default async function ShopPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const currency = await getServerCurrency(props.searchParams)
  const catalogue = getCatalogueForCurrency(currency)

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/shop_hero.png"
          alt="An assortment of roasted macadamia nuts and seasonings on a cream surface"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-lg">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-cream">
                A Flavor for
                <br />
                Every Moment
              </h1>
              {/* Download Catalogue — automatically serves KSH or USD catalogue based on visitor location */}
              <div className="mt-6 sm:mt-8">
                <a
                  href={catalogue.url}
                  download={catalogue.filename}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 sm:px-8 py-3 sm:py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cream shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  Download Catalogue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ribbon — Hero → Product grid */}
      <GoldRibbon />


      {/* Filters + grid */}
      <ShopGrid currency={currency} />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* Ways to Enjoy banner */}
      <WaysToEnjoy ctaText="Learn Why Macadamias" ctaHref="/why-macadamias" />

      {/* Footer */}
      <Footer />
    </main>
  )
}
