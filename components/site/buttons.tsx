import Link from 'next/link'
import type { ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center rounded-full font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ease-in-out'

export function PillLink({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'outline-light'
  className?: string
}) {
  const styles = {
    solid: 'bg-gold px-8 py-3.5 text-cream hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md',
    outline:
      'border border-gold px-8 py-3.5 text-gold hover:bg-gold hover:text-cream hover:-translate-y-0.5 hover:shadow-md',
    'outline-light':
      'border border-cream px-8 py-3.5 text-cream hover:bg-cream hover:text-brown hover:-translate-y-0.5 hover:shadow-md',
  }[variant]

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  )
}

export function WhatsAppButton({
  href,
  children,
  variant = 'solid',
  size = 'default',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  size?: 'default' | 'sm'
  className?: string
}) {
  const sizeStyles = {
    default: variant === 'outline' ? 'px-6 py-3' : 'px-6 py-3.5',
    sm: variant === 'outline' ? 'px-4 py-2 text-[11px]' : 'px-4 py-2.5 text-[11px]',
  }[size]

  const styles = {
    solid: 'bg-gold text-cream hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md',
    outline:
      'border border-gold text-gold hover:bg-gold hover:text-cream hover:-translate-y-0.5 hover:shadow-md',
  }[variant]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${sizeStyles} ${className}`}
    >
      {children}
    </a>
  )
}
