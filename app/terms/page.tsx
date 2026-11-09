import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { TealBand } from '@/components/site/teal-band'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms of service, website usage policies, and commercial export terms for Ridge & Root products.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Conditions — Ridge & Root',
    description: 'Terms of service, website usage policies, and commercial export terms for Ridge & Root.',
    url: 'https://ridgeandroot.co.ke/terms',
  },
}

export default function TermsPage() {
  return (
    <main>
      <Header />

      <TealBand
        hasTopRibbon={false}
        eyebrow="Legal"
        heading="Terms & Conditions"
        description="Ridge & Root supplies export orders only and ships internationally only."
      />

      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8 px-4 sm:px-6 font-sans text-sm leading-relaxed text-ink/75">
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-ink">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using this website (ridgeandroot.co.ke) or submitting an inquiry, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">2. Export Supply Only</h2>
            <p className="mt-2">
              Ridge &amp; Root supplies export orders only and ships internationally only. As an export-licensed facility under EPZ regulations, Ridge &amp; Root does not sell, distribute, or deliver to individual retail consumers or local accounts within Kenya.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">3. Product Information &amp; Specifications</h2>
            <p className="mt-2">
              We make every effort to display the specifications, grades, and nutritional information of our macadamias accurately. Because macadamia nuts are an agricultural crop, natural variations in kernel sizing and color may occur in accordance with commercial style classifications.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">4. Commercial Pricing &amp; Export Contracts</h2>
            <p className="mt-2">
              All commercial quotes and pricing are provided for international export accounts only. Orders are formalized through commercial invoices, letters of credit, and export agreements authorized by Exotic EPZ in accordance with applicable export laws.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">5. Intellectual Property</h2>
            <p className="mt-2">
              All trademarks, logos, photographs, text, and brand assets displayed on this site are the exclusive property of Ridge &amp; Root and Exotic EPZ. Unauthorized reproduction, modification, or redistribution is strictly prohibited.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}
