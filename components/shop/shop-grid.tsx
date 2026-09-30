'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { shopCards } from '@/lib/products'
import { formatCurrencyPrice, type Currency } from '@/lib/currency'

const SIZES = ['6 oz', '2 oz']

const FLAVOURS: { label: string; slug: string }[] = [
  { label: 'Classic Sea Salt', slug: 'classic-sea-salt' },
  { label: 'Salted Caramel', slug: 'golden-salted-caramel' },
  { label: 'Kenyan Coffee Roast', slug: 'kenyan-coffee-roast' },
  { label: 'Toasted Coconut', slug: 'toasted-coconut' },
  { label: 'Warm Chili', slug: 'warm-chili' },
  { label: 'Honey Glazed', slug: 'wildflower-honey-glaze' },
  { label: 'Chocolate Luxe', slug: 'chocolate-luxe' },
]

// 1 oz = 28.35 g, rounded to nearest gram
function ozToGrams(oz: string): string {
  const num = parseFloat(oz)
  if (isNaN(num)) return ''
  return `${Math.round(num * 28.35)} g`
}

function formatSizeLabel(size: string): string {
  return `${size} (${ozToGrams(size)})`
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="group flex cursor-pointer select-none items-center gap-3 font-sans text-sm text-ink/80 transition-colors duration-200 ease-in-out hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ease-in-out group-focus-within:ring-2 group-focus-within:ring-gold group-focus-within:ring-offset-1 ${
          checked
            ? 'border-gold bg-gold text-cream shadow-sm'
            : 'border-ink/25 bg-cream/70 group-hover:border-gold'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-cream" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2.5 6.5 5 9l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="transition-colors duration-200 group-hover:text-gold">{label}</span>
    </label>
  )
}

/** Sidebar filter panel — shared between desktop sidebar and mobile drawer.
 *  NOTE: Download Catalogue button has been moved to the shop hero. */
