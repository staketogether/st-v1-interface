/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

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
        destination: '/mainnet/products',
        permanent: false
      },
      {
        source: '/mainnet',
        destination: '/mainnet/brl/products',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
