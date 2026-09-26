import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { ValueProps } from '@/components/site/value-props'
import { PillLink } from '@/components/site/buttons'
import { TealBand } from '@/components/site/teal-band'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    "At Ridge & Root, exceptional macadamias begin at the source. Grown in Kenya and sourced from small family farms across the country's macadamia-growing regions.",
  alternates: {
    canonical: '/our-story',
  },
  openGraph: {
    title: 'Our Story — Ridge & Root',
    description:
      "At Ridge & Root, exceptional macadamias begin at the source. Grown in Kenya and sourced from small family farms across the country's macadamia-growing regions.",
    url: 'https://ridgeandroot.co.ke/our-story',
    images: [{ url: '/images/ourstory_hero_mountain.png', width: 1200, height: 630, alt: 'Kenyan highland macadamia farm' }],
  },
}

const STEPS = [
  { title: 'GROWN', body: "Cultivated on small family farms across Kenya's macadamia-growing highlands." },
  { title: 'HARVESTED', body: 'Picked by hand at peak.' },
  { title: 'SELECTED', body: 'Sorted and graded for quality.' },
  { title: 'ROASTED', body: "Dry roasted to bring out each nut's natural richness." },
  { title: 'PACKED', body: 'Sealed fresh into every pouch to lock in flavour.' },
  { title: 'SHIPPED', body: 'Sent from Kenya to snack lovers around the world.' },
]

function StepIcon({ i }: { i: number }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
      <span className="font-serif text-xl">{i + 1}</span>
    </div>
  )
}

export default function OurStoryPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative">
        <img
          src="/images/ourstory_hero_mountain.png"
          alt="The Kenyan highlands with macadamia orchards at golden hour"
          className="h-[55vh] sm:h-[62vh] min-h-[360px] sm:min-h-[420px] w-full object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-lg">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-cream">
                A Story
                <br />
                Rooted in Kenya.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Origin text */}
      <section id="origin" className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center md:py-20">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Where it all begins
          </p>
          <p className="mt-4 sm:mt-6 font-serif text-lg sm:text-xl leading-relaxed text-ink md:text-2xl">
            At Ridge &amp; Root, exceptional macadamias begin at the source.
            Grown in Kenya and sourced from small family farms across the
            country&apos;s macadamia-growing regions, they carry a distinctive
            story of origin, people and place. We carefully select, process and
            transform the macadamia nuts through roasting and thoughtfully
            developed flavors into a premium snacking experience. The result is
            Ridge &amp; Root a celebration of macadamia excellence, created for
            today&apos;s global consumer.
          </p>
          <div className="mt-8 sm:mt-10">
            <PillLink href="/contact">Contact Us</PillLink>
          </div>
        </div>
      </section>

      {/* Founders split — compact, elegant responsive layout that fits comfortably on screen */}
      <section id="founders" className="grid bg-cream md:grid-cols-2 scroll-mt-28 md:scroll-mt-32">
        {/* Left: text column */}
        <div className="flex h-full flex-col justify-center bg-cream px-5 sm:px-8 md:px-8 lg:px-12 xl:px-14 py-7 sm:py-8 md:py-8 lg:py-10">
          <div className="max-w-lg">
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal leading-snug text-teal-dark uppercase tracking-normal">
              Women-Owned.
              <br className="hidden sm:inline" />{' '}
              Purpose-Led.
              <br />
              Proudly Kenyan.
            </h2>

            <div className="mt-3 h-px w-12 bg-gold" />

            <div className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm leading-relaxed text-ink/80">
              <p>
                Ridge &amp; Root is brought to you by Jane &amp; Charity, the women
                behind Kenya&apos;s first 100% women-owned macadamia-processing
                company.
              </p>
              <p>
                Driven by the belief that wellness should never feel like a
                compromise, we created Ridge &amp; Root to bring together rich
                flavor, thoughtful nutrition, and meaningful impact.
              </p>
              <p>
                Together, we are creating greater value for Kenya&apos;s
                macadamia producers, connecting small family farms with global
                markets, and sharing exceptional Kenyan quality with the world.
              </p>
            </div>

            <div className="mt-4 sm:mt-5">
              <Link
                href="/our-story#founders"
                className="inline-flex min-h-[40px] items-center justify-center gap-2 bg-gold px-4 sm:px-5 py-2 font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-gold/90 whitespace-nowrap"
              >
                Meet Jane &amp; Charity
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: photo + centered caption below.
            Compact on mobile (capped height so it doesn't push text off screen)
            and perfectly matched to the text column on desktop. */}
        <div className="order-first flex flex-col bg-cream md:order-last md:h-full md:min-h-0">
          <div className="relative w-full overflow-hidden h-[180px] sm:h-[220px] md:h-full md:flex-1 md:min-h-0 flex flex-col">
            <img
              src="/images/ourstory_founders_photo.png"
              alt="Jane Maigua and Charity Ndegwa, the two founders of Ridge & Root, standing under an arched alcove framed by macadamia branches"
              className="w-full h-full object-cover object-[75%_22%] [clip-path:inset(0_0_3px_0)]"
              style={{ display: 'block' }}
            />
          </div>
          <div className="flex shrink-0 items-center justify-center gap-3 bg-cream px-4 sm:px-6 py-2.5 sm:py-3.5">
            <span className="h-px w-6 sm:w-8 bg-gold/60 shrink-0" />
            <p className="font-serif text-xs sm:text-sm md:text-base text-ink whitespace-nowrap">Jane &amp; Charity</p>
            <span className="h-px w-6 sm:w-8 bg-gold/60 shrink-0" />
          </div>
        </div>
      </section>

      {/* Small Farmers */}
      <section id="farmers" className="bg-cream py-16 md:py-20 border-t border-gold/20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Small Farmers First
          </p>
          <h2 className="mt-4 font-serif text-3xl text-teal-dark md:text-4xl">
            Rooted in Community Partnerships
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-ink/75">
            We partner directly with thousands of small macadamia farming families across the Kenyan highlands. By providing fair pricing, agricultural training, and reliable market access, we ensure that every harvest strengthens local farming communities and delivers the freshest, highest-grade kernels to your hands.
          </p>
        </div>
      </section>

      {/* Macadamia Trees Grove Photo */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/images/ourstory_macadamia_trees.jpg"
          alt="Lush macadamia trees and green foliage in the Kenyan highlands"
          className="h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] w-full object-cover object-[center_35%]"
        />
      </div>

      {/* Sustainability */}
      <TealBand
        id="sustainability"
        eyebrow="Environmental Stewardship"
        heading="Sustaining Our Soil & Trees"
        description="Macadamia trees are perennial champions of carbon sequestration and soil preservation. We champion zero-waste processing, regenerative intercropping practices, and water-smart agroforestry to protect Kenya's rich highland ecosystems for generations to come."
      />

      {/* Our Process */}
      <section id="process" className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-center font-sans text-sm font-semibold uppercase tracking-[0.25em] text-ink">
            Our Process
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-y-12 md:grid-cols-6 md:gap-y-0">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center px-2 text-center">
                {i < STEPS.length - 1 && (
                  <span className="absolute left-1/2 top-8 hidden h-px w-full border-t border-dashed border-gold/50 md:block" />
                )}
                <div className="relative z-10 bg-cream">
                  <StepIcon i={i} />
                </div>
                <h3 className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[10rem] font-sans text-xs leading-relaxed text-ink/70">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm photo */}
      <img
        src="/images/factory_photo.jpg"
        alt="A factory photo showing macadamia nuts being processed and roasted in Kenya"
        className="h-[340px] w-full object-cover md:h-[460px]"
      />


      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  )
}