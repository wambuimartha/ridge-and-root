'use client'

import React from 'react'
import { GoldRibbon } from '@/components/site/gold-ribbon'
import { PillLink } from '@/components/site/buttons'

/**
 * Botanical Macadamia Line Art Pattern:
 * Outlined macadamia branches, oblong leaves with veins,
 * hanging nut clusters, and split husks.
 * Tiled seamlessly as a subtle background texture.
 */
function MacadamiaBotanicalPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="macadamia-leaves-nuts"
          width="320"
          height="320"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#71D5E4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {/* --- Main Branch 1 (top-left to center) --- */}
            <path d="M-20 40 Q 60 70 140 50 T 260 90" />
            
            {/* Leaf 1 on branch 1 */}
            <path d="M40 60 C 20 20 60 0 85 20 C 105 40 70 65 40 60 Z" />
            <path d="M42 58 Q 65 35 80 23" />
            <path d="M52 48 Q 58 40 65 43" />
            <path d="M60 40 Q 66 32 73 35" />
            
            {/* Leaf 2 on branch 1 */}
            <path d="M100 55 C 90 20 130 5 155 25 C 170 45 130 65 100 55 Z" />
            <path d="M103 53 Q 128 35 150 28" />
            <path d="M115 45 Q 120 37 130 40" />
            
            {/* Leaf 3 hanging downward */}
            <path d="M70 65 C 55 95 85 125 105 110 C 120 95 95 70 70 65 Z" />
            <path d="M72 68 Q 90 92 100 105" />

            {/* Macadamia Nut Cluster (Branch 1) */}
            {/* Nut Stem */}
            <path d="M120 53 Q 125 75 130 90" />
            <path d="M130 90 L 115 105" />
            <path d="M130 90 L 145 105" />
            <path d="M130 90 L 130 115" />
            
            {/* Nut 1 (Left) */}
            <circle cx="112" cy="118" r="14" />
            <path d="M105 110 C 108 120 118 125 124 116" strokeDasharray="1 3" />
            
            {/* Nut 2 (Right, with split outer husk) */}
            <circle cx="150" cy="116" r="13" />
            {/* Outer husk split petal */}
            <path d="M142 105 C 137 114 140 126 148 128" />
            <path d="M158 105 C 163 114 160 125 153 128" />
            
            {/* Nut 3 (Center hanging lower) */}
            <circle cx="130" cy="132" r="15" />
            <circle cx="130" cy="132" r="10" strokeDasharray="2 3" />

            {/* --- Branch 2 (Bottom right, arching upward) --- */}
            <path d="M180 340 Q 220 250 290 220" />
            
            {/* Leaf 4 */}
            <path d="M210 270 C 175 255 185 215 215 210 C 245 205 240 250 210 270 Z" />
            <path d="M210 267 Q 212 235 215 213" />
            <path d="M211 250 Q 200 242 195 245" />
            <path d="M213 235 Q 225 228 230 232" />

            {/* Leaf 5 */}
            <path d="M250 235 C 255 195 295 190 310 215 C 320 240 280 260 250 235 Z" />
            <path d="M253 234 Q 280 215 305 215" />

            {/* Macadamia Nut Pair (Branch 2) */}
            <path d="M235 245 Q 245 265 240 280" />
            <circle cx="232" cy="292" r="14" />
            <circle cx="255" cy="285" r="12" />
            <path d="M245 280 L 255 285" />

            {/* --- Secondary Elements (Scattered leaves & single nuts) --- */}
            {/* Small leaf top right */}
            <path d="M270 40 C 255 20 280 5 295 18 C 305 30 285 45 270 40 Z" />
            <path d="M272 38 Q 285 25 292 20" />
            
            {/* Single nut with stalk top right */}
            <path d="M285 45 Q 295 55 290 65" />
            <circle cx="290" cy="74" r="11" />

            {/* Left side branch tip & nut */}
            <path d="M-10 220 Q 30 210 50 240" />
            <path d="M15 215 C 10 185 45 180 55 200 C 65 220 35 235 15 215 Z" />
            <path d="M17 213 Q 35 200 50 200" />
            <circle cx="48" cy="254" r="13" />

            {/* Bottom-left small sprig */}
            <path d="M30 300 Q 70 305 100 285" />
            <path d="M55 302 C 50 280 75 270 85 285 C 92 298 75 310 55 302 Z" />
            <circle cx="95" cy="305" r="12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#macadamia-leaves-nuts)" />
    </svg>
  )
}

export interface TealBandProps {
  id?: string
  eyebrow?: string
  heading: React.ReactNode
  description?: React.ReactNode
  buttonText?: string
  buttonHref?: string
  className?: string
  py?: string
  isItalicHeading?: boolean
  hasTopRibbon?: boolean
  hasBottomRibbon?: boolean
  children?: React.ReactNode
}

/**
 * Reusable full-width Dark Teal Band with faint botanical
 * macadamia line-art pattern and signature gold ribbon borders.
 */
export function TealBand({
  id,
  eyebrow,
  heading,
  description,
  buttonText,
  buttonHref,
  className = '',
  py = 'py-16 md:py-20',
  isItalicHeading = false,
  hasTopRibbon = true,
  hasBottomRibbon = true,
  children,
}: TealBandProps) {
  return (
    <div id={id} className="relative w-full">
      {/* Top Gold Ribbon Border */}
      {hasTopRibbon && <GoldRibbon />}

      {/* Main Dark Teal Band with Pattern */}
      <section
        className={`relative w-full overflow-hidden bg-teal-dark text-cream ${py} ${className}`}
      >
        {/* Subtle vignette / depth overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-dark/60 via-transparent to-black/30"
          aria-hidden="true"
        />

        {/* Macadamia Botanical Line-Art SVG Pattern */}
        <MacadamiaBotanicalPattern />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          {eyebrow && (
            <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-light">
              {eyebrow}
            </p>
          )}

          <div
            className={`font-serif text-cream ${
              eyebrow ? 'mt-3 sm:mt-4' : ''
            } ${
              isItalicHeading
                ? 'text-xl italic sm:text-2xl md:text-3xl lg:text-4xl'
                : 'text-2xl sm:text-3xl leading-snug md:text-4xl lg:text-5xl'
            }`}
          >
            {heading}
          </div>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-cream/85 md:text-base">
              {description}
            </p>
          )}

          {buttonText && buttonHref && (
            <div className="mt-8 flex justify-center">
              <PillLink href={buttonHref} variant="solid">
                {buttonText}
              </PillLink>
            </div>
          )}

          {children}
        </div>
      </section>

      {/* Bottom Gold Ribbon Border */}
      {hasBottomRibbon && <GoldRibbon />}
    </div>
  )
}
