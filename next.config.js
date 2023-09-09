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
    return [
      { source: '/', destination: 'https://org.staketogether.app' },
      { source: '/en', destination: 'https://org.staketogether.app/en' },
      { source: '/pt', destination: 'https://org.staketogether.app/pt' }
    ]
  },
  async redirects() {
    return [
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