function FilterPanel({
  sizes,
  flavours,
  onSizeToggle,
  onFlavourToggle,
}: {
  sizes: string[]
  flavours: string[]
  onSizeToggle: (s: string) => void
  onFlavourToggle: (s: string) => void
}) {
  return (
    <>
      {/* Size filter */}
      <div>
        <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.25em] text-ink">
          Size
        </h3>
        <div className="space-y-3">
          {SIZES.map((s) => (
            <Checkbox
              key={s}
              label={formatSizeLabel(s)}
              checked={sizes.includes(s)}
              onChange={() => onSizeToggle(s)}
            />
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Flavour filter */}
      <div>
        <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.25em] text-ink">
          Flavour
        </h3>
        <div className="space-y-3">
          {FLAVOURS.map((f) => (
            <Checkbox
              key={f.slug}
              label={f.label}
              checked={flavours.includes(f.slug)}
              onChange={() => onFlavourToggle(f.slug)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export function ShopGrid({ currency = 'USD' }: { currency?: Currency }) {
  const [sizes, setSizes] = useState<string[]>([])
  const [flavours, setFlavours] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleSize = (value: string) => {
    setSizes((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]))
    setPage(1)
  }

  const toggleFlavour = (value: string) => {
    setFlavours((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]))
    setPage(1)
  }

  const filtered = shopCards.filter((card) => {
    const sizeOk = sizes.length === 0 || sizes.includes(card.size)
    const flavourOk = flavours.length === 0 || flavours.includes(card.product.slug)
    return sizeOk && flavourOk
  })

  const activeFilterCount = sizes.length + flavours.length

  return (
    <section className="bg-cream">
      {/* Mobile filter toggle bar */}
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 sm:px-6 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-gold"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-cream">
              {activeFilterCount}
            </span>
          )}
        </button>
        <p className="font-sans text-xs text-ink/50">{filtered.length} products</p>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="relative ml-auto flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-cream px-5 py-6 shadow-xl sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink">
                Filters
              </h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="text-ink/60 transition-colors duration-200 hover:text-gold"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel
              sizes={sizes}
              flavours={flavours}
              onSizeToggle={toggleSize}
              onFlavourToggle={toggleFlavour}
            />
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-full bg-gold py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
              >
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-14 md:flex-row md:gap-10 md:py-20">
        {/* Desktop filter sidebar — hidden on mobile, sticky */}
        <aside className="hidden md:block md:w-56 md:shrink-0">
          {/* Sticky card wrapper — top offset matches sticky header height */}
          <div className="sticky top-[140px] self-start rounded-2xl border border-gold/30 bg-cream p-6 shadow-sm shadow-gold/10">
            <FilterPanel
              sizes={sizes}
              flavours={flavours}
              onSizeToggle={toggleSize}
              onFlavourToggle={toggleFlavour}
            />
          </div>
        </aside>

        {/* Grid Area */}
        <div className="flex-1 min-w-0">
          {/* Deals teaser — directs shoppers to the DEALS tab on product page */}
          <Link
            href="/shop/classic-sea-salt#deals"
            className="group mb-8 flex items-center justify-between rounded-xl border border-gold/30 bg-gradient-to-r from-[#FDF3E3] via-cream to-[#FDF3E3] px-5 py-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
          >
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                Best Value
              </span>
              <p className="font-serif text-base text-ink group-hover:text-gold transition-colors">
                Variety Multipacks Mix &amp; match and save
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-gold bg-gold/10 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gold transition-all duration-200 group-hover:bg-gold group-hover:text-cream">
              See Deals
            </span>
          </Link>


          {/* Equal-height card grid with prominent imagery and proportionate typography */}
          <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((card, i) => (
              <div
                key={`${card.product.slug}-${card.size}-${i}`}
                className="group flex flex-col items-center rounded-2xl border border-gold/20 bg-cream p-4 sm:p-5 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-gold/40 hover:bg-cream hover:shadow-[0_12px_28px_rgba(31,57,63,0.08)]"
              >
                {/* Product image — large, prominent, uncropped */}
                <Link
                  href={`/shop/${card.product.slug}`}
                  className="relative flex h-80 sm:h-[360px] md:h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-cream/70"
                >
                  <Image
                    src={card.product.image || '/placeholder.svg'}
                    alt={`${card.product.name} dry roasted macadamia nuts pouch`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain scale-[1.82] sm:scale-[1.9] -translate-x-[5%] transition-transform duration-300 ease-in-out group-hover:scale-[1.96]"
                  />
                </Link>

                {/* Product name — proportionate font */}
                <Link
                  href={`/shop/${card.product.slug}`}
                  className="mt-4 sm:mt-5 font-serif text-lg sm:text-xl text-ink transition-colors duration-200 hover:text-gold"
                >
                  {card.product.name}
                </Link>

                {/* Subtitle */}
                <p className="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50">
                  Dry Roasted Macadamia Nuts
                </p>

                {/* Size label — with gram equivalent */}
                <p className="mt-1 font-sans text-xs text-ink/50">
                  {formatSizeLabel(card.size)}
                </p>

                {/* Price — auto-detected currency */}
                <div className="mt-2 text-center">
                  <p className="font-sans text-sm font-semibold text-ink">
                    {formatCurrencyPrice(currency, card.size, 1, card.product.slug)}
                  </p>
                </div>

                {/* CTA — pushed to bottom with mt-auto */}
                <div className="mt-auto pt-4 w-full max-w-xs">
                  <Link
                    href={`/shop/${card.product.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center font-sans text-sm text-ink/60">
              No products match your filters.
            </p>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-gold/60 p-2 text-gold transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gold hover:text-cream hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-full font-sans text-sm transition-all duration-200 ease-in-out ${
                  page === p ? 'bg-gold text-cream' : 'text-ink hover:text-gold hover:scale-110'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="rounded-full border border-gold/60 p-2 text-gold transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gold hover:text-cream hover:shadow-md"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
