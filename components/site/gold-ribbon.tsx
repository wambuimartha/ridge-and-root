/**
 * GoldRibbon — a thin warm-gold gradient band used as a recurring section
 * divider across the site, visually echoing the horizontal gold ribbon band
 * on every Ridge & Root product pouch.
 *
 * Usage: drop <GoldRibbon /> between any two major page sections.
 */
export function GoldRibbon() {
  return (
    <div
      className="h-1.5 w-full bg-gradient-to-r from-[#CC9858] via-[#F4D494] via-50% to-[#CC9858] shadow-[0_1px_4px_rgba(204,152,88,0.35)]"
      role="separator"
      aria-hidden="true"
    />
  )
}
