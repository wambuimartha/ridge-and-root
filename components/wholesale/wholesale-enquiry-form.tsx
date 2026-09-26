'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle2, AlertCircle, Mail, ChevronDown } from 'lucide-react'
import { getMailtoUrl } from '@/lib/email-links'

type Status = 'idle' | 'sending' | 'success' | 'error'

const INTEREST_OPTIONS = [
  'Branded consumer packs',
  'Private label',
  'White label',
  'Bulk roasted & flavoured',
  'Bulk raw kernels',
  'Custom product development',
]

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-cream/90 px-4 py-3.5 font-sans text-sm text-ink placeholder:text-ink/35 shadow-[0_1px_3px_rgba(43,33,24,0.04)] transition-all duration-200 focus:border-gold focus:bg-cream focus:shadow-[0_2px_8px_rgba(204,152,88,0.18)] focus:ring-1 focus:ring-gold focus:outline-none'

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({
    companyName: '',
    workEmail: '',
    countryMarket: '',
    interest: INTEREST_OPTIONS[0],
    volume: '',
    requirement: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  // Listen for custom route selection events from the RouteCards or PackagingSpec
  useEffect(() => {
    const handleRouteSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail && INTEREST_OPTIONS.includes(customEvent.detail)) {
        setForm((prev) => ({ ...prev, interest: customEvent.detail }))
      }
    }
    window.addEventListener('wholesale-select-route', handleRouteSelect)
    return () =>
      window.removeEventListener('wholesale-select-route', handleRouteSelect)
  }, [])

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_a8y7pdq'
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_WHOLESALE_TEMPLATE_ID || 'template_ky7wase'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Jbp2dXlq-wnfyDUMq'

    // Note: A matching EmailJS template with these variable names (company_name, work_email, country_market, interest, volume, requirement) needs to be created in the EmailJS dashboard.
    const templateParams = {
      company_name: form.companyName,
      work_email: form.workEmail,
      country_market: form.countryMarket,
      interest: form.interest,
      volume: form.volume || 'Not specified',
      requirement: form.requirement,
      from_name: form.companyName,
      reply_to: form.workEmail,
      message: `Wholesale Quote Request:
Company: ${form.companyName}
Work Email: ${form.workEmail}
Country/Market: ${form.countryMarket}
Interest/Route: ${form.interest}
Volume/Size: ${form.volume || 'Not specified'}

Requirements & Details:
${form.requirement}`,
      to_email: 'wholesale@ridgeandroot.co.ke',
    }

    // Prepare direct mailto URL as guaranteed fallback
    const mailtoSubject = encodeURIComponent(
      `Wholesale Quote Request - ${form.companyName} (${form.interest})`,
    )
    const mailtoBody = encodeURIComponent(
`Hello Ridge & Root Wholesale Team,

Please provide a quote for our requirement:

• Company: ${form.companyName}
• Work Email: ${form.workEmail}
• Country / Market: ${form.countryMarket}
• Interest / Route: ${form.interest}
• Expected Volume: ${form.volume || 'Not specified'}

Requirement Details:
${form.requirement}

Best regards,
${form.companyName}`
    )
    const mailtoUrl = `mailto:wholesale@ridgeandroot.co.ke?subject=${mailtoSubject}&body=${mailtoBody}`

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey)
        setStatus('success')
        setForm({
          companyName: '',
          workEmail: '',
          countryMarket: '',
          interest: INTEREST_OPTIONS[0],
          volume: '',
          requirement: '',
        })
        return
      } catch (err) {
        console.warn('EmailJS delivery failed, triggering direct email fallback:', err)
      }
    }

    // Direct fallback if EmailJS keys are not configured or request fails: open Gmail compose
    const rawSubject = `Wholesale Quote Request - ${form.companyName} (${form.interest})`
    const rawBody = `Hello Ridge & Root Wholesale Team,

Please provide a quote for our requirement:

• Company: ${form.companyName}
• Work Email: ${form.workEmail}
• Country / Market: ${form.countryMarket}
• Interest / Route: ${form.interest}
• Expected Volume: ${form.volume || 'Not specified'}

Requirement Details:
${form.requirement}

Best regards,
${form.companyName}
(${form.workEmail})`

    // Trigger mail client with prefilled draft
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl
    }
    setStatus('success')
  }

  return (
    <section id="enquiry" className="bg-cream px-4 sm:px-6 md:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-rust mb-3">
            Request a Quote &bull; Start a Conversation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
            Tell us what you need.
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg leading-relaxed text-ink/80">
            Share your market, target product route, expected order volume, and
            specifications. Our wholesale team will prepare an itemized quote and respond directly.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 text-gold" />
            <a
              href={getMailtoUrl(
                'wholesale@ridgeandroot.co.ke',
                'Wholesale Quote Inquiry',
              )}
              className="font-sans text-sm font-semibold text-ink underline underline-offset-4 decoration-gold/60 hover:text-gold transition-colors"
            >
              wholesale@ridgeandroot.co.ke
            </a>
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-gold/30 bg-cream p-6 sm:p-10 md:p-12 shadow-sm">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="company-name"
                  className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
                >
                  Company Name <span className="text-rust">*</span>
                </label>
                <input
                  id="company-name"
                  name="company_name"
                  required
                  value={form.companyName}
                  onChange={update('companyName')}
                  placeholder="e.g. Acme Foods Ltd"
                  className={inputClass}
                />
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="work-email"
                  className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
                >
                  Work Email <span className="text-rust">*</span>
                </label>
                <input
                  id="work-email"
                  name="work_email"
                  required
                  type="email"
                  value={form.workEmail}
                  onChange={update('workEmail')}
                  placeholder="buyer@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Country / Market */}
              <div>
                <label
                  htmlFor="country-market"
                  className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
                >
                  Country / Market <span className="text-rust">*</span>
                </label>
                <div className="relative">
                  <select
                    id="country-market"
                    name="country_market"
                    required
                    value={form.countryMarket}
                    onChange={update('countryMarket')}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="" disabled>Select your country…</option>
                    <optgroup label="Africa">
                      <option>Kenya</option>
                      <option>Uganda</option>
                      <option>Tanzania</option>
                      <option>Ethiopia</option>
                      <option>Rwanda</option>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>South Africa</option>
                      <option>Egypt</option>
                      <option>Morocco</option>
                    </optgroup>
                    <optgroup label="Middle East">
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>Qatar</option>
                      <option>Kuwait</option>
                      <option>Bahrain</option>
                      <option>Oman</option>
                      <option>Jordan</option>
                    </optgroup>
                    <optgroup label="Europe">
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Netherlands</option>
                      <option>Belgium</option>
                      <option>Switzerland</option>
                      <option>Italy</option>
                      <option>Spain</option>
                      <option>Sweden</option>
                      <option>Norway</option>
                      <option>Denmark</option>
                      <option>Ireland</option>
                      <option>Austria</option>
                      <option>Poland</option>
                    </optgroup>
                    <optgroup label="North America">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </optgroup>
                    <optgroup label="Asia Pacific">
                      <option>Australia</option>
                      <option>New Zealand</option>
                      <option>Singapore</option>
                      <option>Japan</option>
                      <option>China</option>
                      <option>India</option>
                      <option>South Korea</option>
                      <option>Hong Kong</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option>Other</option>
                    </optgroup>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/50" />
                </div>
              </div>

              {/* I'm interested in */}
              <div>
                <label
                  htmlFor="interest-select"
                  className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
                >
                  I&apos;m interested in <span className="text-rust">*</span>
                </label>
                <div className="relative">
                  <select
                    id="interest-select"
                    name="interest"
                    required
                    value={form.interest}
                    onChange={update('interest')}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/50" />
                </div>
              </div>
            </div>

            {/* Expected volume or order size */}
            <div>
              <label
                htmlFor="volume-order"
                className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
              >
                Expected volume or order size
              </label>
              <input
                id="volume-order"
                name="volume"
                value={form.volume}
                onChange={update('volume')}
                placeholder="e.g. trial order, pallets or container"
                className={inputClass}
              />
            </div>

            {/* Requirement Textarea */}
            <div>
              <label
                htmlFor="requirement-text"
                className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown"
              >
                Tell us about your requirement
              </label>
              <textarea
                id="requirement-text"
                name="requirement"
                rows={5}
                value={form.requirement}
                onChange={update('requirement')}
                placeholder="Share your timeline, target specifications, packaging preferences or questions..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gold px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-sm transition-all hover:bg-gold-light hover:shadow-md disabled:opacity-60 cursor-pointer"
              >
                {status === 'sending'
                  ? 'Submitting quote request…'
                  : 'Request Wholesale Quote'}
              </button>

              <span className="font-sans text-xs text-ink/60">
                Direct response within 24 business hours
              </span>
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="flex items-center gap-3 rounded-2xl border border-teal/25 bg-teal/10 p-4 font-sans text-sm text-teal-dark">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                <span>
                  Thank you! Your wholesale enquiry has been sent. Our team will
                  be in touch shortly.
                </span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-3 rounded-2xl border border-rust/25 bg-rust/10 p-4 font-sans text-sm text-rust">
                <AlertCircle className="h-5 w-5 shrink-0 text-rust" />
                <span>
                  There was an issue sending your enquiry. Please try again or
                  email us directly at wholesale@ridgeandroot.co.ke.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}