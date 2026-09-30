'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '@/lib/products'
import { PillLink } from '@/components/site/buttons'

type CarouselSlide = {
  isGroup: boolean
  name: string
  subtitle: string
  image: string
  alt: string
}

const slides: CarouselSlide[] = [
  {
    isGroup: true,
    name: 'The Full Collection',
    subtitle:
      'Classic Sea Salt · Kenyan Coffee Roast · Wildflower Honey Glaze · Warm Chili · Golden Salted Caramel · Toasted Coconut · Chocolate Luxe',
    image: '/images/allofthem.png',
    alt: 'Ridge & Root all seven dry roasted macadamia nut flavors: Classic Sea Salt, Kenyan Coffee Roast, Wildflower Honey Glaze, Warm Chili, Golden Salted Caramel, Toasted Coconut, and Chocolate Luxe',
  },
  ...products.map((p) => ({
    isGroup: false,
    name: p.name,
    subtitle: 'Dry Roasted Macadamia Nuts',
    image: p.image,
    alt: `${p.name} dry roasted macadamia nuts pouch`,
  })),
]

export function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const dragStartY = useRef<number | null>(null)
  const isHorizontalSwipe = useRef<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const active = slides[index]

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length)
  }, [])

  // Touch event handlers for real-time swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX
    dragStartY.current = e.touches[0].clientY
    isHorizontalSwipe.current = null
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null || dragStartY.current === null) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const diffX = currentX - dragStartX.current
    const diffY = currentY - dragStartY.current

    // Determine direction on first significant movement
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY)
      }
    }

    if (isHorizontalSwipe.current) {
      // Prevent page scrolling while horizontally swiping
      if (e.cancelable) e.preventDefault()
      // Dampen drag at boundaries
      const isAtStart = index === 0 && diffX > 0
      const isAtEnd = index === slides.length - 1 && diffX < 0
      const dampedDiff = isAtStart || isAtEnd ? diffX * 0.35 : diffX
      setDragOffset(dampedDiff)
    }
  }

  const handleTouchEnd = () => {
    if (isHorizontalSwipe.current && Math.abs(dragOffset) > 40) {
      if (dragOffset < 0) {
        next()
      } else {
        prev()
      }
    }
    dragStartX.current = null
    dragStartY.current = null
    isHorizontalSwipe.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    isHorizontalSwipe.current = true
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return
    const diffX = e.clientX - dragStartX.current
    const isAtStart = index === 0 && diffX > 0
    const isAtEnd = index === slides.length - 1 && diffX < 0
    const dampedDiff = isAtStart || isAtEnd ? diffX * 0.35 : diffX
    setDragOffset(dampedDiff)
  }

  const handleMouseUp = () => {
    if (isDragging && Math.abs(dragOffset) > 40) {
      if (dragOffset < 0) {
        next()
      } else {
        prev()
      }
    }
    dragStartX.current = null
    dragStartY.current = null
    isHorizontalSwipe.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  return (
    <section className="bg-gradient-to-b from-[#FFF0D7] via-[#F3E2CE] to-[#DEC6AA] select-none">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 py-10 md:py-16">
        {/* Ruled label */}
        <div className="mx-auto mb-8 sm:mb-12 flex max-w-2xl sm:max-w-3xl items-center gap-4 sm:gap-6 px-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
          <h2 className="font-sans text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ink text-center whitespace-nowrap">
            The Full Collection
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
        </div>

        {/* Carousel — fixed-height outer container with firmly pinned arrows */}
        <div className="relative h-[240px] sm:h-[320px] md:h-[390px] w-full max-w-4xl mx-auto">
          {/* Left arrow — pinned to outer edge, vertically centered */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-1 sm:left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold/70 bg-cream/80 backdrop-blur-sm text-gold shadow-sm transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gold hover:text-cream hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" strokeWidth={1.75} />
          </button>

          {/* Swipeable Viewport */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="h-full w-full overflow-hidden px-11 sm:px-16 md:px-20 touch-pan-y cursor-grab active:cursor-grabbing"
          >
            {/* Continuous horizontal slide track */}
            <div
              className={`flex h-full w-full ${
                isDragging ? 'transition-none' : 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
              }`}
              style={{
                transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
              }}
            >
              {slides.map((s, i) => (
                <div
                  key={s.name}
                  className="h-full w-full shrink-0 flex items-center justify-center px-2 sm:px-4"
                  aria-hidden={index !== i}
                >
                  <div className="relative flex h-full w-full max-w-2xl items-center justify-center overflow-hidden">
                    <Image
                      src={s.image || '/placeholder.svg'}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 700px"
                      draggable={false}
                      className={`pointer-events-none select-none transition-transform duration-300 ${
                        s.isGroup
                          ? 'object-contain max-h-[88%]'
                          : 'object-contain max-h-[95%] scale-105 sm:scale-110'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow — pinned to outer edge, vertically centered */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="absolute right-1 sm:right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold/70 bg-cream/80 backdrop-blur-sm text-gold shadow-sm transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gold hover:text-cream hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" strokeWidth={1.75} />
          </button>
        </div>

        {/* Slide indicators / pagination dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-200 ease-in-out ${
                index === i ? 'w-6 bg-gold shadow-sm' : 'w-2 bg-ink/20 hover:bg-ink/40 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Active title, subtitle, and CTA */}
        <div className="mt-6 text-center px-2 min-h-[58px] flex flex-col items-center justify-center">
          {!active.isGroup && (
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl uppercase tracking-wide text-ink transition-all duration-200">
              {active.name}
            </h3>
          )}
          <p
            className={`mx-auto font-sans text-xs font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-200 ${
              active.isGroup
                ? 'max-w-2xl text-[11px] sm:text-xs leading-relaxed text-ink/75 mt-0'
                : 'mt-2 text-ink/60'
            }`}
          >
            {active.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
