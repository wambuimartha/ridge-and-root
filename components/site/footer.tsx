import Link from 'next/link'
import Image from 'next/image'
import { getMailtoUrl } from '@/lib/email-links'

const COLUMNS = [
  {
    title: 'SHOP',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Ways to Enjoy', href: '/why-macadamias#ways-to-enjoy' },
      { label: 'Gift Packs', href: '/gift-packs' },
      { label: 'Wholesale', href: '/wholesale' },
    ],
  },
  {
    title: 'OUR STORY',
    links: [
      { label: 'Why Macadamias', href: '/why-macadamias' },
      { label: 'Our Origin', href: '/our-story' },
      { label: 'Sustainability', href: '/our-story#sustainability' },
      { label: 'Small Farmers First', href: '/our-story#farmers' },
      { label: 'Our Process', href: '/our-story#process' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16">
          {/* Logo inline on the left */}
          <div className="shrink-0">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="Ridge & Root home"
            >
              <Image
                src="/images/logo_light.png"
                alt="Ridge & Root"
                width={220}
                height={165}
                className="h-16 w-auto object-contain sm:h-20 md:h-24 lg:h-28"
              />
            </Link>
          </div>

          {/* Nav columns (Shop, Our Story, Help, Contact) */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-8 lg:gap-12">
            {COLUMNS.map((col) => (
              <div key={col.title} className="min-w-0">
                <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-gold transition-colors hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="min-w-0">
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream">
                CONTACT
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={getMailtoUrl(
                      'indulge@ridgeandroot.co.ke',
                      'Customer Inquiry — Ridge & Root',
                    )}
                    className="block break-all font-sans text-sm text-gold transition-colors hover:text-cream sm:break-normal"
                  >
                    indulge@ridgeandroot.co.ke
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/254182257223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-sm text-gold transition-colors hover:text-cream"
                  >
                    +254182257223
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider and copyright */}
      <div className="border-t border-cream/15 py-6">
        <p className="text-center font-sans text-xs tracking-wide text-cream/60">
          © 2026 Ridge &amp; Root. All rights reserved.
        </p>
        <p className="mt-1.5 text-center font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60">
          A premium product by Exotic EPZ Limited
        </p>
      </div>
    </footer>
  )
}
