import Image from 'next/image'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { PillLink } from '@/components/site/buttons'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { ContactForm } from '@/components/contact/contact-form'
import { Mail, Phone, MapPin, Building2, Users, Clock } from 'lucide-react'
import { getMailtoUrl } from '@/lib/email-links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Let's Grow Together — Contact Us",
  description:
    "Questions, ideas, or partnership opportunities? We'd love to connect. Reach Ridge & Root by email, phone, or our contact form.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Let's Grow Together — Ridge & Root",
    description:
      "Questions, ideas, or partnership opportunities? We'd love to connect with you.",
    url: 'https://ridgeandroot.co.ke/contact',
  },
}

const INFO_ITEMS = [
  {
    title: 'EMAIL US',
    value: 'indulge@ridgeandroot.co.ke',
    href: getMailtoUrl('indulge@ridgeandroot.co.ke', 'Customer Enquiry — Ridge & Root'),
    icon: Mail,
  },
  {
    title: 'PHONE & WHATSAPP',
    value: '+254182257223',
    href: 'https://wa.me/254182257223',
    icon: Phone,
  },
  {
    title: 'OUR OFFICE',
    value: 'Sameer Industrial Park, Unit 8, Road C off Enterprise Road | Nairobi, Kenya',
    href: null,
    icon: MapPin,
  },
  {
    title: 'WHOLESALE INQUIRIES',
    value: 'wholesale@ridgeandroot.co.ke',
    href: getMailtoUrl('wholesale@ridgeandroot.co.ke', 'Wholesale Enquiry — Ridge & Root'),
    icon: Building2,
  },
  {
    title: 'PARTNERSHIPS & COLLABORATIONS',
    value: 'partnerships@ridgeandroot.co.ke',
    href: getMailtoUrl('partnerships@ridgeandroot.co.ke', 'Partnership Enquiry — Ridge & Root'),
    icon: Users,
  },
]

export default function ContactPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative h-[56vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/contact_hero_mountain.png"
          alt="Misty Kenyan highland mountains at golden light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-lg">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-cream">
                Let&apos;s Grow
                <br />
                Together.
              </h1>
              <div className="mt-6 sm:mt-8">
                <PillLink href="#newsletter">Join Our Journey</PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ribbon — Hero → Contact section */}
      <GoldRibbon />

      {/* Two-column balanced contact section */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Column — Heading + Form */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust">
                  Get in Touch
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl leading-snug text-ink md:text-4xl">
                  We&apos;d love to
                  <br />
                  hear from you.
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-ink/75 sm:text-base">
                  Questions, retail orders, private-label collaborations, or farm partnership ideas? Send us a message and our team in Nairobi will respond promptly.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>

            {/* Right Column — Contact Information Card */}
            <div className="rounded-2xl border border-gold/35 bg-cream p-8 sm:p-10 lg:p-12">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust">
                  Direct Inquiries
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                  Contact Information
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70">
                  Connect directly with our operations, export, and client relations specialists.
                </p>
              </div>

              <div className="my-8 h-px bg-gold/25" />

              <ul className="space-y-6 sm:space-y-7">
                {INFO_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="flex-1">
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="mt-1 block font-sans text-sm font-medium text-ink transition-colors hover:text-gold"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 font-sans text-sm leading-relaxed text-ink/80">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div id="newsletter">
        <Newsletter />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
