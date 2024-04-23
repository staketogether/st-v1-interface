import { MobulaAsset } from '@/types/MobulaAsset'

export const ethEthMobula: MobulaAsset = {
  id: 'eth-mainnet',
  asset: 'Ethereum',
  blockchain: 'ethereum',
  symbol: 'eth',
  filter: 'Ethereum-ethereum'
}

export const ethOpMobula: MobulaAsset = {
  id: 'eth-op',
  asset: 'Ethereum',
  blockchain: 'optimism',
  symbol: 'eth',
  filter: 'Ethereum-optimism'
}

export const btcOpMobula: MobulaAsset = {
  id: 'btc-op',
  asset: 'Bitcoin',
  blockchain: 'optimism',
  symbol: 'wbtc',
  filter: 'Bitcoin-optimism'
}

export const chzEthMobula: MobulaAsset = {
  id: 'chz-chiliz',
  asset: 'Chiliz',
  blockchain: 'ethereum',
  symbol: 'chz',
  filter: 'Chiliz-ethereum'
}

export const opOpMobula: MobulaAsset = {
  id: 'op-op',
  asset: 'Optimism',
  blockchain: 'optimism',
  symbol: 'op',
  filter: 'Optimism-optimism'
}

export const arbArbMobula: MobulaAsset = {
  id: 'arb-arb',
  asset: 'Arbitrum',
  blockchain: 'arbitrum',
  symbol: 'arb',
  filter: 'Arbitrum-arbitrum'
}

export const maticPolMobula: MobulaAsset = {
  id: 'matic-pol',
  asset: 'Polygon',
  blockchain: 'polygon',
  symbol: 'matic',
  filter: 'Polygon-polygon'
}

export const mobulaAssets = [ethEthMobula, ethOpMobula, btcOpMobula, chzEthMobula, opOpMobula, arbArbMobula, maticPolMobula]

export const getMobulaAssetById = (id: string): MobulaAsset => {
  const mobulaAsset = mobulaAssets.find(asset => asset.id === id)

  if (!mobulaAsset) {
    throw new Error(`Mobula asset with id ${id} not found`)
  }

  return mobulaAsset
}