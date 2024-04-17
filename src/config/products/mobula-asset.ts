type MobulaAsset = {
  asset: string
  blockchain: string
  symbol: string
}

export const bitcoinOpMobula: MobulaAsset = {
  asset: 'Bitcoin',
  blockchain: 'optimism',
  symbol: 'wbtc'
}

export const ethereumOpMobula: MobulaAsset = {
  asset: 'Ethereum',
  blockchain: 'optimism',
  symbol: 'eth'
}

export const ethereumEthModula: MobulaAsset = {
  asset: 'Ethereum',
  blockchain: 'ethereum',
  symbol: 'eth'

}

export const mobulaAssets: MobulaAsset[] = [bitcoinOpMobula, ethereumOpMobula, ethereumEthModula]