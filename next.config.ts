import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['mapbox-gl'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ezbxnpbgeptdsbfwgqog.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'mapbox-gl/dist/mapbox-gl.js',
      '@payload-config': path.resolve(process.cwd(), 'payload.config.ts'),
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
