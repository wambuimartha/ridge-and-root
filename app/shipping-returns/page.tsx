import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { PillLink } from '@/components/site/buttons'
import { TealBand } from '@/components/site/teal-band'
import { getMailtoUrl } from '@/lib/email-links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Shipping rates, delivery timeframes, tracking, and return policies for Ridge & Root macadamia orders.',
  alternates: {
    canonical: '/shipping-returns',
  },
  openGraph: {
    title: 'Shipping & Returns — Ridge & Root',
    description:
      'Shipping rates, delivery timeframes, tracking, and return policies for Ridge & Root macadamia orders.',
    url: 'https://ridgeandroot.co.ke/shipping-returns',
  },
}

export default function ShippingReturnsPage() {
  return (
    <main>
      <Header />

      <TealBand
        hasTopRibbon={false}
        eyebrow="Customer Care"
        heading="Shipping & Returns"
        description="Carefully packed and promptly delivered from Nairobi, Kenya to your doorstep."
      />

      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 sm:space-y-12 px-4 sm:px-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-ink">Shipping Policy</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink/75">
              We take exceptional pride in the freshness of our macadamias. Every order is packaged in air-tight, nitrogen-flushed foil pouches to guarantee the peak flavor of roasted Kenyan nuts.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-ink/75">
              <li><strong>Domestic Orders (Kenya):</strong> Standard dispatch within 24 hours. Delivery within Nairobi is typically same-day or next-day. Regional deliveries take 2 business days.</li>
              <li><strong>International Orders:</strong> Shipped via DHL Express courier with tracking. Delivery to North America, Europe, Middle East, and Asia takes 3–7 business days.</li>
              <li><strong>Free Shipping:</strong> Complimentary standard shipping applies on all qualified retail orders over $75.</li>
            </ul>
          </div>

          <div className="border-t border-ink/15 pt-8 sm:pt-10">
            <h2 className="font-serif text-xl sm:text-2xl text-ink">Returns &amp; Satisfaction Guarantee</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink/75">
              Because our products are premium perishable foodstuffs, we cannot accept returns once sealed pouches are opened. However, your complete delight is our mission:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-ink/75">
              <li>If your parcel arrives damaged in transit, please take a photograph and contact us within 48 hours of delivery.</li>
              <li>We will gladly dispatch an immediate replacement or issue a full refund to your original payment method.</li>
              <li>For any quality inquiries, reach our team via <a href="https://wa.me/254182257223" target="_blank" rel="noopener noreferrer" className="text-gold underline">WhatsApp (+254182257223)</a> or email at <a href={getMailtoUrl('indulge@ridgeandroot.co.ke', 'Quality Inquiry — Ridge & Root')} className="text-gold underline">indulge@ridgeandroot.co.ke</a>.</li>
            </ul>
          </div>

          <div className="pt-6 text-center">
            <PillLink href="/contact">Contact Our Shipping Team</PillLink>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}
