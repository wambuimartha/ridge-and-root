import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Libre_Baskerville, DM_Sans } from 'next/font/google'
import './globals.css'

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-baskerville',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ridgeandroot.co.ke'),
  title: {
    default: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
    template: '%s | Ridge & Root',
  },
  description:
    'Grown in Kenya and sourced from small family farms, our macadamias are carefully selected, roasted and crafted into distinctive flavors for a premium snacking experience.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'Ridge & Root',
    type: 'website',
    locale: 'en_KE',
    url: 'https://ridgeandroot.co.ke',
    title: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
    description:
      'Grown in Kenya and sourced from small family farms, our macadamias are carefully selected, roasted and crafted into distinctive flavors for a premium snacking experience.',
    images: [
      {
        url: '/images/hero_flatlay.png',
        width: 1200,
        height: 630,
        alt: 'Ridge & Root premium macadamia pouches arranged with nuts and spices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ridge & Root — Premium Macadamia Snacks from Kenya',
    description:
      'Grown in Kenya and sourced from small family farms, our macadamias are carefully selected, roasted and crafted into distinctive flavors for a premium snacking experience.',
    images: ['/images/hero_flatlay.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF0D7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${baskerville.variable} ${dmSans.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-cream font-sans text-ink antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
