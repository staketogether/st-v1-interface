export type ProductAssetMarketData = {
  data: {
    ath: number
    atl: number
    is_listed: boolean
    liquidity: number
    liquidity_change_24h: number
    market_cap: number
    market_cap_diluted: number
    off_chain_volume: number
    price: number
    price_change_1h: number
    price_change_1m: number
    price_change_1y: number
    price_change_24h: number
    price_change_7d: number
    volume: number
    volume_7d: number
    volume_change_24h: number
  }
}

export type ProductAssetMobulaData = {
  asset: string
  blockchain: string
  symbol: string
}

export type TradingViewFiatData = {
  usd: string
  brl: string
  eur: string
}

export type ProductAsset = {
  id: number
  name: string
  description: string
  enabled: boolean
  newProductTag: boolean
  rampEnabled: boolean
  contract?: `0x${string}`
  listed: boolean
  ramp: {
    chainId: number
    minDeposit: number
    bridge?: {
      fromChainId: number
      fromToken: string
      toChainId: number
      toToken: string
    }
  }
  symbol: string
  scan: string
  urlRedirect: string
  networkAvailable: string
  chainIdNetworkAvailable: number
  mobula: ProductAssetMobulaData
  tradingView: {
    symbol: string
    fiat: TradingViewFiatData
  }
  eventsTrack: {
    pageView: string
    checkout: string
    confirmation: string
    success: string
    withdraw: string
  }
}
