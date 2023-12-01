import Script from 'next/script'

export const Cloudflare = () => {
  return (
    <Script
      id='cloudflare-analytics'
      defer
      strategy='afterInteractive'
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}"}'`}
    />
  )
}
