import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenStream - All In One Streaming Hub',
  description: 'Access unlimited movies, series, and anime from top OTT servers like Netflix, Prime Video, Disney+ and premium BDix servers. Totally free, no ads, HD quality streaming.',
  keywords: 'streaming, movies, series, anime, Netflix, Prime Video, Disney+, BDix, free streaming, HD quality, no ads',
  authors: [{ name: 'OpenStream Team' }],
  creator: 'OpenStream',
  publisher: 'OpenStream',
  applicationName: 'OpenStream',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
  openGraph: {
    title: 'OpenStream - All In One Streaming Hub',
    description: 'Access unlimited movies, series, and anime from top OTT servers completely free',
    type: 'website',
    locale: 'en_US',
    siteName: 'OpenStream',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenStream - All In One Streaming Hub',
    description: 'Access unlimited movies, series, and anime from top OTT servers completely free',
    creator: '@OpenStreamApp',
  },
  appleWebApp: {
    capable: true,
    title: 'OpenStream',
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="generator" content="OpenStream" />
        <meta name="application-name" content="OpenStream" />
        <meta name="apple-mobile-web-app-title" content="OpenStream" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}
