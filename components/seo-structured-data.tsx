interface StructuredDataProps {
  type: 'SoftwareApplication' | 'Organization' | 'WebSite' | 'FAQPage'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

// Predefined structured data for common use cases
export const SoftwareApplicationData = {
  name: "OpenStream",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Android",
  description: "Free streaming app for movies, TV shows, and anime with access to Netflix, Prime Video, Disney+ and premium BDix servers",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "15000"
  },
  author: {
    "@type": "Organization",
    name: "OpenStream Team"
  },
  downloadUrl: "https://cloudstream-apk.com/wp-content/uploads/2025/04/4.5.2_(cloudstream-apk.com).apk",
  softwareVersion: "4.5.2",
  fileSize: "25MB",
  screenshot: [
    "https://openstream.app/images/screenshot-1.jpg",
    "https://openstream.app/images/screenshot-2.jpg"
  ]
}

export const OrganizationData = {
  name: "OpenStream",
  url: "https://openstream.app",
  logo: "https://openstream.app/images/logo.png",
  description: "Free streaming platform for movies, TV shows, and anime",
  sameAs: [
    "https://github.com/OpenStream-Official",
    "https://discord.gg/openstream",
    "https://t.me/openstream"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://github.com/OpenStream-Official/OpenStream-Repository/issues"
  }
}

export const WebSiteData = {
  name: "OpenStream",
  url: "https://openstream.app",
  description: "Free streaming platform for movies, TV shows, and anime",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://openstream.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
