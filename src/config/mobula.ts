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

export const mobulaAssets = [ethEthMobula, ethOpMobula, btcOpMobula]

export const getMobulaAssetById = (id: string): MobulaAsset => {
  const mobulaAsset = mobulaAssets.find(asset => asset.id === id)

  if (!mobulaAsset) {
    throw new Error(`Mobula asset with id ${id} not found`)
  }

  return mobulaAsset
}