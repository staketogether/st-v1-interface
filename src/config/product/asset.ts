import { Asset, AssetCategory } from '@/types/Asset'
import btcIcon from '@assets/assets/bitcoin.svg'
import ethIcon from '@assets/network/ethereum.svg'

import { Chain } from '../chain'
import { btcOpMobula, ethEthMobula, ethOpMobula } from '@/config/mobula'

export const ethMainnet: Asset = {
  id: 'eth-mainnet',
  order: 1,
  symbol: 'ETH',
  isTestnet: false,
  symbolImage: ethIcon,
  url: '/currency/ethereum/product/assets/eth-mainnet',
  category: AssetCategory.Crypto,
  chains: [Chain.ETH_MAINNET],
  localeDescription: 'eth',
  listed: false,
  enabled: true,
  new: false,
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: ethEthMobula,
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300
    }
  ]
}

export const ethOp: Asset = {
  id: 'eth-op',
  order: 2,
  symbol: 'ETH',
  symbolImage: ethIcon,
  localeDescription: 'eth',
  isTestnet: false,
  url: '/currency/optimism/product/assets/eth-op',
  category: AssetCategory.Crypto,
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: ethOpMobula,
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'ETH'
      }
    }
  ]
}

export const btcOp: Asset = {
  id: 'btc-op',
  order: 3,
  symbol: 'wBTC',
  symbolImage: btcIcon,
  isTestnet: false,
  url: '/currency/optimism/product/assets/btc-op',
  category: AssetCategory.Crypto,
  localeDescription: 'btc',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  contractAddress: '0x68f180fcce6836688e9084f035309e29bf0a2095',
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: btcOpMobula,
  tradingView: {
    symbol: 'BTCUSD',
    fiat: {
      usd: 'BTCUSD',
      brl: 'BTCBRL',
      eur: 'BTCEUR'
    }
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'bitcoin'
      }
    }
  ]
}

export const assetsList: Asset[] = [ethMainnet, ethOp, btcOp]

export function getAssetsByCategory(category: AssetCategory): Asset[] {
  return assetsList
    .filter(asset => asset.category === category)
    .filter(asset => asset.listed)
    .sort((a, b) => a.order - b.order)
}

export function getAssetById(id: string): Asset {
  const asset = assetsList.find(assetItem => assetItem.id === id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  return asset
}
