'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function PackagingSpec() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const enquiryEl = document.querySelector('#enquiry')
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' })
      window.dispatchEvent(
        new CustomEvent('wholesale-select-route', { detail: 'Bulk raw kernels' }),
      )
    }
  }

  return (
    <section id="packaging" className="bg-cream px-4 sm:px-6 md:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Content Column */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust mb-3 sm:mb-4">
              Bulk Raw Kernels
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-5 sm:mb-6">
              Protected for the journey.
            </h2>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-ink/80 mb-6 sm:mb-8 max-w-xl">
              Our processed macadamia kernels are vacuum-packed in food-grade
              11.34 kg (25 lb) aluminium pouches and placed in secondary cartons
              for export. The barrier packaging helps protect product quality and
              freshness through storage and transit.
            </p>
            <div>
              <a
                href="#enquiry"
                onClick={handleClick}
                className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-200 hover:text-rust underline underline-offset-4 decoration-gold/60"
              >
                <span>Request specifications</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Image Column */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 shadow-lg bg-cream">
              <Image
                src="/images/wholesale/vacuum-pouch-with-kernels.jpg"
                alt="Silver vacuum-sealed pouch standing next to an open cardboard box, loose macadamia kernels scattered in front"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
