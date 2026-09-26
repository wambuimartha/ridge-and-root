import { cookies, headers } from 'next/headers'
import { CURRENCY_COOKIE_NAME, type Currency } from './currency'

/**
 * Server-side helper to read the resolved currency from incoming request headers, search params, or cookies.
 * Priority:
 * 1. Local-dev search params override (?currency=usd or ?currency=ksh) — strictly inert in production.
 * 2. Request header 'x-currency' set by middleware (reflects Vercel edge geolocation or dev override).
 * 3. Cookie 'rr_currency' previously persisted by middleware.
 * Defaults to 'USD' if unavailable.
 */
export async function getServerCurrency(
  searchParams?:
    | { [key: string]: string | string[] | undefined }
    | Promise<{ [key: string]: string | string[] | undefined }>
): Promise<Currency> {
  // 1. Dev-only searchParams check (inert in production)
  if (process.env.NODE_ENV !== 'production' && searchParams) {
    try {
      const resolvedParams = await searchParams
      const param =
        typeof resolvedParams?.currency === 'string'
          ? resolvedParams.currency.toLowerCase()
          : undefined
      if (param === 'usd') return 'USD'
      if (param === 'ksh' || param === 'kes') return 'KES'
    } catch {
      // ignore
    }
  }

  // 2. Request header set by middleware (reflects edge geo & middleware dev override)
  try {
    const headersList = await headers()
    const val = headersList.get('x-currency')
    if (val === 'KES' || val === 'USD') {
      return val
    }
  } catch {
    // ignore if called outside request context
  }

  // 3. Fall back to cookie
  try {
    const cookieStore = await cookies()
    const val = cookieStore.get(CURRENCY_COOKIE_NAME)?.value
    if (val === 'KES' || val === 'USD') {
      return val
    }
  } catch {
    // ignore if called outside request context
  }

  return 'USD'
}
