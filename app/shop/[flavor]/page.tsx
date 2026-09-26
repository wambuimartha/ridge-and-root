import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { ProductDetail } from '@/components/shop/product-detail'
import { products, getProduct } from '@/lib/products'
import { getServerCurrency } from '@/lib/currency-server'

export function generateStaticParams() {
  return products.map((p) => ({ flavor: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ flavor: string }>
}): Promise<Metadata> {
  const { flavor } = await params
  const product = getProduct(flavor)
  if (!product) return {}

  const title = product.name
  const description = `${product.heading}. ${product.description}`
  const url = `https://ridgeandroot.co.ke/shop/${flavor}`
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `https://ridgeandroot.co.ke${product.image}`

  return {
    title,
    description,
    alternates: {
      canonical: `/shop/${flavor}`,
    },
    openGraph: {
      title: `${product.name} — Ridge & Root`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Ridge & Root ${product.name} premium macadamia nuts`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Ridge & Root`,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ flavor: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { flavor } = await params
  const product = getProduct(flavor)

  if (!product) {
    notFound()
  }

  const currency = await getServerCurrency(searchParams)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `${product.heading}. ${product.description}`,
    image: product.image.startsWith('http')
      ? product.image
      : `https://ridgeandroot.co.ke${product.image}`,
    url: `https://ridgeandroot.co.ke/shop/${flavor}`,
    brand: {
      '@type': 'Brand',
      name: 'Ridge & Root',
    },
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://ridgeandroot.co.ke/shop/${flavor}`,
      seller: {
        '@type': 'Organization',
        name: 'Ridge & Root',
      },
    },
    aggregateRating:
      product.reviews && product.reviews.length > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: (
              product.reviews.reduce((sum, r) => sum + r.rating, 0) /
              product.reviews.length
            ).toFixed(1),
            reviewCount: product.reviews.length,
          }
        : undefined,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <ProductDetail product={product} currency={currency} />
      <Footer />
    </main>
  )
}
