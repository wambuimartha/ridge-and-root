import { NextRequest, NextResponse } from 'next/server'
import { getServerCurrency } from '@/lib/currency-server'
import { getCatalogueForCurrency } from '@/lib/catalogue'
import { isRestricted } from '@/lib/geo'
import type { Currency } from '@/lib/currency'

export async function GET(request: NextRequest) {
  // Geo-gate: restricted (Kenyan) visitors receive a 403.
  // This protects the /catalogue route in addition to the middleware PDF gate.
  if (await isRestricted()) {
    return NextResponse.json(
      { error: 'Our products are currently available for export orders only at the moment.' },
      { status: 403 }
    )
  }

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
