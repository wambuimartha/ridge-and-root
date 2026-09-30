'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Minus, Plus } from 'lucide-react'
import { products, buildWhatsAppEnquiry, MULTIPACKS, PREMIUM_KSH_SLUGS, type Product } from '@/lib/products'
import { WhatsAppButton } from '@/components/site/buttons'
import { formatCurrencyPrice, type Currency } from '@/lib/currency'

export interface ProductSizeOption {
  label: string
  shortLabel: string
  key: string
  usdUnit: number
  kesUnit: number
}

function getSizeOptionsForProduct(slug: string): ProductSizeOption[] {
  const isPremium = PREMIUM_KSH_SLUGS.has(slug)
  return [
    {
      label: '2 oz (57g)',
      shortLabel: '2 oz',
      key: '2oz',
      usdUnit: 5.49,
      kesUnit: isPremium ? 250 : 220,
    },
    {
      label: '6 oz (170g)',
      shortLabel: '6 oz',
      key: '6oz',
      usdUnit: 14.99,
      kesUnit: isPremium ? 670 : 650,
    },
  ]
}

const TABS = ['DESCRIPTION', 'INGREDIENTS', 'NUTRITION', 'REVIEWS', 'DEALS']

// Map a product slug to its flavor-matched tote lifestyle image
function toteImageForSlug(slug: string): string {
  const key = slug.replace(/-/g, '_')
  return `/images/lifestyle_tote_${key}.png`
}

