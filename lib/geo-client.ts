/**
 * Cookie name for the detected country code, set by middleware.
 * Value is an ISO 3166-1 alpha-2 code (e.g. "US", "KE") or "UNKNOWN" when
 * geo-detection fails. Only "KE" triggers the restriction.
 */
export const GEO_COOKIE_NAME = 'rr_country'

/**
 * Client-side helper — reads the rr_country cookie from document.cookie.
 * Safe for use in 'use client' components without importing next/headers.
 *
 * RULE: Only visitors with country code "KE" are restricted.
 * Unknown / missing geo = unrestricted (international).
 */
export function getClientIsRestricted(): boolean {
  if (typeof document === 'undefined') return false // server-side: not restricted by default
  const match = document.cookie.match(/(?:^|;\s*)rr_country=([^;]+)/)
  const country = match?.[1]?.trim().toUpperCase()
  if (!country) return false // no cookie yet → treat as international
  return country === 'KE'
}
