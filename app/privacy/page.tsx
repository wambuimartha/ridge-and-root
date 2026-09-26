import Link from 'next/link'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { TealBand } from '@/components/site/teal-band'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Ridge & Root collects, protects, and uses your personal information and order data.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — Ridge & Root',
    description: 'How Ridge & Root collects, protects, and uses your personal information.',
    url: 'https://ridgeandroot.co.ke/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <main>
      <Header />

      <TealBand
        hasTopRibbon={false}
        eyebrow="Trust & Privacy"
        heading="Privacy Policy"
        description="Your privacy is of paramount importance to us."
      />

      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8 px-4 sm:px-6 font-sans text-sm leading-relaxed text-ink/75">
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-ink">Information We Collect</h2>
            <p className="mt-2">
              When you browse our site, subscribe to our newsletter, or submit an inquiry, we collect information you provide such as your name, email address, phone number, and delivery details.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">How We Use Your Information</h2>
            <p className="mt-2">
              Your information is used strictly to fulfill your orders, provide WhatsApp order assistance, communicate delivery status updates, and send periodic news regarding new harvests and seasonal varieties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Data Protection &amp; Security</h2>
            <p className="mt-2">
              We never sell, rent, or trade your personal information to third parties. All personal data is stored securely and processed in accordance with the Kenya Data Protection Act, 2019 and relevant international standards.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Contact Privacy Officer</h2>
            <p className="mt-2">
              If you have any questions regarding your data or wish to have your records removed, please reach out through our{' '}
              <Link href="/contact" className="text-gold underline">
                Contact Us
              </Link>{' '}
              page.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}
