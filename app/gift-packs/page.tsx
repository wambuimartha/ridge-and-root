import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Newsletter } from '@/components/site/newsletter'
import { WhatsAppButton } from '@/components/site/buttons'
import { TealBand } from '@/components/site/teal-band'
import { buildWhatsAppEnquiry } from '@/lib/products'
import { getServerCurrency } from '@/lib/currency-server'

export const metadata: Metadata = {
  title: 'Gift Packs & Collections — Ridge & Root',
  description: 'Celebrate meaningful moments with the purest single-origin Kenyan macadamias. Handcrafted variety multipacks and corporate gifting.',
}

const GIFT_SETS = [
  {
    id: 'pick-any-6-2oz',
    name: '"Pick Any 6" 2 oz Variety Multipack',
    priceUsd: 29.99,
    priceKes: 1250,
    standardUsd: 32.94,
    standardKes: 1320,
    description:
      'Select any 6 pocket-sized 2 oz pouches across our 7 signature flavours. Perfect for holidays, sampling, and gifting.',
    image: '/images/allofthem.png',
  },
  {
    id: 'pick-any-3-6oz',
    name: '"Pick Any 3" 6 oz Sharing Multipack',
    priceUsd: 42.99,
    priceKes: 1850,
    standardUsd: 44.97,
    standardKes: 1950,
    description:
      'A curated selection of 3 full-sized 6 oz sharing pouches across our signature sweet and savory varieties.',
    image: '/images/trio_pouches.png',
  },
  {
    id: 'corporate',
    name: 'Custom Corporate Gifting',
    priceUsd: null,
    priceKes: null,
    standardUsd: null,
    standardKes: null,
    description:
      'Bespoke branded ribboning, customized gift cards, and worldwide white-glove direct shipping to clients and executive teams.',
    image: '/images/corporate_gift.png',
  },
]

export default async function GiftPacksPage() {
  const currency = await getServerCurrency()

  return (
    <main>
      <Header />

      <TealBand
        hasTopRibbon={false}
        eyebrow="Luxury Gifting"
        heading="Gift Packs & Collections"
        description="Celebrate meaningful moments with the purest single-origin Kenyan macadamias."
      />


      <section className="bg-cream py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {GIFT_SETS.map((gift) => {
              const isCorporate = gift.id === 'corporate'

              // Currency-aware prices
              const displayPrice = isCorporate
                ? 'Custom Quote'
                : currency === 'KES'
                ? `KSh ${gift.priceKes!.toLocaleString()}`
                : `$${gift.priceUsd!.toFixed(2)}`

              const displayStandard =
                !isCorporate && gift.standardUsd && gift.standardKes
                  ? currency === 'KES'
                    ? `KSh ${gift.standardKes.toLocaleString()}`
                    : `$${gift.standardUsd.toFixed(2)}`
                  : null

              const savingsBadge =
                !isCorporate && gift.standardUsd && gift.standardKes
                  ? currency === 'KES'
                    ? `Save KSh ${(gift.standardKes - gift.priceKes!).toLocaleString()}`
                    : `Save $${(gift.standardUsd - gift.priceUsd!).toFixed(2)}`
                  : null

              const waUrl = buildWhatsAppEnquiry({
                productName: gift.name,
                slug: 'gift-packs',
                formattedPrice: displayPrice,
                productUrl: 'https://ridgeandroot.co.ke/gift-packs',
              })

              return (
                <div
                  key={gift.id}
                  className="flex flex-col rounded-2xl border border-gold/20 bg-cream shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-56 sm:h-64 w-full bg-cream/70 overflow-hidden">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h2 className="font-serif text-lg sm:text-xl text-ink">
                      {gift.name}
                    </h2>

                    {/* Price row */}
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <p className={`font-serif text-lg font-semibold ${isCorporate ? 'text-gold' : 'text-ink'}`}>
                        {displayPrice}
                      </p>
                      {displayStandard && (
                        <span className="font-sans text-xs text-ink/40 line-through">
                          {displayStandard}
                        </span>
                      )}
                      {savingsBadge && (
                        <span className="rounded-full bg-rust/10 border border-rust/30 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-rust">
                          {savingsBadge}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink/70">
                      {gift.description}
                    </p>

                    <div className="mt-6 w-full">
                      <WhatsAppButton href={waUrl} size="sm">
                        {isCorporate ? 'Request a Quote' : 'Order on WhatsApp'}
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  )
}


