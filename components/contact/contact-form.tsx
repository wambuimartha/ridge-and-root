'use client'

import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle2, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-cream/80 px-4 py-3.5 font-sans text-sm text-ink placeholder:text-ink/35 shadow-[0_1px_3px_rgba(43,33,24,0.04)] transition-all duration-200 focus:border-gold focus:bg-cream focus:shadow-[0_2px_8px_rgba(140,120,83,0.18)] focus:ring-1 focus:ring-gold focus:outline-none'

// EmailJS config — hardcoded (public key is safe to expose client-side)
const EMAILJS_SERVICE_ID = 'service_i4wpwmo'
const EMAILJS_TEMPLATE_ID = 'template_p635ow1'
const EMAILJS_PUBLIC_KEY = 'jGWNqdHNGTvbt_YTO'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { ...form, reply_to: form.email, from_name: form.name },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS contact form failed:', err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown">
          Full Name
        </label>
        <input required value={form.name} onChange={update('name')} placeholder="Your name" className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown">
          Email Address
        </label>
        <input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown">
          Subject
        </label>
        <input required value={form.subject} onChange={update('subject')} placeholder="How can we help you?" className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown">
          Message
        </label>
        <textarea required rows={5} value={form.message} onChange={update('message')} placeholder="Tell us more about your inquiry..." className={`${inputClass} resize-y`} />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center rounded-full bg-gold px-9 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-sm transition-all hover:bg-gold-light hover:shadow-md disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2.5 rounded-xl border border-teal/20 bg-teal/5 p-4 font-sans text-sm text-teal-dark">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
          <span>Message sent — we&apos;ll be in touch shortly.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rust/20 bg-rust/5 p-4 font-sans text-sm text-rust">
          <AlertCircle className="h-4 w-4 shrink-0 text-rust" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </form>
  )
}