import type { Metadata, Viewport } from 'next'
import './globals.css'
import '../styles/themes.css'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from '@/contexts/theme-context'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://openstream.app'),
  title: {
    default: 'OpenStream - Free Movies, TV Shows & Anime Streaming Hub | No Ads, HD Quality',
    template: '%s | OpenStream - Free Streaming Hub'
  },
  description: 'Stream unlimited movies, TV series, and anime for free with OpenStream. Access Netflix, Prime Video, Disney+, and premium BDix servers. No ads, HD quality, completely free forever.',
  keywords: [
    'free streaming',
    'movies online',
    'TV shows',
    'anime streaming',
    'Netflix alternative',
    'Prime Video',
    'Disney Plus',
    'BDix servers',
    'HD streaming',
    'no ads streaming',
    'CloudStream',
    'OpenStream',
    'free movies',
    'watch online',
    'streaming app',
    'Android streaming',
    'mobile streaming',
    'download movies',
    'offline viewing'
  ],
  authors: [{ name: 'OpenStream Team', url: 'https://www.moviehub.dev' }],
  creator: 'OpenStream Team',
  publisher: 'OpenStream',
  applicationName: 'OpenStream',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#dc2626' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.moviehub.dev',
    siteName: 'OpenStream',
    title: 'OpenStream - Free Movies, TV Shows & Anime Streaming Hub',
    description: 'Stream unlimited content from Netflix, Prime Video, Disney+ and more. Completely free, no ads, HD quality.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpenStream - Free Streaming Hub for Movies, TV Shows and Anime',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OpenStreamApp',
    creator: '@OpenStreamApp',
    title: 'OpenStream - Free Movies, TV Shows & Anime Streaming Hub',
    description: 'Stream unlimited content from Netflix, Prime Video, Disney+ and more. Completely free, no ads, HD quality.',
    images: [
      {
        url: '/images/twitter-card.jpg',
        alt: 'OpenStream - Free Streaming Hub'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    title: 'OpenStream',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/images/apple-startup-640x1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
      }
    ]
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false
  },
  category: 'entertainment',
  classification: 'Entertainment, Streaming, Movies, TV Shows, Anime'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="generator" content="Next.js" />
        <meta name="application-name" content="OpenStream" />
        <meta name="apple-mobile-web-app-title" content="OpenStream" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://openstream.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OpenStream",
              "url": "https://openstream.app",
              "logo": "https://openstream.app/images/logo.png",
              "description": "Free streaming platform for movies, TV shows, and anime",
              "sameAs": [
                "https://github.com/OpenStream-Official",
                "https://discord.gg/openstream",
                "https://t.me/openstream"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://github.com/OpenStream-Official/OpenStream-Repository/issues"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="admin-theme">
          <noscript>
            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#1f2937', color: 'white' }}>
              <h1>JavaScript Required</h1>
              <p>This application requires JavaScript to function properly. Please enable JavaScript in your browser.</p>
            </div>
          </noscript>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
