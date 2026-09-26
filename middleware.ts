import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { EAC_COUNTRIES, CURRENCY_COOKIE_NAME, type Currency } from './lib/currency'

const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

export function middleware(request: NextRequest) {
  let resolved: Currency | null = null

  // 1. Local-development-only override (?currency=usd or ?currency=ksh)
  // Completely ignored in production so real visitors cannot bypass geolocation.
  if (process.env.NODE_ENV !== 'production') {
    const param = request.nextUrl.searchParams.get('currency')?.toLowerCase()
    if (param === 'usd') {
      resolved = 'USD'
    } else if (param === 'ksh' || param === 'kes') {
      resolved = 'KES'
    } else {
      // In dev, retain previously set cookie if present
      const devCookie = request.cookies.get(CURRENCY_COOKIE_NAME)?.value
      if (devCookie === 'KES' || devCookie === 'USD') {
        resolved = devCookie as Currency
      }
    }
  }

  // 2. Geolocation detection (Vercel Edge runtime)
  if (!resolved) {
    const geo = (request as any).geo as { country?: string } | undefined
    const geoCountry = geo?.country || request.headers.get('x-vercel-ip-country')

    if (!geoCountry) {
      console.warn('[rr-currency] Geolocation data unavailable; defaulting to USD.')
      resolved = 'USD'
    } else {
      resolved = EAC_COUNTRIES.has(geoCountry.toUpperCase()) ? 'KES' : 'USD'
    }
  }

  // 3. Set header on incoming request for server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-currency', resolved)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('x-currency', resolved)

  // 4. Set cookie so downstream pages/components can read it
  response.cookies.set(CURRENCY_COOKIE_NAME, resolved, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
  })

  return response
}

export default middleware

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|apple-touch-icon|android-chrome|site\\.webmanifest|robots\\.txt|sitemap\\.xml|images/|fonts/|.*\\.pdf$).*)',
  ],
}