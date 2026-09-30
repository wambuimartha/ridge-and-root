import Image from 'next/image'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { ValueProps } from '@/components/site/value-props'
import { Wellness } from '@/components/site/wellness'
import { PillLink } from '@/components/site/buttons'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { TealBand } from '@/components/site/teal-band'
import { ProductCarousel } from '@/components/home/product-carousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
  description:
    'Exceptional Macadamias. Extraordinary Origin. Grown in Kenya, roasted to perfection, and crafted into seven distinctive flavors.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
    description:
      'Exceptional Macadamias. Extraordinary Origin. Grown in Kenya, roasted to perfection, and crafted into seven distinctive flavors.',
    url: 'https://ridgeandroot.co.ke',
    images: [
      {
        url: '/images/hero_flatlay.png',
        width: 1200,
        height: 630,
        alt: 'Ridge & Root macadamia pouches arranged with nuts, coconut and spices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
    description:
      'Exceptional Macadamias. Extraordinary Origin. Grown in Kenya, roasted to perfection, and crafted into seven distinctive flavors.',
    images: ['/images/hero_flatlay.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ridge & Root',
  url: 'https://ridgeandroot.co.ke',
  logo: 'https://ridgeandroot.co.ke/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+254182257223',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  email: 'indulge@ridgeandroot.co.ke',
  sameAs: [],
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />

      {/* 1. Hero */}

      <section className="relative h-[55vh] sm:h-[70vh] min-h-[360px] sm:min-h-[460px] w-full overflow-hidden">
        <Image
          src="/images/hero_flatlay.png"
          alt="Ridge & Root macadamia pouches arranged with nuts, coconut and spices"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-cream">
                Exceptional Macadamias.
                <br />
                Extraordinary Origin.
              </h1>
              <div className="mt-6 sm:mt-8">
                <PillLink href="/our-story">Discover Our Story</PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ribbon — Hero → Product carousel */}
      <GoldRibbon />

      {/* 2. Product carousel */}
      <ProductCarousel />

      {/* 3. Tagline banner with botanical pattern and Shop All Flavors button */}
      <TealBand
        heading="Seven Distinctive Varieties. One Amazing Nut."
        isItalicHeading
        py="py-12 sm:py-14 md:py-16"
        buttonText="Shop All Flavors"
        buttonHref="/shop"
      />

      {/* 4. Lifestyle full-width banner */}
      <section className="relative w-full overflow-hidden h-[420px] sm:h-[500px] md:h-[560px]">
        <Image
          src="/images/lifestyle_tote_bag.png"
          alt="A hand placing a Warm Chili macadamia pouch into a tote bag"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%] sm:object-[80%_center] md:object-center"
        />
        {/* Dark gradient overlay behind text for crisp legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/50 sm:to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-12">
            <div className="max-w-lg text-cream">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-snug text-cream">
                Feel good about every bite.
              </h2>
              <p className="mt-4 sm:mt-5 font-sans text-sm leading-relaxed text-cream/90 md:text-base">
                Thoughtfully roasted and full of naturally satisfying goodness,
                our macadamias make everyday snacking feel a little more
                indulgent.
              </p>
              <div className="mt-6 sm:mt-8">
                <PillLink href="/why-macadamias" variant="solid">
                  Why Macadamias
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ribbon — Lifestyle banner → Wholesale section */}
      <GoldRibbon />

      {/* 5. Wholesale & Private Label — clean two-column layout */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          {/* LEFT — product photo, no text overlay */}
          <div className="relative overflow-hidden min-h-[280px] sm:min-h-[360px] md:min-h-[480px]">
            <Image
              src="/images/wholesale_private_label_section.png"
              alt="Ridge & Root macadamia retail pouch, private-label custom pouch, foodservice bulk bag, and branded carton with a bowl of kernels"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* RIGHT — text on plain cream background, fully legible */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-14 md:px-14 md:py-20">
            {/* Eyebrow */}
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust">
              Why Ridge &amp; Root?
            </p>

            {/* Heading */}
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-ink">
              Macadamia Solutions for Your Business
            </h2>

            {/* Body copy */}
            <p className="mt-4 sm:mt-5 font-sans text-sm leading-relaxed text-ink/80 md:text-base">
              From premium bulk kernels and foodservice packs to private-label
              products and Ridge &amp; Root retail ranges, we provide flexible
              macadamia solutions tailored to your market, customers and brand.
            </p>

            {/* CTA */}
            <div className="mt-6 sm:mt-8">
              <PillLink href="/wholesale" variant="solid">
                Explore Wholesale
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ribbon — Wholesale → Value props */}
      <GoldRibbon />

      {/* 6. Three value props */}
      <ValueProps />

      {/* 7. Wellness */}
      <Wellness />

      {/* 9. Newsletter */}
      <Newsletter />

      {/* 10. Footer */}
      <Footer />
    </main>
  )
}
