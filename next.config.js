/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    minimumCacheTTL: 600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  async rewrites() {
    return []
  },
  async redirects() {
    return [
      { source: '/', destination: 'https://use.staketogether.app', permanent: true },
      { source: '/en', destination: 'https://use.staketogether.app', permanent: true },
      { source: '/pt', destination: 'https://use.staketogether.app/pt', permanent: true },
      {
        source: '/ethereum',
        destination: '/en/ethereum/invest',
        permanent: true
      },
      {
        source: '/en/ethereum',
        destination: '/en/ethereum/invest',
        permanent: true
      },
      {
        source: '/pt/ethereum',
        destination: '/pt/ethereum/invest',
        permanent: true
      }
    ]
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA(nextConfig)
