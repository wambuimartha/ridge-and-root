import { NextRequest, NextResponse } from 'next/server'
import { getServerCurrency } from '@/lib/currency-server'
import { getCatalogueForCurrency } from '@/lib/catalogue'
import type { Currency } from '@/lib/currency'

export async function GET(request: NextRequest) {
  let currency: Currency | null = null

  // 1. Dev-only query override (?currency=usd or ?currency=ksh)
  if (process.env.NODE_ENV !== 'production') {
    const param = request.nextUrl.searchParams.get('currency')?.toLowerCase()
    if (param === 'usd') currency = 'USD'
    if (param === 'ksh' || param === 'kes') currency = 'KES'
  }

  // 2. Server currency resolution (headers / cookies / edge geo)
  if (!currency) {
    currency = await getServerCurrency()
  }

  const catalogue = getCatalogueForCurrency(currency)
  const targetUrl = new URL(catalogue.url, request.nextUrl.origin)

  return NextResponse.redirect(targetUrl, 307)
}
