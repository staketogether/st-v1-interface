export default function validEnv() {
  if (!process.env.NEXT_PUBLIC_CHAIN_ID) {
    throw new Error('NEXT_PUBLIC_CHAIN_ID not found in env')
  }
  if (!process.env.NEXT_PUBLIC_HOTJAR_ID) {
    throw new Error('NEXT_PUBLIC_HOTJAR_ID not found in env')
  }
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID not found in env')
  }
  if (!process.env.NEXT_PUBLIC_MIXPANEL_ID) {
    throw new Error('NEXT_PUBLIC_MIXPANEL_ID not found in env')
  }
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN) {
    throw new Error('NEXT_PUBLIC_CLOUDFLARE_TOKEN not found in env')
  }
  if (!process.env.NEXT_PUBLIC_WEB3_AUTH_ID) {
    throw new Error('NEXT_PUBLIC_WEB3_AUTH_ID not found in env')
  }
  if (!process.env.NEXT_PUBLIC_WALLET_CONNECT) {
    throw new Error('NEXT_PUBLIC_WALLET_CONNECT not found in env')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_TOKEN not found in env')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_SPACE not found in env')
  }
  if (!process.env.NEXT_PUBLIC_RPC_GOERLI) {
    throw new Error('NEXT_PUBLIC_RPC_GOERLI not found in env')
  }
  if (!process.env.NEXT_PUBLIC_RPC_MAINNET) {
    throw new Error('NEXT_PUBLIC_RPC_MAINNET not found in env')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT not found in env')
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_CMA_TOKEN) {
    throw new Error('NEXT_PUBLIC_CONTENTFUL_CMA_TOKEN not found in env')
  }
  if (!process.env.NEXT_PUBLIC_TRANSAK_API_KEY) {
    throw new Error('NEXT_PUBLIC_TRANSAK_API_KEY not found in env')
  }
  if (!process.env.NEXT_PUBLIC_WEB3_DEVNET_AUTH_ID) {
    throw new Error('NEXT_PUBLIC_WEB3_DEVNET_AUTH_ID not found in env')
  }
}
