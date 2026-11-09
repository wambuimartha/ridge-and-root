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
    'International export shipping policies, delivery timeframes, tracking, and return policies for Ridge & Root macadamia orders.',
  alternates: {
    canonical: '/shipping-returns',
  },
  openGraph: {
    title: 'Shipping & Returns — Ridge & Root',
    description:
      'International export shipping policies, delivery timeframes, tracking, and return policies for Ridge & Root macadamia orders.',
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
        description="Ridge & Root supplies export orders only and ships internationally only."
      />

      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 sm:space-y-12 px-4 sm:px-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-ink">Shipping Policy</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink/75">
              Ridge &amp; Root supplies export orders only and ships internationally only. We take exceptional pride in the freshness of our macadamias. Every order is packaged in air-tight, nitrogen-flushed foil pouches to guarantee the peak flavor of roasted Kenyan nuts.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-ink/75">
              <li><strong>International Air Freight:</strong> Shipped via DHL Express courier with tracking. Delivery to North America, Europe, Middle East, and Asia takes 3–7 business days.</li>
              <li><strong>Ocean Freight:</strong> Bulk and containerized export shipments are dispatched from the Port of Mombasa, with transit times varying by destination port.</li>
              <li><strong>Export Terms:</strong> Shipments are arranged on agreed Incoterms (FOB Mombasa, CIF, or DDP) as specified in the commercial proforma.</li>
            </ul>
          </div>

          <div className="border-t border-ink/15 pt-8 sm:pt-10">
            <h2 className="font-serif text-xl sm:text-2xl text-ink">Returns &amp; Satisfaction Guarantee</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-ink/75">
              Because our products are premium perishable foodstuffs, we cannot accept returns once sealed pouches or bulk export packaging are opened. However, your complete delight is our mission:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-ink/75">
              <li>If your shipment arrives damaged in transit, please take photographs and contact us within 48 hours of delivery.</li>
              <li>We will gladly dispatch an immediate replacement or issue a full credit or refund.</li>
              <li>For any quality inquiries, reach our team via email at <a href={getMailtoUrl('indulge@ridgeandroot.co.ke', 'Quality Inquiry — Ridge & Root')} className="text-gold underline">indulge@ridgeandroot.co.ke</a> or wholesale support at <a href={getMailtoUrl('wholesale@ridgeandroot.co.ke', 'Export Quality Inquiry — Ridge & Root')} className="text-gold underline">wholesale@ridgeandroot.co.ke</a>.</li>
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
