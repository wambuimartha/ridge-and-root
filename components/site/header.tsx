'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, Menu, X, ChevronRight } from 'lucide-react'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { SearchModal } from '@/components/site/search-modal'

const NAV = [
  { label: 'HOME', href: '/' },
  { label: 'OUR STORY', href: '/our-story' },
  { label: 'WHY MACADAMIAS', href: '/why-macadamias' },
  { label: 'SHOP', href: '/shop' },
  { label: 'WHOLESALE', href: '/wholesale' },
  { label: 'CONTACT', href: '/contact' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

function Logo({
  variant = 'dark',
  className = '',
  imgClassName = '',
  priority = false,
}: {
  variant?: 'dark' | 'light'
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  const src =
    variant === 'light'
      ? '/RidgeRoot_Header_Wordmark_Cream-v2.png'
      : '/RidgeRoot_Header_Wordmark_Burgundy-v2.png'

  return (
    <Link
      href="/"
      className={`inline-flex max-w-full items-center justify-center transition-opacity duration-200 hover:opacity-85 ${className}`}
      aria-label="Ridge & Root home"
    >
      <Image
        src={src}
        alt="Ridge & Root"
        width={980}
        height={113}
        priority={priority}
        sizes="(max-width: 640px) 240px, (max-width: 768px) 350px, (max-width: 1024px) 420px, 490px"
        className={
          imgClassName ||
          'h-7 min-[380px]:h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-full object-contain'
        }
      />
    </Link>
  )
}

function MacadamiaBotanicalPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="macadamia-menu-pattern"
          width="320"
          height="320"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#71D5E4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-20 40 Q 60 70 140 50 T 260 90" />
            <path d="M40 60 C 20 20 60 0 85 20 C 105 40 70 65 40 60 Z" />
            <path d="M42 58 Q 65 35 80 23" />
            <path d="M52 48 Q 58 40 65 43" />
            <path d="M60 40 Q 66 32 73 35" />
            <path d="M100 55 C 90 20 130 5 155 25 C 170 45 130 65 100 55 Z" />
            <path d="M103 53 Q 128 35 150 28" />
            <path d="M115 45 Q 120 37 130 40" />
            <path d="M70 65 C 55 95 85 125 105 110 C 120 95 95 70 70 65 Z" />
            <path d="M72 68 Q 90 92 100 105" />
            <path d="M120 53 Q 125 75 130 90" />
            <path d="M130 90 L 115 105" />
            <path d="M130 90 L 145 105" />
            <path d="M130 90 L 130 115" />
            <circle cx="112" cy="118" r="14" />
            <path d="M105 110 C 108 120 118 125 124 116" strokeDasharray="1 3" />
            <circle cx="150" cy="116" r="13" />
            <path d="M142 105 C 137 114 140 126 148 128" />
            <path d="M158 105 C 163 114 160 125 153 128" />
            <circle cx="130" cy="132" r="15" />
            <circle cx="130" cy="132" r="10" strokeDasharray="2 3" />
            <path d="M180 340 Q 220 250 290 220" />
            <path d="M210 270 C 175 255 185 215 215 210 C 245 205 240 250 210 270 Z" />
            <path d="M210 267 Q 212 235 215 213" />
            <path d="M211 250 Q 200 242 195 245" />
            <path d="M213 235 Q 225 228 230 232" />
            <path d="M250 235 C 255 195 295 190 310 215 C 320 240 280 260 250 235 Z" />
            <path d="M253 234 Q 280 215 305 215" />
            <path d="M235 245 Q 245 265 240 280" />
            <circle cx="232" cy="292" r="14" />
            <circle cx="255" cy="285" r="12" />
            <path d="M245 280 L 255 285" />
            <path d="M270 40 C 255 20 280 5 295 18 C 305 30 285 45 270 40 Z" />
            <path d="M272 38 Q 285 25 292 20" />
            <path d="M285 45 Q 295 55 290 65" />
            <circle cx="290" cy="74" r="11" />
            <path d="M-10 220 Q 30 210 50 240" />
            <path d="M15 215 C 10 185 45 180 55 200 C 65 220 35 235 15 215 Z" />
            <path d="M17 213 Q 35 200 50 200" />
            <circle cx="48" cy="254" r="13" />
            <path d="M30 300 Q 70 305 100 285" />
            <path d="M55 302 C 50 280 75 270 85 285 C 92 298 75 310 55 302 Z" />
            <circle cx="95" cy="305" r="12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#macadamia-menu-pattern)" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile drawer whenever the route changes (e.g. back/forward nav)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the drawer or search modal is open
  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, searchOpen])

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      {/* Top teal bar */}
      <div className="bg-teal-dark py-2 text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-cream/90">
          Rooted in Kenya. Crafted for the World.
        </p>
      </div>

      {/* Main header */}
      <div
        className={`bg-cream/95 backdrop-blur-sm transition-colors duration-200 ${
          scrolled ? 'bg-cream shadow-sm' : 'bg-cream/95'
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 md:py-5">
          {/* Mobile hamburger — left on mobile only */}
          <div className="flex w-10 shrink-0 items-center md:hidden">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="-m-2 rounded-full p-2.5 text-teal-dark transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo + nav centered — takes full central width on desktop */}
          <div className="flex flex-1 min-w-0 flex-col items-center justify-center">
            <Logo variant="dark" priority />
            <nav className="mt-2.5 hidden w-full md:block">
              <ul className="flex items-center justify-center gap-5 sm:gap-6 md:gap-7 lg:gap-8 flex-nowrap">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href} className="shrink-0">
                      <Link
                        href={item.href}
                        className={`relative whitespace-nowrap font-sans text-[11px] lg:text-xs font-medium uppercase tracking-[0.14em] lg:tracking-[0.18em] transition-colors duration-200 ease-in-out hover:text-gold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-full ${
                          active ? 'text-gold after:w-full' : 'text-teal-dark'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Right search icon — cleanly aligned on the right */}
          <div className="flex w-10 shrink-0 items-center justify-end md:absolute md:right-6 lg:right-8 md:top-1/2 md:-translate-y-1/2">
            <button
              type="button"
              aria-label="Search flavors and products"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-teal-dark transition-all duration-200 ease-in-out hover:bg-gold/15 hover:text-gold hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Mobile drawer panel — content-sized, rounded bottom-left edge, translucent teal with botanical pattern */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{ width: 'min(90vw, 380px)' }}
        className={`fixed top-0 right-0 z-50 flex flex-col overflow-hidden rounded-bl-3xl border-b border-l border-cream/20 bg-teal-dark/95 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out motion-reduce:transition-none md:hidden ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Subtle radial vignette / depth overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-dark/60 via-transparent to-black/35"
          aria-hidden="true"
        />

        {/* Macadamia Botanical Line-Art SVG Pattern */}
        <MacadamiaBotanicalPattern />

        {/* Header row: logo + close */}
        <div className="relative z-10 flex items-center justify-between border-b border-cream/15 px-6 py-4">
          {open && (
            <Logo
              variant="light"
              priority
              imgClassName="h-7 min-[360px]:h-8 w-auto object-contain max-w-[200px] min-[360px]:max-w-[230px]"
            />
          )}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="-m-2 rounded-full p-2.5 text-cream transition-colors duration-200 hover:bg-cream/10 hover:text-gold"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Search */}
        <div className="relative z-10 px-6 py-3.5">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setSearchOpen(true)
            }}
            className="flex w-full items-center gap-3 rounded-xl border border-cream/25 bg-cream/[0.08] px-4 py-3 text-left transition-colors duration-200 hover:bg-cream/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Search className="h-[18px] w-[18px] shrink-0 text-gold-light" strokeWidth={1.5} />
            <span className="font-sans text-sm text-cream/85">Search flavors &amp; products</span>
          </button>
        </div>

        {/* Primary nav — ends naturally below the last nav item */}
        <nav className="relative z-10 flex flex-col border-t border-cream/10 px-2 pb-5 pt-1">
          {NAV.map((item, i) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
                className={`group flex items-center justify-between border-l-2 px-4 py-3.5 font-sans text-[15px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
                } ${
                  active
                    ? 'border-gold bg-cream/[0.08] text-gold'
                    : 'border-transparent text-cream hover:border-cream/20 hover:bg-cream/[0.04] hover:text-gold'
                }`}
              >
                {item.label}
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    active ? 'text-gold' : 'text-cream/40 group-hover:text-gold/70'
                  }`}
                  strokeWidth={1.5}
                />
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Interactive Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Gold ribbon divider — appears sitewide beneath the header */}
      <GoldRibbon />
    </header>
  )
}