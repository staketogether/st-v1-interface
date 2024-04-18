export interface MobulaAsset {
  asset: string
  blockchain: string
  symbol: string
  filterCoinConversion: string
}

export const bitcoinOpMobula: MobulaAsset = {
  asset: 'Bitcoin',
  blockchain: 'optimism',
  symbol: 'wbtc',
  filterCoinConversion: 'Bitcoin-optimism'
}

export const ethereumOpMobula: MobulaAsset = {
  asset: 'Ethereum',
  blockchain: 'optimism',
  symbol: 'eth',
  filterCoinConversion: 'Ethereum-optimism'
}

export const ethereumEthModula: MobulaAsset = {
  asset: 'Ethereum',
  blockchain: 'ethereum',
  symbol: 'eth',
  filterCoinConversion: 'Ethereum-ethereum'
}

export const mobulaAssets: MobulaAsset[] = [bitcoinOpMobula, ethereumOpMobula, ethereumEthModula]
