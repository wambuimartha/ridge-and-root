'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, ArrowRight } from 'lucide-react'
import { products, type Product } from '@/lib/products'
import { formatCurrencyPrice, getClientCurrency, type Currency } from '@/lib/currency'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const QUICK_TAGS = [
  'Sea Salt',
  'Salted Caramel',
  'Kenyan Coffee',
  'Warm Chili',
  'Toasted Coconut',
  'Honey Glazed',
  'Chocolate Luxe',
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [currency, setCurrency] = useState<Currency>('USD')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on open & lock background scroll
  useEffect(() => {
    if (isOpen) {
      setCurrency(getClientCurrency())
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.toLowerCase().trim()
  const filtered = products.filter((p) => {
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.heading.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q)
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start overflow-y-auto bg-black/50 p-3 pt-12 backdrop-blur-sm sm:p-4 sm:pt-24">
      {/* Click-outside backdrop */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl sm:rounded-2xl border border-gold/40 bg-[#FFF0D7] shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-ink/10 px-3 py-3 sm:px-6 sm:py-4">
          <Search className="h-5 w-5 shrink-0 text-gold" strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flavors, ingredients, products..."
            className="w-full bg-transparent px-3 font-sans text-sm text-ink placeholder:text-ink/40 focus:outline-none sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mr-2 text-xs font-semibold uppercase tracking-wider text-ink/40 hover:text-ink"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-ink/5 bg-[#F9E8CE] px-4 py-2.5 sm:px-6">
          <span className="mr-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/50">
            Suggested:
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className={`rounded-full border px-2.5 py-1 font-sans text-xs transition-colors ${
                q && tag.toLowerCase().includes(q)
                  ? 'border-gold bg-gold text-cream'
                  : 'border-ink/15 bg-cream/70 text-ink/75 hover:border-gold hover:text-ink'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-3 flex items-center justify-between font-sans text-xs uppercase tracking-[0.18em] text-ink/60">
            <span>
              {q ? `Found ${filtered.length} matching item${filtered.length === 1 ? '' : 's'}` : 'Signature Varieties'}
            </span>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-gold transition-colors hover:text-brown"
            >
              View All in Shop &rarr;
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="divide-y divide-ink/10">
              {filtered.map((item: Product) => (
                <Link
                  key={item.slug}
                  href={`/shop/${item.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between py-3 transition-colors hover:bg-black/5 rounded-lg px-2 -mx-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream/60 p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-base text-ink transition-colors group-hover:text-gold">
                        {item.name}
                      </p>
                      <p className="font-sans text-[11px] text-ink/60">
                        {item.heading}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">
                      {formatCurrencyPrice(currency, '6 oz', 1, item.slug)}
                    </span>
                    <span className="hidden rounded-full border border-gold/60 p-1 text-gold transition-colors group-hover:bg-gold group-hover:text-cream sm:flex">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-serif text-lg text-ink">No flavors found matching &ldquo;{query}&rdquo;</p>
              <p className="mt-2 font-sans text-xs text-ink/60">
                Try searching for Sea Salt, Caramel, Coffee, Chili, Coconut, Honey, or Chocolate.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-5 inline-flex rounded-full bg-gold px-6 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-opacity hover:opacity-90"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="border-t border-ink/10 bg-cream px-4 py-2.5 text-center font-sans text-[11px] text-ink/50 sm:px-6">
          Press <kbd className="rounded border border-ink/20 bg-cream/80 px-1.5 py-0.5 text-[10px]">ESC</kbd> or click outside to close
        </div>
      </div>
    </div>
  )
}
