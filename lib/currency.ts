import { formatUsd, formatKes } from '@/lib/products'

export type Currency = 'USD' | 'KES'

/** EAC country codes that map to Kenyan Shilling pricing */
export const EAC_COUNTRIES = new Set(['KE', 'UG', 'TZ', 'RW', 'BI', 'SS', 'CD'])

export const CURRENCY_COOKIE_NAME = 'rr_currency'

/**
 * Format a price string according to the resolved currency and optional flavour.
 */
export function formatCurrencyPrice(
  currency: Currency = 'USD',
  sizeOrType: string,
  qty: number = 1,
  flavour?: string
): string {
  return currency === 'KES' ? formatKes(sizeOrType, qty, flavour) : formatUsd(sizeOrType, qty, flavour)
}

/**
 * Read the resolved currency from document.cookie on the client side.
 */
export function getClientCurrency(): Currency {
  if (typeof document === 'undefined') return 'USD'
  const match = document.cookie.match(/(?:^|;\s*)rr_currency=([^;]+)/)
  const val = match?.[1]
  return val === 'KES' ? 'KES' : 'USD'
}
