import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { WholesaleHero } from '@/components/wholesale/wholesale-hero'
import { CapabilityGallery } from '@/components/wholesale/capability-gallery'
import { RouteSection } from '@/components/wholesale/route-section'
import { PackagingSpec } from '@/components/wholesale/packaging-spec'
import { EnquiryForm } from '@/components/wholesale/wholesale-enquiry-form'

export const metadata: Metadata = {
  title: 'Wholesale & Business Solutions — Ridge & Root',
  description:
    'From Ridge & Root consumer packs to raw kernels and custom formulations, we help retailers, brands, foodservice operators and manufacturers source premium Kenyan macadamias with confidence.',
  alternates: {
    canonical: '/wholesale',
  },
  openGraph: {
    title: 'Wholesale & Business Solutions — Ridge & Root',
    description:
      'From Ridge & Root consumer packs to raw kernels and custom formulations, we help retailers, brands, foodservice operators and manufacturers source premium Kenyan macadamias with confidence.',
    url: 'https://ridgeandroot.co.ke/wholesale',
    images: [
      {
        url: '/images/wholesale/export-packaging-boxes.jpg',
        width: 1200,
        height: 800,
        alt: 'Stacked vacuum-packed cartons on a pallet with plain unbranded export packaging box',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale & Business Solutions — Ridge & Root',
    description:
      'From Ridge & Root consumer packs to raw kernels and custom formulations, source premium Kenyan macadamias with confidence.',
    images: ['/images/wholesale/export-packaging-boxes.jpg'],
  },
}

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 1. Header */}
      <Header />

      {/* 2. Wholesale Hero */}
      <WholesaleHero />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* 3. Capability Gallery + Stats + Feature Strip */}
      <CapabilityGallery />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* 4. Choose Your Route Section */}
      <RouteSection />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* 5. Packaging Specification Section */}
      <PackagingSpec />

      {/* Gold Ribbon divider */}
      <GoldRibbon />

      {/* 6. Wholesale Enquiry Form */}
      <EnquiryForm />

      {/* 7. Footer */}
      <Footer />
    </main>
  )
}
