import Image from 'next/image'

export function Wellness() {
  return (
    <section className="relative bg-gold">
      {/* Thicker horizontal metallic gold sheen gradient bar at the very top */}
      <div
        className="h-4 sm:h-5 md:h-6 w-full bg-gradient-to-r from-[#A07840] via-[#F4D494] via-55% to-[#A07840] shadow-[0_2px_10px_rgba(43,33,24,0.18)]"
        role="separator"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Photos on the left — 3 individual cards with equal width, aligned top edges, and subtle drop shadow */}
          <div className="order-1 md:col-span-6 lg:col-span-7">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {/* Card 1: Green Macadamia Branch */}
              <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/wellness_card_branch.png"
                  alt="Macadamia tree branch with lush leaves and clusters of green nuts"
                  width={177}
                  height={262}
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className="aspect-[177/262] w-full h-auto object-cover"
                />
              </div>

              {/* Card 2: Farmer with Harvesting Basket */}
              <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/wellness_card_farmer.png"
                  alt="Farmer harvesting macadamias with a woven basket on her back"
                  width={178}
                  height={262}
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className="aspect-[177/262] w-full h-auto object-cover"
                />
              </div>

              {/* Card 3: Roasted & Cracked Macadamia Nuts */}
              <div className="overflow-hidden rounded-sm shadow-[0_10px_24px_rgba(43,33,24,0.22)] transition-transform duration-300 hover:-translate-y-1">
                <Image
                  src="/images/wellness_card_cracked.png"
                  alt="Cracked macadamia nut shells with whole golden kernels"
                  width={174}
                  height={262}
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className="aspect-[177/262] w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text block on the right */}
          <div className="order-2 flex flex-col justify-center text-left md:col-span-6 lg:col-span-5">
            <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-brown">
              Indulge in Wellness
            </p>
            <p className="mt-3 sm:mt-5 font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-ink">
              Grown in Kenya and sourced from small family farms, our macadamias
              are carefully selected, roasted and crafted into distinctive flavors
              for a premium snacking experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

