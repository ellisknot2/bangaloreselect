import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BangaloreSelect — Curated Spatial Intelligence for Bangalore Real Estate',
  description:
    'Discover premium residential projects in Bangalore with data-driven insights, cluster analysis, and spatial intelligence. Make informed real estate decisions with BangaloreSelect.',
  keywords: 'Bangalore real estate, residential projects, property investment, North Bangalore, cluster analysis',
  openGraph: {
    title: 'BangaloreSelect — Curated Spatial Intelligence',
    description: 'Premium residential real estate intelligence for Bangalore',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
