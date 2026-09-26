'use client'

import { ArrowUpRight, Check, Sparkles, ArrowDown } from 'lucide-react'

interface RouteCardProps {
  monogram: string
  eyebrow: string
  title: string
  description: string
  linkText: string
  interestOption: string
  highlights?: string[]
}

export function RouteCard({
  monogram,
  eyebrow,
  title,
  description,
  linkText,
  interestOption,
  highlights = [],
}: RouteCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const enquiryEl = document.querySelector('#enquiry')
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' })
      window.dispatchEvent(
        new CustomEvent('wholesale-select-route', { detail: interestOption }),
      )
    }
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gold/25 bg-cream p-6 sm:p-8 shadow-[0_4px_20px_rgba(43,33,24,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_32px_rgba(204,152,88,0.14)]">
      <div>
        {/* Monogram + Eyebrow Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 via-gold/15 to-rust/10 font-serif text-sm font-bold text-ink border border-gold/40 shadow-xs">
              {monogram}
            </div>
            <div>
              <p className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-rust">
                {eyebrow}
              </p>
            </div>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3 leading-snug group-hover:text-brown transition-colors">
          {title}
        </h4>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base leading-relaxed text-ink/75 mb-5">
          {description}
        </p>

        {/* Highlight Bullets if provided */}
        {highlights.length > 0 && (
          <ul className="mb-6 space-y-2 border-t border-gold/15 pt-4">
            {highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 font-sans text-xs text-ink/70"
              >
                <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action link */}
      <div className="mt-4 pt-4 border-t border-gold/15 flex items-center justify-between">
        <a
          href="#enquiry"
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-gold transition-colors duration-200 group-hover:text-rust"
        >
          <span>{linkText}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <span className="font-sans text-[11px] text-ink/40 uppercase tracking-wider">
          Request Quote
        </span>
      </div>
    </div>
  )
}

export function RouteSection() {
  const scrollToEnquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const enquiryEl = document.querySelector('#enquiry')
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="routes"
      className="relative bg-cream px-4 sm:px-6 md:px-8 py-18 sm:py-24 overflow-hidden"
    >
      {/* Decorative ambient radial gradients */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-rust/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-rust/30 bg-rust/5 px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-rust" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-rust">
              Choose Your Route
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-ink leading-tight">
            Solutions shaped around{' '}
            <span className="italic font-serif font-normal text-gold">
              how you buy.
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 font-sans text-base sm:text-lg leading-relaxed text-ink/80 max-w-2xl mx-auto">
            Start with the pathway that best describes your business. Every
            option leads to a dedicated wholesale quote and consultation with our export team.
          </p>
        </div>

        {/* Pathway Groups */}
        <div className="space-y-16 sm:space-y-20">
          {/* 01 — Buy our brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-bold text-brown border border-gold/30">
                01
              </span>
              <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-ink">
                Buy our brand
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
              <span className="hidden sm:inline-flex items-center rounded-full bg-gold/10 border border-gold/25 px-3 py-1 font-sans text-xs font-medium text-ink/75 uppercase tracking-[0.14em]">
                For retail buyers &amp; distributors
              </span>
            </div>

            {/* Showcase Grid for 01: RouteCard + Highlights Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7">
                <RouteCard
                  monogram="RR"
                  eyebrow="Ridge & Root Retail"
                  title="Branded consumer packs"
                  description="Stock our premium flavour collection in convenient consumer formats, supported by a strong Kenyan-origin story and shelf-ready presentation."
                  linkText="Discuss retail supply"
                  interestOption="Branded consumer packs"
                  highlights={[
                    'Premium shelf-ready pouch formats with gas-flushed freshness',
                    'Curated flavour lineup: Classic Sea Salt, Warm Chili, Sweet Honey & more',
                    'Direct export pricing with flexible container and pallet minimums',
                  ]}
                />
              </div>

              {/* Complementary Retail Highlights Card */}
              <div className="lg:col-span-5 rounded-2xl border border-gold/30 bg-cream p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(43,33,24,0.04)]">
                <div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-2">
                    Retailer Advantages
                  </p>
                  <h4 className="font-serif text-xl font-bold text-ink mb-3">
                    High margin, fast shelf-turnover products.
                  </h4>
                  <p className="font-sans text-sm leading-relaxed text-ink/75 mb-4">
                    Full merchandising guidance, origin traceability reports, and marketing collateral provided for supermarkets, specialty grocers, and travel retail.
                  </p>
                </div>
                <div className="pt-4 border-t border-gold/15">
                  <a
                    href="#enquiry"
                    onClick={(e) => {
                      e.preventDefault()
                      const enquiryEl = document.querySelector('#enquiry')
                      if (enquiryEl) {
                        enquiryEl.scrollIntoView({ behavior: 'smooth' })
                        window.dispatchEvent(
                          new CustomEvent('wholesale-select-route', {
                            detail: 'Branded consumer packs',
                          }),
                        )
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brown hover:bg-gold hover:text-cream transition-all duration-200 cursor-pointer"
                  >
                    <span>Request Retail Quotation</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 02 — Put your brand on it */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-bold text-brown border border-gold/30">
                02
              </span>
              <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-ink">
                Put your brand on it
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
              <span className="hidden sm:inline-flex items-center rounded-full bg-gold/10 border border-gold/25 px-3 py-1 font-sans text-xs font-medium text-ink/75 uppercase tracking-[0.14em]">
                For established brands, retailers &amp; entrepreneurs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RouteCard
                monogram="PL"
                eyebrow="Private Label"
                title="Bespoke brand development"
                description="Develop a differentiated macadamia product with tailored flavours, formats and packaging aligned to your brand and market."
                linkText="Build a private-label range"
                interestOption="Private label"
                highlights={[
                  'Custom packaging formats: nitrogen-flushed standup pouches, cans, or jars',
                  'Tailored roasting profiles, custom spice blends, and certified organic sourcing',
                ]}
              />
              <RouteCard
                monogram="WL"
                eyebrow="White Label"
                title="Ready-to-brand products"
                description="Bring proven macadamia products to market under your identity with a simpler, faster route from selection to shelf."
                linkText="Explore white-label options"
                interestOption="White label"
                highlights={[
                  'Proven, top-selling recipe formulations ready for your label application',
                  'Lower development overhead with rapid production and shipping timelines',
                ]}
              />
            </div>
          </div>

          {/* 03 — Bulk & custom sourcing */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-bold text-brown border border-gold/30">
                03
              </span>
              <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-ink">
                Bulk &amp; custom sourcing
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
              <span className="hidden sm:inline-flex items-center rounded-full bg-gold/10 border border-gold/25 px-3 py-1 font-sans text-xs font-medium text-ink/75 uppercase tracking-[0.14em]">
                For foodservice, manufacturers &amp; ingredient buyers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <RouteCard
                monogram="RF"
                eyebrow="Bulk Roasted & Flavoured"
                title="Foodservice and retail supply"
                description="Roasted and flavoured macadamias supplied in bulk, with seasoning and format options to suit your application."
                linkText="Request bulk options"
                interestOption="Bulk roasted & flavoured"
                highlights={[
                  'Bulk vacuum-sealed foil bags suited for commercial kitchen decanting',
                  'Consistent roast consistency across all commercial batch volumes',
                ]}
              />
              <RouteCard
                monogram="RK"
                eyebrow="Bulk Raw Kernels"
                title="For food applications"
                description="Processed raw macadamia kernels for confectionery, bakery, plant-based products, snacks and other food applications."
                linkText="Enquire about kernels"
                interestOption="Bulk raw kernels"
                highlights={[
                  'Commercial sizing grades: Style 0, Style 1 (Wholes), to Halves & Pieces',
                  '11.34 kg (25 lb) vacuum-sealed aluminium export cartons',
                ]}
              />
              <RouteCard
                monogram="CD"
                eyebrow="Custom Product Development"
                title="Collaborative formula design"
                description="Work with our team to develop flavour profiles, formats and macadamia-based products shaped around your brief."
                linkText="Start a development brief"
                interestOption="Custom product development"
                highlights={[
                  'Dedicated food-science R&D support from ideation to scale-up',
                  'Sensory profiling, shelf-life testing, and pilot test runs',
                ]}
              />
            </div>
          </div>
        </div>

        {/* Bottom Assistance Banner linking directly to Quote Form */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-gold/35 bg-cream p-6 sm:p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2">
              Need custom volume pricing or shipping estimates?
            </h4>
            <p className="font-sans text-sm sm:text-base text-ink/75">
              Submit your required volumes, target ports (CIF/FOB), or timeline, and our wholesale team will prepare an itemized quote.
            </p>
          </div>

          <a
            href="#enquiry"
            onClick={scrollToEnquiry}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-3.5 sm:py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-md hover:bg-gold-light hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Request a Quote Now</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
