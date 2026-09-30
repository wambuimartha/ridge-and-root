'use client'

import Image from 'next/image'
import { ArrowDown, Mail } from 'lucide-react'
import { getMailtoUrl } from '@/lib/email-links'

export function WholesaleHero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#routes')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-[58vh] sm:h-[68vh] min-h-[440px] sm:min-h-[520px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/wholesale_private_label_section.png"
        alt="Ridge & Root retail pouch, private-label pack, foodservice bulk bag and macadamia kernels"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-[75%_center] md:object-[80%_center]"
      />

      {/* Dark gradient overlay behind text for crisp legibility and showing products on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/50 sm:from-black/85 sm:via-black/55 sm:to-black/15" />

      {/* Hero content positioned inside the image */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-gold mb-3 sm:mb-4">
              Wholesale &amp; Business Solutions
            </p>

            {/* Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-cream mb-5 sm:mb-6">
              Your market.
              <br />
              <span className="italic font-serif font-normal text-gold-light">
                Our macadamia expertise.
              </span>
            </h1>

            {/* Paragraph */}
            <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-cream/90 max-w-xl mb-7 sm:mb-9">
              From Ridge &amp; Root consumer packs to raw kernels and custom
              formulations, we help retailers, brands, foodservice operators and
              manufacturers source premium Kenyan macadamias with confidence.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <a
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#enquiry')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              >
                Request a Quote
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href="#routes"
                onClick={handleScroll}
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-black/30 px-6 sm:px-7 py-3.5 sm:py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm transition-all duration-200 hover:bg-black/50 hover:border-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              >
                Explore capabilities
              </a>

              <a
                href={getMailtoUrl(
                  'wholesale@ridgeandroot.co.ke',
                  'Wholesale & Business Solutions Inquiry',
                )}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-cream/95 transition-colors duration-200 hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                <span className="underline underline-offset-4 decoration-gold/60">
                  wholesale@ridgeandroot.co.ke
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
