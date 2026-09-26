function HeartHandsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 30c0-4 3-7 6.5-7S45 26 45 30c0 5-7 9-13 13-6-4-13-8-13-13 0-4 3-7 6.5-7S32 26 32 30Z" />
      <path d="M14 40c-2-2-4-3-6-3M50 40c2-2 4-3 6-3M12 46l10 5M52 46l-10 5" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="11" />
      <path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5" />
    </svg>
  )
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 52V30" />
      <path d="M32 34c0-6-5-11-13-11-1 6 3 13 13 13Z" />
      <path d="M32 30c0-7 5-12 13-12 1 7-4 13-13 13Z" />
    </svg>
  )
}

const PROPS = [
  {
    icon: HeartHandsIcon,
    title: 'SUPPORTING SMALL FARMERS',
    body: 'Partnering with thousands of local grower families and communities.',
  },
  {
    icon: SunIcon,
    title: 'THOUGHTFULLY CRAFTED',
    body: 'Roasted to perfection and inspired by real ingredients.',
  },
  {
    icon: SproutIcon,
    title: 'SINGLE-ORIGIN KENYAN MACADAMIAS',
    body: "Proudly grown in Kenya's highlands.",
  },
]

export function ValueProps() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-12 px-4 sm:px-6 py-12 sm:py-16 md:grid-cols-3 md:py-20">
        {PROPS.map((prop) => {
          const Icon = prop.icon
          return (
            <div key={prop.title} className="flex flex-col items-center text-center">
              <div className="text-gold">
                <Icon />
              </div>
              <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                {prop.title}
              </h3>
              <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-ink/70">
                {prop.body}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
