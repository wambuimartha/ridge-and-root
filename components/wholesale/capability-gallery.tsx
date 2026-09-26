import Image from 'next/image'

export function CapabilityGallery() {
  const features = [
    'KENYAN ORIGIN',
    'FLEXIBLE SOLUTIONS',
    'EXPORT READY',
    'QUALITY-LED PROCESSING',
  ]

  return (
    <section id="capabilities" className="bg-cream px-4 sm:px-6 md:px-8 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Gallery Grid (2/3 left spanning full height, 1/3 right with 2 stacked images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Large Photo spanning full height */}
          <div className="relative md:col-span-2 min-h-[380px] sm:min-h-[460px] md:min-h-[540px] overflow-hidden rounded-2xl border border-gold/20 shadow-md group">
            <Image
              src="/images/wholesale/export-packaging-boxes.jpg"
              alt="Stacked vacuum-packed cartons on a pallet with plain unbranded export packaging box"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            {/* Subtle gradient vignette at the bottom for legibility of the stat card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Stat Card */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 rounded-2xl bg-ink/90 p-5 sm:p-6 backdrop-blur-md border border-gold/35 text-cream shadow-2xl max-w-[280px] sm:max-w-[320px]">
              <p className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Real Export Packaging
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-cream my-1 sm:my-1.5">
                11.34 kg
              </p>
              <p className="font-sans text-xs sm:text-sm leading-snug text-cream/85">
                25 lb vacuum-packed aluminium pouch
              </p>
            </div>
          </div>

          {/* Right Column with two stacked images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6 md:col-span-1">
            {/* Top Right Image */}
            <div className="relative h-[220px] sm:h-[240px] md:h-[258px] overflow-hidden rounded-2xl border border-gold/20 shadow-md group">
              <Image
                src="/images/wholesale/cold-storage-warehouse.jpg"
                alt="Cold-storage warehouse aisle with pallet racking of vacuum-packed macadamia products"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-cream font-sans text-xs uppercase tracking-[0.18em] font-medium drop-shadow-md">
                Cold-Storage Facility
              </div>
            </div>

            {/* Bottom Right Image */}
            <div className="relative h-[220px] sm:h-[240px] md:h-[258px] overflow-hidden rounded-2xl border border-gold/20 shadow-md group">
              <Image
                src="/images/wholesale/vacuum-pouch-with-kernels.jpg"
                alt="Silver vacuum-sealed pouch standing next to cardboard box with loose macadamia kernels"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-cream font-sans text-xs uppercase tracking-[0.18em] font-medium drop-shadow-md">
                Vacuum Pouch Protection
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Feature Strip */}
        <div className="mt-8 sm:mt-12 rounded-2xl border border-gold/30 bg-cream/80 backdrop-blur-sm shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gold/20 py-4 sm:py-5">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-center px-4 py-3 sm:py-2 text-center"
              >
                <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-ink">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
