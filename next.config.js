/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  env: {
    COMMIT_HASH: process.env.COMMIT_HASH
  },
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
  transpilePackages: ['@lifi/widget', '@lifi/wallet-management'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/brl/crypto',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
