import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { PillLink } from '@/components/site/buttons'
import { WaysToEnjoy } from '@/components/site/ways-to-enjoy'

export const metadata: Metadata = {
  title: 'Why Macadamias — Ridge & Root',
  description:
    'Discover the creamy crunch, exceptional health benefits, and natural goodness of premium macadamias grown in Kenya’s fertile highlands.',
  alternates: {
    canonical: '/why-macadamias',
  },
  openGraph: {
    title: 'Why Macadamias — Ridge & Root',
    description:
      'Discover the creamy crunch, exceptional health benefits, and natural goodness of premium macadamias grown in Kenya’s fertile highlands.',
    url: 'https://ridgeandroot.co.ke/why-macadamias',
    images: [
      {
        url: '/images/why-macadamias/hero-macadamias.png',
        width: 1200,
        height: 800,
        alt: 'Bowl of macadamia nuts with cracked shells and fresh leaves',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Macadamias — Ridge & Root',
    description:
      'Discover the creamy crunch, exceptional health benefits, and natural goodness of premium macadamias grown in Kenya’s fertile highlands.',
    images: ['/images/why-macadamias/hero-macadamias.png'],
  },
}

const BENEFITS = [
  {
    number: '01',
    title: 'Rich in unsaturated fats',
    copy: 'Macadamias are naturally rich in monounsaturated fats and make a satisfying addition to a balanced diet.',
  },
  {
    number: '02',
    title: 'A source of fibre',
    copy: 'Plant-based fibre pairs with their signature crunch for a snack that feels both simple and substantial.',
  },
  {
    number: '03',
    title: 'Naturally low in carbs',
    copy: 'A nutrient-dense whole food with a naturally low carbohydrate profile.',
  },
  {
    number: '04',
    title: 'Minerals from nature',
    copy: 'Macadamias naturally contain manganese and other essential minerals.',
  },
]

export default function WhyMacadamiasPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* ---------- HERO ---------- */}
      <section className="relative">
        <img
          src="/images/why-macadamias/hero-macadamias.png"
          alt="Bowl of macadamia nuts with cracked shells and fresh leaves"
          className="h-[55vh] sm:h-[65vh] min-h-[420px] sm:min-h-[480px] w-full object-cover object-[center_35%] sm:object-center"
        />
        {/* Dark gradient overlay behind text for crisp legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 sm:from-black/75 sm:via-black/45 sm:to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="max-w-xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3 sm:mb-4">
                Naturally Remarkable
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-cream">
                Small nut.
                <br />
                <span className="italic font-serif text-gold-light">
                  Rich rewards.
                </span>
              </h1>
              <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-base leading-relaxed text-cream/90 max-w-md">
                Discover the creamy crunch and natural goodness of premium
                macadamias grown in Kenya&rsquo;s fertile highlands.
              </p>
              <div className="mt-6 sm:mt-8">
                <PillLink href="#benefits">Explore the goodness</PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* ---------- BENEFITS GRID ---------- */}
      <section id="benefits" className="bg-cream px-6 sm:px-10 md:px-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust mb-4">
                Goodness In Every Bite
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-teal-dark mb-6">
                Simple nutrition,
                <br />
                straight from nature.
              </h2>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-brown max-w-md">
                Macadamias bring satisfying texture, naturally occurring
                nutrients and a rich, buttery taste to everyday snacking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-gold/30 bg-cream overflow-hidden shadow-sm">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.number}
                  className={`p-6 sm:p-8 border-gold/20 ${
                    i % 2 === 0 ? 'sm:border-r' : ''
                  } ${i < 2 ? 'border-b' : 'max-sm:border-b last:border-b-0'}`}
                >
                  <p className="font-sans text-sm font-bold text-gold mb-2">
                    {b.number}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-teal-dark mb-2">
                    {b.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-brown/80">
                    {b.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* ---------- WAYS TO ENJOY ---------- */}
      <WaysToEnjoy showCta={true} ctaText="Shop All Flavors" ctaHref="/shop" />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* ---------- GROWN IN KENYA / HIGHLANDS HIGHLIGHT (Wellness styling) ---------- */}
      <section className="relative bg-gold">
        {/* Thicker horizontal metallic gold sheen gradient bar at the very top */}
        <div
          className="h-4 sm:h-5 md:h-6 w-full bg-gradient-to-r from-[#A07840] via-[#F4D494] via-55% to-[#A07840] shadow-[0_2px_10px_rgba(43,33,24,0.18)]"
          role="separator"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
            {/* Photos on the left — 3 individual cards with equal width, aligned top edges, and subtle drop shadow */}
            <div className="order-1 md:col-span-6 lg:col-span-7">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {/* Card 1: Green Macadamia Branch */}
                <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src="/images/wellness_card_branch.png"
                    alt="Macadamia tree branch with lush leaves and clusters of green nuts"
                    className="aspect-[177/262] w-full object-cover"
                  />
                </div>

                {/* Card 2: Farmer with Harvesting Basket */}
                <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src="/images/wellness_card_farmer.png"
                    alt="Farmer harvesting macadamias with a woven basket on her back"
                    className="aspect-[177/262] w-full object-cover"
                  />
                </div>

                {/* Card 3: Roasted & Cracked Macadamia Nuts */}
                <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src="/images/wellness_card_cracked.png"
                    alt="Cracked macadamia nut shells with whole golden kernels"
                    className="aspect-[177/262] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text block on the right */}
            <div className="order-2 flex flex-col justify-center text-left md:col-span-6 lg:col-span-5">
              <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-brown">
                Grown in Kenya
              </p>
              <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-ink">
                &ldquo;From fertile highlands to a perfectly roasted finish.&rdquo;
              </h2>
              <p className="mt-4 sm:mt-5 font-sans text-base sm:text-lg leading-relaxed text-ink">
                We work with small family farms across Kenya, selecting quality
                nuts and crafting them with natural ingredients for exceptional
                flavour and crunch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
