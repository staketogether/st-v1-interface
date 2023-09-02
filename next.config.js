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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/invest',
        permanent: false
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