export function ProductDetail({
  product,
  currency = 'USD',
}: {
  product: Product
  currency?: Currency
}) {
  const sizeOptions = getSizeOptionsForProduct(product.slug)
  const gallery = [
    { src: product.image, alt: `${product.name} dry-roasted macadamia nuts pouch, front` },
    { src: product.backImage, alt: `${product.name} dry-roasted macadamia nuts pouch, back with nutrition facts` },
    { src: '/images/productpage_main_hero1.png', alt: `${product.name} pouch displayed alongside whole macadamia nuts and seasonings` },
    { src: '/images/productpage_lifestyle_secondary.png', alt: 'Roasted macadamia nuts served in a small bowl on a wooden surface' },
    {
      src: toteImageForSlug(product.slug),
      alt: `A hand placing a ${product.name} Ridge & Root macadamia pouch into a canvas tote bag`,
    },
  ]
  const [mainImg, setMainImg] = useState(0)
  const [selectedOption, setSelectedOption] = useState(sizeOptions[1]) // default 6 oz
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('DESCRIPTION')
  const formatPrice = (sizeOrType: string, q: number = 1) =>
    formatCurrencyPrice(currency, sizeOrType, q, product.slug)

  // Listen to hash changes (e.g. #deals or #reviews) to switch tabs and scroll
  useEffect(() => {
    const handleHash = () => {
      const hash = (typeof window !== 'undefined' ? window.location.hash : '').toLowerCase()
      if (hash === '#deals') {
        setTab('DEALS')
        setTimeout(() => {
          document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else if (hash === '#reviews') {
        setTab('REVIEWS')
        setTimeout(() => {
          document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Compute display price from the toggle-selected currency, using fixed price schedule
  const displayPrice = formatPrice(selectedOption.key, qty)

  const others = products.filter((p) => p.slug !== product.slug)
  const [otherStart, setOtherStart] = useState(0)
  const visibleOthers = [0, 1, 2].map(
    (o) => others[(otherStart + o) % others.length],
  )

  const enquiryUrl = buildWhatsAppEnquiry({
    productName: product.name,
    slug: product.slug,
    size: selectedOption.label,
    qty,
    formattedPrice: displayPrice,
    productUrl:
      typeof window !== 'undefined'
        ? `${window.location.origin}/shop/${product.slug}`
        : `https://ridgeandroot.co.ke/shop/${product.slug}`,
  })

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/shop" className="hover:text-gold">Shop</Link>
          <span className="mx-2">&gt;</span>
          <span>Macadamia Nuts</span>
          <span className="mx-2">&gt;</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-14 items-start">
          {/* Left: gallery */}
          <div className="min-w-0">
            {/* Main image container — stable, consistent height across slides so switching between front and back never causes layout jumps */}
            <div className="relative flex h-[340px] sm:h-[420px] md:h-[460px] w-full items-center justify-center overflow-hidden rounded-2xl border border-gold/15 bg-cream">
              <Image
                src={gallery[mainImg].src || '/placeholder.svg'}
                alt={gallery[mainImg].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`transition-transform duration-200 ease-in-out ${
                  mainImg === 0 || mainImg === 1
                    ? 'object-contain scale-[1.2] sm:scale-[1.24]'
                    : mainImg === 4
                    ? 'object-cover object-[70%_center]'
                    : 'object-contain'
                }`}
              />
            </div>

            {/* Thumbnail selector */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setMainImg((i) => (i - 1 + gallery.length) % gallery.length)}
                className="shrink-0 rounded-full border border-gold/60 p-1.5 text-gold transition-colors hover:bg-gold hover:text-cream"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <div className="flex flex-1 gap-1.5 sm:gap-3 min-w-0 overflow-x-auto no-scrollbar">
                {gallery.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMainImg(i)}
                    className={`relative flex h-14 sm:h-20 flex-1 min-w-[48px] items-center justify-center overflow-hidden rounded-lg border bg-cream transition-all duration-150 ${
                      mainImg === i ? 'border-gold ring-1 ring-gold shadow-sm' : 'border-ink/15 hover:border-gold/50'
                    }`}
                  >
                    <Image
                      src={item.src || '/placeholder.svg'}
                      alt={item.alt}
                      fill
                      sizes="80px"
                      className={`${
                        i === 4
                          ? 'object-cover object-[70%_center]'
                          : 'object-contain p-1'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setMainImg((i) => (i + 1) % gallery.length)}
                className="shrink-0 rounded-full border border-gold/60 p-1.5 text-gold transition-colors hover:bg-gold hover:text-cream"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="min-w-0">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ color: product.accent }}>
              {product.name}
            </h1>
            <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
              Dry Roasted Macadamia Nuts
            </p>
            <p className="mt-3 font-serif text-base sm:text-lg italic text-ink/80">
              {product.heading}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-gold">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <span className="font-sans text-xs text-ink/60">(12 reviews)</span>
            </div>

            {/* Price — updates with selected size and quantity live */}
            <div className="mt-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="font-serif text-2xl sm:text-3xl text-ink font-semibold">
                  {displayPrice}
                </p>
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-6 sm:mt-7">
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                Select Size
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`flex flex-col items-start rounded-xl border p-3 sm:p-3.5 text-left transition-all ${
                      selectedOption.key === opt.key
                        ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-sm'
                        : 'border-ink/20 bg-cream/50 hover:border-gold/50'
                    }`}
                  >
                    <span className="font-sans text-xs font-bold text-ink">
                      {opt.label}
                    </span>
                    <span className="mt-1 font-sans text-xs font-semibold text-gold">
                      {formatPrice(opt.key)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Multipack deals quick banner */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setTab('DEALS')
                    document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group flex w-full items-center justify-between rounded-xl border border-gold/30 bg-gradient-to-r from-[#FDF3E3] via-cream to-[#FDF3E3] px-3.5 py-2.5 text-left transition-all hover:border-gold hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-rust/10 border border-rust/30 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-rust">
                      Best Value
                    </span>
                    <span className="font-sans text-xs font-medium text-ink">
                      Looking for 3-pack or 6-pack bundles?
                    </span>
                  </div>
                  <span className="font-sans text-xs font-semibold text-gold group-hover:underline">
                    See Multipack Deals →
                  </span>
                </button>
              </div>
            </div>

            <p className="mt-5 font-sans text-xs text-ink/60">
              Free shipping on orders over $75
            </p>

            {/* Quantity + CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-ink/25 rounded-md overflow-hidden bg-cream/40">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-ink hover:text-gold transition-colors"
                >
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center font-sans text-sm text-ink">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-3 text-ink hover:text-gold transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <WhatsAppButton href={enquiryUrl}>
                Enquire on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* Secondary lifestyle image — flavor-matched tote */}
        <div className="relative mt-16 h-[300px] md:h-[420px] w-full overflow-hidden">
          <Image
            src={toteImageForSlug(product.slug)}
            alt={`A hand holding a ${product.name} Ridge & Root macadamia pouch over a canvas tote bag`}
            fill
            sizes="100vw"
            className="object-cover object-[70%_35%] md:object-[70%_center]"
          />
        </div>

        {/* Tabs */}
        <div id="deals" className="mt-10 sm:mt-12 scroll-mt-24">
          <div className="flex gap-4 sm:gap-6 border-b border-ink/15 overflow-x-auto no-scrollbar pb-px">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 pb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] whitespace-nowrap shrink-0 transition-colors ${
                  tab === t ? 'border-gold text-ink' : 'border-transparent text-ink/50 hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {/* 1. DESCRIPTION TAB */}
            {tab === 'DESCRIPTION' && (
              <div className="max-w-3xl">
                <h2 className="font-serif text-2xl sm:text-3xl text-ink">{product.heading}</h2>
                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-ink/80">
                  {product.description}
                </p>
                <ul className="mt-8 space-y-3.5">
                  {['GOOD SOURCE OF FIBER', 'GLUTEN-FREE', 'RICH IN HEALTHY FATS'].map((b) => (
                    <li key={b} className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                      <span className="text-gold font-serif text-sm">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 2. INGREDIENTS TAB */}
            {tab === 'INGREDIENTS' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-ink">Ingredients</h2>
                  <p className="mt-4 font-sans text-base leading-relaxed text-ink/80">
                    {product.ingredients}
                  </p>
                </div>

                <div className="rounded-xl border border-rust/30 bg-rust/5 p-5">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-rust">
                    Allergen Statement
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/80">
                    {product.allergen}
                  </p>
                </div>

                <div className="pt-2 text-ink/60 font-sans text-xs">
                  <p>✓ 100% Single-Origin Kenyan Macadamia Kernels</p>
                  <p className="mt-1">✓ Non-GMO &amp; Naturally Gluten-Free</p>
                </div>
              </div>
            )}

            {/* 3. NUTRITION TAB */}
            {tab === 'NUTRITION' && (
              <div className="max-w-sm rounded-xl border border-teal-dark/20 bg-cream p-5 shadow-sm font-sans">
                <h2 className="border-b-2 border-teal-dark pb-1 font-sans text-xl font-black uppercase tracking-tight text-teal-dark">
                  Nutrition Facts
                </h2>
                <p className="mt-1 text-xs text-ink/60">
                  {product.nutrition.servingsPerContainer} servings per container
                </p>
                <div className="flex justify-between border-b border-teal-dark/20 pb-1 font-bold text-xs sm:text-sm text-ink">
                  <span>Serving size</span>
                  <span>{product.nutrition.servingSize}</span>
                </div>

                <div className="flex items-baseline justify-between border-b-4 border-teal-dark py-1.5">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-ink/60">Amount Per Serving</p>
                    <p className="text-xl font-black text-teal-dark">Calories</p>
                  </div>
                  <span className="text-2xl font-black text-teal-dark">{product.nutrition.calories}</span>
                </div>

                <div className="border-b border-teal-dark/20 py-0.5 text-right text-[10px] font-bold text-ink/70">
                  % Daily Value*
                </div>

                {/* Macro nutrients */}
                <div className="divide-y divide-teal-dark/10 text-xs text-ink">
                  <div className="flex justify-between py-1">
                    <span><strong className="font-bold">Total Fat</strong> {product.nutrition.totalFat.amount}</span>
                    <span className="font-bold">{product.nutrition.totalFat.dv}</span>
                  </div>
                  <div className="flex justify-between py-1 pl-3 text-[11px] text-ink/80">
                    <span>Saturated Fat {product.nutrition.satFat.amount}</span>
                    <span className="font-bold">{product.nutrition.satFat.dv}</span>
                  </div>
                  <div className="flex justify-between py-1 pl-3 text-[11px] text-ink/80">
                    <span><em>Trans</em> Fat {product.nutrition.transFat.amount}</span>
                    <span />
                  </div>
                  <div className="flex justify-between py-1">
                    <span><strong className="font-bold">Cholesterol</strong> {product.nutrition.cholesterol.amount}</span>
                    <span className="font-bold">{product.nutrition.cholesterol.dv}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span><strong className="font-bold">Sodium</strong> {product.nutrition.sodium.amount}</span>
                    <span className="font-bold">{product.nutrition.sodium.dv}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span><strong className="font-bold">Total Carbohydrate</strong> {product.nutrition.totalCarb.amount}</span>
                    <span className="font-bold">{product.nutrition.totalCarb.dv}</span>
                  </div>
                  <div className="flex justify-between py-1 pl-3 text-[11px] text-ink/80">
                    <span>Dietary Fiber {product.nutrition.dietaryFiber.amount}</span>
                    <span className="font-bold">{product.nutrition.dietaryFiber.dv}</span>
                  </div>
                  <div className="flex justify-between py-1 pl-3 text-[11px] text-ink/80">
                    <span>Total Sugars {product.nutrition.totalSugars.amount}</span>
                    <span />
                  </div>
                  {product.nutrition.totalSugars.added && (
                    <div className="flex justify-between py-1 pl-6 text-[11px] text-ink/70">
                      <span>Includes {product.nutrition.totalSugars.added} Added Sugars</span>
                      <span className="font-bold">{product.nutrition.totalSugars.addedDv || ''}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b-4 border-teal-dark py-1">
                    <span><strong className="font-bold">Protein</strong> {product.nutrition.protein.amount}</span>
                    <span />
                  </div>
                </div>

                {/* Vitamins & Minerals */}
                <div className="mt-1 divide-y divide-teal-dark/10 text-[11px] text-ink/80">
                  {product.nutrition.vitamins.map((v) => (
                    <div key={v.name} className="flex justify-between py-1">
                      <span>{v.name} {v.amount}</span>
                      <span className="font-bold">{v.dv}</span>
                    </div>
                  ))}
                  {product.nutrition.micronutrients.map((m) => (
                    <div key={m.name} className="flex justify-between py-1">
                      <span>{m.name} {m.amount}</span>
                      <span className="font-bold">{m.dv}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 border-t border-teal-dark/20 pt-2 text-[9px] leading-relaxed text-ink/50">
                  * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                </p>
              </div>
            )}


            {/* 4. REVIEWS TAB */}
            {tab === 'REVIEWS' && (
              <div className="max-w-3xl space-y-8">
                {/* Summary header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-gold">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} className="h-5 w-5 fill-current" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="font-serif text-xl text-ink font-bold">5.0 out of 5</span>
                    </div>
                    <p className="mt-1 font-sans text-xs sm:text-sm text-ink/60">Based on 12 verified customer reviews</p>
                  </div>
                  <span className="rounded-full border border-gold px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    100% Recommended
                  </span>
                </div>

                {/* Review cards */}
                <div className="space-y-6">
                  {product.reviews.map((rev, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-cream/60 p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex text-gold">
                            {Array.from({ length: rev.rating }).map((_, s) => (
                              <Star key={s} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                            ))}
                          </div>
                          <span className="font-serif text-base font-semibold text-ink">{rev.title}</span>
                        </div>
                        <span className="font-sans text-xs text-ink/50">{rev.date}</span>
                      </div>
                      <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-ink/80">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2 font-sans text-xs text-ink/60">
                        <span className="font-medium text-ink">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 rounded bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. DEALS TAB */}
            {tab === 'DEALS' && (
              <div className="max-w-3xl space-y-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink">Gift Packs & Deals</h2>
                  <p className="mt-2 font-sans text-sm text-ink/70">
                    Mix &amp; match your favourite flavours — the more you bundle, the more you save.
                  </p>
                </div>

                {MULTIPACKS.map((bundle) => {
                  const savingsDisplay = currency === 'KES'
                    ? `Save KSh ${(bundle.standardValueKes - bundle.priceKes).toLocaleString()}`
                    : `Save $${(bundle.standardValueUsd - bundle.priceUsd).toFixed(2)}`
                  const salePrice = currency === 'KES'
                    ? `KSh ${bundle.priceKes.toLocaleString()}`
                    : `$${bundle.priceUsd.toFixed(2)}`
                  const wasPrice = currency === 'KES'
                    ? `KSh ${bundle.standardValueKes.toLocaleString()}`
                    : `$${bundle.standardValueUsd.toFixed(2)}`
                  const bundleImage = bundle.id === 'pick-any-6-2oz'
                    ? '/images/allofthem.png'
                    : '/images/trio_pouches.png'
                  const waUrl = buildWhatsAppEnquiry({
                    productName: bundle.name,
                    slug: 'shop',
                    size: bundle.size,
                    qty: 1,
                    formattedPrice: salePrice,
                    productUrl:
                      typeof window !== 'undefined'
                        ? `${window.location.origin}/gift-packs`
                        : 'https://ridgeandroot.co.ke/gift-packs',
                  })

                  return (
                    <div
                      key={bundle.id}
                      className="rounded-2xl border border-gold/25 bg-gradient-to-br from-cream via-[#FDF3E3] to-cream shadow-sm overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-cream/70">
                        <Image
                          src={bundleImage}
                          alt={bundle.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="rounded-full bg-rust/10 border border-rust/30 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-rust">
                              {savingsDisplay}
                            </span>
                            <h3 className="mt-2 font-serif text-lg sm:text-xl text-ink">
                              {bundle.name}
                            </h3>
                            <p className="mt-0.5 font-sans text-xs text-ink/60 font-medium">
                              {bundle.size}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-ink/80">
                          {bundle.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-serif text-2xl font-bold text-ink">{salePrice}</span>
                            <span className="font-sans text-sm text-ink/40 line-through">{wasPrice}</span>
                            <span className="rounded-full bg-rust/10 border border-rust/25 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-rust">
                              {savingsDisplay}
                            </span>
                          </div>
                          <WhatsAppButton href={waUrl}>Order this Bundle</WhatsAppButton>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Corporate Gifting card */}
                <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-cream via-[#FDF3E3] to-cream shadow-sm overflow-hidden">
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-cream/70">
                    <Image
                      src="/images/corporate_gift.png"
                      alt="Custom Corporate Gifting"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-lg sm:text-xl text-ink">Custom Corporate Gifting</h3>
                    <p className="mt-0.5 font-serif text-base font-semibold text-gold">Custom Quote</p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ink/80">
                      Bespoke branded ribboning, customized gift cards, and worldwide white-glove direct shipping to clients and executive teams.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gold/20">
                      <WhatsAppButton
                        href={buildWhatsAppEnquiry({
                          productName: 'Custom Corporate Gifting',
                          slug: 'gift-packs',
                          formattedPrice: 'Custom Quote',
                          productUrl: typeof window !== 'undefined'
                            ? `${window.location.origin}/gift-packs`
                            : 'https://ridgeandroot.co.ke/gift-packs',
                        })}
                      >
                        Request a Quote
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Products */}
        <div className="mt-20">
          <h2 className="mb-8 text-center font-serif text-3xl text-ink">Other Products</h2>
          <div className="flex items-center gap-4 md:gap-8">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => setOtherStart((s) => (s - 1 + others.length) % others.length)}
              className="shrink-0 rounded-full border border-gold/60 p-2 text-gold transition-colors hover:bg-gold hover:text-cream"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
              {visibleOthers.map((p) => (
                <Link
                  key={p.slug}
                  href={`/shop/${p.slug}`}
                  className="group flex flex-col items-center text-center rounded-2xl border border-gold/20 bg-cream p-4 sm:p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-gold/40 hover:bg-cream hover:shadow-[0_12px_28px_rgba(31,57,63,0.08)]"
                >
                  <div className="relative flex h-64 sm:h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-cream/70 p-2">
                    <Image
                      src={p.image || '/placeholder.svg'}
                      alt={`${p.name} pouch`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain scale-[1.18] sm:scale-[1.22] transition-transform duration-300 ease-in-out group-hover:scale-[1.28]"
                    />
                  </div>
                  <p className="mt-4 font-serif text-lg sm:text-xl text-ink transition-colors duration-200 group-hover:text-gold">{p.name}</p>
                  <p className="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50">
                    Dry Roasted Macadamia Nuts
                  </p>
                  <p className="mt-1.5 font-sans text-xs font-semibold text-ink/70">
                    {formatPrice('6 oz')}
                  </p>
                </Link>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => setOtherStart((s) => (s + 1) % others.length)}
              className="shrink-0 rounded-full border border-gold/60 p-2 text-gold transition-colors hover:bg-gold hover:text-cream"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
