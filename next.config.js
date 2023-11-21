/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const { withSentryConfig } = require("@sentry/nextjs");

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
      {
        source: '/',
        destination: '/goerli/',
        permanent: false
      },
      {
        source: '/mainnet',
        destination: '/mainnet/brl',
        permanent: false
      },
      {
        source: '/goerli',
        destination: '/goerli/brl',
        permanent: false
      }
    ]
  }
}

module.exports = withSentryConfig(
  withPWA(nextConfig),
  {
    silent: true,
    org: "stake-together",
    project: "st-interface",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
)
