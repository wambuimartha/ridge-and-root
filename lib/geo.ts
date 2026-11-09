import { cookies, headers } from 'next/headers'
import { GEO_COOKIE_NAME } from './geo-client'

export { GEO_COOKIE_NAME }

/**
 * Returns true ONLY when the visitor is confirmed to be located in Kenya ("KE").
 * Visitors from every other country outside Kenya are unrestricted.
 *
 * Dev-only: set DEV_FORCE_COUNTRY=KE in .env.local to simulate Kenya locally.
 * Ignored in production.
 */
export async function isRestricted(): Promise<boolean> {
  // 1. Dev-only override (strictly ignored in production)
  if (process.env.NODE_ENV !== 'production') {
    const devCountry = process.env.DEV_FORCE_COUNTRY?.trim().toUpperCase()
    if (devCountry) {
      return devCountry === 'KE'
    }
  }

  const country = await getCountryCode()

  // STRICT RULE: Only visitors identified as Kenya ("KE") are restricted.
  // Everyone else is unrestricted.
  return country?.toUpperCase() === 'KE'
}

/** Reads the detected country code from the request headers or cookies. */
async function getCountryCode(): Promise<string | null> {
  // 1. From custom header set by middleware/proxy
  try {
    const headersList = await headers()
    const rrCountry = headersList.get('x-rr-country')?.trim().toUpperCase()
    if (rrCountry && rrCountry !== 'UNKNOWN') return rrCountry

    // 2. Direct fallback to Vercel header if middleware header isn't present
    const vercelCountry = headersList.get('x-vercel-ip-country')?.trim().toUpperCase()
    if (vercelCountry && vercelCountry !== 'UNKNOWN') return vercelCountry
  } catch {
    // Called outside request context
  }

  // 3. Fall back to cookie
  try {
    const cookieStore = await cookies()
    const country = cookieStore.get(GEO_COOKIE_NAME)?.value?.trim().toUpperCase()
    if (country && country !== 'UNKNOWN') return country
  } catch {
    // Called outside request context
  }

  return null
}
