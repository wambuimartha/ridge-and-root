import Image from 'next/image'
import Link from 'next/link'

export const ENJOY_USES = [
  {
    image: '/images/why-macadamias/salad.png',
    alt: 'Kale and roasted vegetable salad topped with macadamia nuts',
    label: 'FRESH & VIBRANT',
    title: 'Scatter over salads',
    copy: 'Add a rich, satisfying crunch to leafy greens, roasted vegetables and grain bowls.',
  },
  {
    image: '/images/why-macadamias/uses-smoothie.png',
    alt: 'Creamy smoothie in a glass surrounded by macadamia nuts',
    label: 'SMOOTH & NOURISHING',
    title: 'Blend into smoothies',
    copy: 'Create a naturally creamy texture for a satisfying breakfast or afternoon lift.',
  },
  {
    image: '/images/why-macadamias/uses-cake.png',
    alt: 'Slice of layer cake topped with chopped macadamia nuts',
    label: 'PURE INDULGENCE',
    title: 'Bake into something special',
    copy: 'Bring buttery richness and delicate crunch to cakes, cookies and desserts.',
  },
  {
    image: '/images/why-macadamias/uses-lunchbox.png',
    alt: 'Bento lunch box with fruit, vegetables and macadamia nuts',
    label: 'EASY EVERYDAY GOODNESS',
    title: 'Pack for lunch',
    copy: 'A convenient, plant-based snack for busy days, lunch boxes and travel.',
  },
]

interface WaysToEnjoyProps {
  showCta?: boolean
  ctaText?: string
  ctaHref?: string
}

export function WaysToEnjoy({
  showCta = true,
  ctaText = 'Shop All Flavors',
  ctaHref = '/shop',
}: WaysToEnjoyProps) {
  return (
    <section id="ways-to-enjoy" className="bg-cream px-6 sm:px-10 md:px-16 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust mb-3">
            Versatile &amp; Delicious
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink">
            Ways to Enjoy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ENJOY_USES.map((u) => (
            <div
              key={u.title}
              className="group overflow-hidden rounded-2xl border border-gold/25 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-cream hover:shadow-md flex flex-col"
            >
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-cream">
                <Image
                  src={u.image}
                  alt={u.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                  {u.label}
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-ink mb-2">
                  {u.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-ink/70">
                  {u.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showCta && (
          <div className="mt-14 sm:mt-18 text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
