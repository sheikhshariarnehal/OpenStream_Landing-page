import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenStream - All In One Streaming Hub',
  description: 'Access unlimited movies, series, and anime from top OTT servers like Netflix, Prime Video, Disney+ and premium BDix servers. Totally free, no ads, HD quality streaming.',
  keywords: 'streaming, movies, series, anime, Netflix, Prime Video, Disney+, BDix, free streaming, HD quality, no ads',
  authors: [{ name: 'OpenStream Team' }],
  creator: 'OpenStream',
  publisher: 'OpenStream',
  robots: 'index, follow',
  openGraph: {
    title: 'OpenStream - All In One Streaming Hub',
    description: 'Access unlimited movies, series, and anime from top OTT servers completely free',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenStream - All In One Streaming Hub',
    description: 'Access unlimited movies, series, and anime from top OTT servers completely free',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
