import type { Currency } from './currency'

export interface CatalogueInfo {
  /** Public path or served-route path of the catalogue PDF. */
  url: string
  /** Suggested download filename. */
  filename: string
}

/**
 * Single source of truth for catalogue file paths.
 * Swap the url values here to serve different catalogues for each currency without
 * touching any other file.
 */
export const CATALOGUE_FILES: Record<Currency, CatalogueInfo> = {
  KES: {
    url: '/ridge-and-root-catalogue-KSH.pdf',
    filename: 'Ridge-and-Root-Catalogue-KSH.pdf',
  },
  USD: {
    url: '/ridge-and-root-catalogue-USD.pdf',
    filename: 'Ridge-and-Root-Catalogue-USD.pdf',
  },
} as const

/**
 * Returns the appropriate catalogue URL and download filename based on resolved currency.
 * EAC visitors (KES) receive the KSH catalogue; everyone else (USD) receives the USD catalogue.
 *
 * NOTE: Callers should check isRestricted() before exposing this URL to the visitor —
 * restricted (Kenyan) visitors must not see any catalogue link.
 */
export function getCatalogueForCurrency(currency: Currency = 'USD'): CatalogueInfo {
  return CATALOGUE_FILES[currency] || CATALOGUE_FILES.USD
}
