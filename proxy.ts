import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { EAC_COUNTRIES, CURRENCY_COOKIE_NAME, type Currency } from './lib/currency'

const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

// Keep in sync with GEO_COOKIE_NAME in lib/geo.ts.
// Defined inline here to avoid bundling next/headers into the Edge runtime.
const GEO_COOKIE_NAME = 'rr_country'

/** Exact public paths of the catalogue PDFs that must be geo-gated. */
const CATALOGUE_PDF_PATHS = new Set([
  '/ridge-and-root-catalogue-KSH.pdf',
  '/ridge-and-root-catalogue-USD.pdf',
])

/**
 * Returns true when the visitor should be treated as restricted (Kenyan).
 * RULE: Only country code "KE" is restricted.
 * Unknown / missing country = unrestricted (international).
 */
function edgeIsRestricted(request: NextRequest, detectedCountry: string): boolean {
  // Dev override (ignored in production)
  if (process.env.NODE_ENV !== 'production') {
    const devCountry = process.env.DEV_FORCE_COUNTRY?.toUpperCase()
    if (devCountry) return devCountry === 'KE'
  }
  return detectedCountry.toUpperCase() === 'KE'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Resolve the visitor's country ──────────────────────────────────────
  let detectedCountry = 'UNKNOWN'

  // Dev-only override via environment variable
  if (process.env.NODE_ENV !== 'production') {
    const devCountry = process.env.DEV_FORCE_COUNTRY?.toUpperCase()
    if (devCountry) {
      detectedCountry = devCountry
    }
  }

  // If not overridden, read from Vercel edge geo data
  if (detectedCountry === 'UNKNOWN') {
    const geo = (request as any).geo as { country?: string } | undefined
    const geoCountry = geo?.country || request.headers.get('x-vercel-ip-country')
    if (geoCountry) {
      detectedCountry = geoCountry.toUpperCase()
    }
    // else stays 'UNKNOWN' → treated as international (unrestricted)
  }

  // ── 2. Catalogue PDF geo-gate ─────────────────────────────────────────────
  // Block restricted (KE / unknown) visitors from accessing catalogue PDFs directly.
  if (CATALOGUE_PDF_PATHS.has(pathname) && edgeIsRestricted(request, detectedCountry)) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Not Available — Ridge &amp; Root</title>
<style>body{font-family:Georgia,serif;background:#fdf8f0;color:#2b2118;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;}
.card{max-width:480px;text-align:center;border:1px solid #cc9858;border-radius:16px;padding:40px;}
h1{font-size:1.5rem;margin-bottom:.75rem;}p{font-size:.95rem;line-height:1.6;color:#555;}
a{color:#cc9858;text-underline-offset:3px;}</style></head>
<body><div class="card"><h1>Export Orders Only</h1>
<p>Our products are currently available for export orders only at the moment.</p>
<p><a href="/">Return to ridgeandroot.co.ke</a></p></div></body></html>`,
      {
        status: 403,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    )
  }

  // ── 3. Currency detection (existing logic, unchanged) ─────────────────────
  let resolved: Currency | null = null

  // Local-development-only override (?currency=usd or ?currency=ksh)
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

  // Geolocation-based currency (Vercel Edge runtime)
  if (!resolved) {
    if (!detectedCountry || detectedCountry === 'UNKNOWN') {
      resolved = 'USD'
    } else {
      resolved = EAC_COUNTRIES.has(detectedCountry) ? 'KES' : 'USD'
    }
  }

  // ── 4. Attach headers and set cookies ────────────────────────────────────
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-currency', resolved)
  requestHeaders.set('x-rr-country', detectedCountry)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('x-currency', resolved)
  response.headers.set('x-rr-country', detectedCountry)

  // Currency cookie (existing)
  response.cookies.set(CURRENCY_COOKIE_NAME, resolved, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
  })

  // Country cookie (new — read by lib/geo.ts isRestricted())
  response.cookies.set(GEO_COOKIE_NAME, detectedCountry, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false,
    sameSite: 'lax',
  })

  return response
}

export default middleware
export const proxy = middleware

export const config = {
  matcher: [
    // Run on all paths EXCEPT Next.js internals, static assets and images.
    // NOTE: *.pdf is intentionally NOT excluded so catalogue PDFs go through the geo-gate above.
    '/((?!_next/static|_next/image|favicon|apple-touch-icon|android-chrome|site\\.webmanifest|robots\\.txt|sitemap\\.xml|images/|fonts/).*)',
  ],
}
