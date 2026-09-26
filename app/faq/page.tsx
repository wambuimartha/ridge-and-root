import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { PillLink } from '@/components/site/buttons'
import { TealBand } from '@/components/site/teal-band'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Frequently asked questions about Ridge & Root macadamia nuts, sourcing, allergens, orders, shipping, and wholesale.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — Ridge & Root',
    description:
      'Find answers about Ridge & Root macadamia nuts, sourcing, allergens, orders, shipping, and wholesale.',
    url: 'https://ridgeandroot.co.ke/faq',
  },
}

const FAQS = [
  {
    q: 'Where are Ridge & Root macadamias grown?',
    a: 'All our macadamias are 100% single-origin, grown in the fertile volcanic soils of the Kenyan highlands by dedicated small family farmers.',
  },
  {
    q: 'Are your macadamia nuts gluten-free?',
    a: 'Yes, our dry roasted macadamia nuts are naturally gluten-free and processed in certified facilities adhering to international food safety standards.',
  },
  {
    q: 'How long do the nuts stay fresh once opened?',
    a: 'Our pouches feature high-barrier foil seals to lock in freshness. Once opened, we recommend resealing the zipper tightly and enjoying within 2-3 weeks for optimal crunch and flavor.',
  },
  {
    q: 'Do you offer private-label and wholesale orders?',
    a: 'We provide private-label packaging services and also supply bulk foodservice cartons of roasted and flavored macadamias, customized to your specifications and packed in 10 kg bags. Our raw macadamia kernels are vacuum-packed in 25 lb aluminum pouches and secondary cartons bearing your preferred markings. We serve retailers, manufacturers, and wholesalers, with an annual processing capacity of 700 MT. Visit our Wholesale page or enquire on WhatsApp (+254182257223).',
  },
  {
    q: 'What is your shipping turnaround time?',
    a: 'Domestic Kenya orders typically ship within 24–48 hours. International shipments via DHL Express arrive within 3–7 business days depending on customs clearance and by sea shipment time will vary with destination.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Contact indulge@ridgeandroot.co.ke or WhatsApp +254182257223 for inquiries and orders.',
  },
]

export default function FAQPage() {
  return (
    <main>
      <Header />

      <TealBand
        hasTopRibbon={false}
        eyebrow="Help & Support"
        heading="Frequently Asked Questions"
        description="Everything you need to know about our Kenyan macadamias, ordering, and delivery."
      />

      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-6 sm:space-y-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-ink/15 pb-6 sm:pb-8">
                <h2 className="font-serif text-lg sm:text-xl text-ink md:text-2xl">{faq.q}</h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70 md:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-sans text-sm text-ink/70">Still have a question?</p>
            <div className="mt-4 flex justify-center gap-4">
              <PillLink href="/contact">Contact Support</PillLink>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}
