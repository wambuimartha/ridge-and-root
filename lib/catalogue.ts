import type { Currency } from './currency'

export interface CatalogueInfo {
  url: string
  filename: string
}

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
 */
export function getCatalogueForCurrency(currency: Currency = 'USD'): CatalogueInfo {
  return CATALOGUE_FILES[currency] || CATALOGUE_FILES.USD
}
