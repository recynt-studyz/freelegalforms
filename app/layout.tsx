import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Legal Forms — Invoice, NDA & Contract Generator',
  description:
    'Free legal document generator for invoices, NDAs, bill of sale, lease agreements and contractor agreements. Download professional PDFs instantly. No signup, no watermarks, completely free.',
  keywords: [
    'free legal forms',
    'invoice generator',
    'NDA generator',
    'bill of sale generator',
    'lease agreement generator',
    'contractor agreement',
    'free legal documents',
    'free invoice maker',
    'free NDA template',
    'free bill of sale',
    'legal forms free download',
    'free contract template',
  ],
  metadataBase: new URL('https://freelegalforms.app'),
  alternates: { canonical: 'https://freelegalforms.app' },
  openGraph: {
    title: 'Free Legal Forms — Invoice, NDA & Contract Generator',
    description:
      'Free legal document generator for invoices, NDAs, bill of sale, lease agreements and contractor agreements. Download professional PDFs instantly. No signup.',
    url: 'https://freelegalforms.app',
    siteName: 'freelegalforms.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Legal Document Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Legal Forms — Invoice, NDA & Contract Generator',
    description: 'Free legal document generator. Invoice, NDA, bill of sale, lease agreement, contractor agreement. No signup.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('flf-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
