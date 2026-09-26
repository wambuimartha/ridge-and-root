'use client'

import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_wt1kc84'
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'template_owxoiek'
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '460L12eECwlpwG3rK'

    // TEMPORARY DEBUG LOG — remove once the 404 is resolved
    console.log('[EmailJS debug]', { serviceId, templateId, publicKey })

    // Note: matching EmailJS template needs an `email` variable (and optionally
    // `message`/`from_name`/`reply_to` if you want richer template content).
    const templateParams = {
      email,
      from_name: email,
      reply_to: email,
      message: `New newsletter signup: ${email}`,
    }

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setStatus('success')
      setEmail('')
    } catch (err) {
      const e = err as { status?: number; text?: string; message?: string }
      console.error('EmailJS newsletter signup failed:', {
        status: e?.status,
        text: e?.text,
        message: e?.message,
        raw: err,
      })
      setStatus('error')
    }
  }

  return (
    <section className="bg-teal-news">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-wide text-cream">
          STAY CONNECTED
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-cream/80">
          Be the first to know about new flavors, exclusive offers and the story
          behind Ridge &amp; Root.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full flex-1 rounded-full border border-cream/30 bg-transparent px-5 py-3 font-sans text-sm text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="shrink-0 rounded-full bg-gold px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === 'sending' ? 'Joining…' : 'Join Our Journey'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 font-sans text-sm text-gold-light">
            Thank you — you&apos;re on the list.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 font-sans text-sm text-gold-light">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  )
}