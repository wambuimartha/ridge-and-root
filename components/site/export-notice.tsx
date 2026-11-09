import { Globe } from 'lucide-react'

/**
 * Shared notice shown to restricted (Kenyan) visitors in place of prices,
 * order buttons, catalogue links, and enquiry forms.
 *
 * Styled in the site's existing teal / gold / brown palette.
 */
export function ExportNotice({ className }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-start gap-3 rounded-xl border border-teal/30 bg-teal/10 px-5 py-4 font-sans text-sm leading-relaxed text-teal-dark ${className ?? ''}`}
    >
      <Globe
        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
        aria-hidden="true"
      />
      <span>
        Our products are currently available for export orders only at the moment.
      </span>
    </div>
  )
}
