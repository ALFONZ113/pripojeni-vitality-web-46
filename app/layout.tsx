import type { Metadata } from 'next'
import '../src/index.css'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ui/scroll-to-top'
import { HelmetProvider } from 'react-helmet-async'

export const metadata: Metadata = {
  title: 'Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení',
  description: 'Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace.',
  keywords: 'popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava',
  authors: [{ name: 'Milan Terč - obchodní zástupce PODA' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  verification: {
    google: 'VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA',
    other: {
      'seznam-wmt': 'TZXj7ilgwfcAOewRproL3dFn9jTDd15R'
    }
  },
  openGraph: {
    type: 'website',
    url: 'https://www.popri.cz/',
    title: 'Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení',
    description: 'Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace.',
    images: [
      {
        url: 'https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
        width: 256,
        height: 256,
        alt: 'Popri.cz Logo'
      }
    ],
    locale: 'cs_CZ',
    siteName: 'Popri.cz'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení',
    description: 'Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace.',
    images: ['https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png']
  },
  icons: {
    icon: [
      { url: '/poda-favicon.ico', type: 'image/x-icon' },
      { url: '/poda-favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/poda-favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/poda-favicon-48x48.png', sizes: '48x48', type: 'image/png' }
    ],
    apple: [
      { url: '/poda-apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.popri.cz/',
    languages: {
      'cs': 'https://popri.cz/'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <meta name="format-detection" content="telephone=yes, date=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="google" content="notranslate" />
        <meta name="last-modified" content="2025-01-14" />
        <meta name="content-updated" content="2025-01-14T12:00:00Z" />
        <meta name="version" content="3.1" />
        <meta name="cache-version" content="1747302000000" />
        <meta name="domain-cache" content="dual-domain-3.1" />
        <meta name="meta-update" content="2025-01-14" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&display=swap" />
        
        <script src="https://api.mapy.cz/loader.js" async />
        <script src="/js/mapy-loader.js" async />
        <script src="/js/analytics.js" defer />
        <script src="/sw-register.js?v=3.1" defer />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Popri.cz – PODA Internet",
              "url": "https://www.popri.cz",
              "description": "Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace.",
              "dateModified": "2025-01-14T12:00:00Z",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.popri.cz/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Popri.cz - PODA Internet",
              "url": "https://www.popri.cz",
              "logo": "https://www.popri.cz/poda-logo.svg",
              "description": "Poskytovateľ PODA internetových služieb s gigabitovým pripojením a TV zdarma",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+420-739-065-142",
                "contactType": "customer service",
                "areaServed": "CZ",
                "availableLanguage": "Czech"
              },
              "sameAs": [],
              "dateModified": "2025-01-14T12:00:00Z"
            })
          }}
        />
      </head>
      <body>
        <HelmetProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </HelmetProvider>
      </body>
    </html>
  )
}