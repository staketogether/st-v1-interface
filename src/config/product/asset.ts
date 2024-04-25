import { Asset, AssetCategory } from '@/types/Asset'
import btcIcon from '@assets/assets/bitcoin.svg'
import ethIcon from '@assets/assets/ethereum.svg'
import chzIcon from '@assets/assets/chiliz.svg'
import opIcon from '@assets/assets/optimism.svg'
import arbIcon from '@assets/assets/arbitrum.svg'
import maticIcon from '@assets/assets/polygon.svg'

import { Chain } from '../chain'
import {
  btcOpMobula,
  ethEthMobula,
  ethOpMobula,
  chzEthMobula,
  maticPolMobula,
  arbArbMobula,
  opOpMobula
} from '@/config/mobula'

export const ethMainnet: Asset = {
  id: 'eth-mainnet',
  order: 1,
  symbol: 'ETH',
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
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
  order: 1,
  symbol: 'ETH',
  contractAddress: '0x0000000000000000000000000000000000000000',
  symbolImage: ethIcon,
  localeDescription: 'eth',
  isTestnet: false,
  url: '/currency/optimism/product/assets/eth-op',
  category: AssetCategory.Crypto,
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
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
  order: 2,
  symbol: 'wBTC',
  symbolImage: btcIcon,
  isTestnet: false,
  url: '/currency/optimism/product/assets/btc-op',
  category: AssetCategory.Crypto,
  localeDescription: 'btc',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
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

export const chilizChz: Asset = {
  id: 'chz-chiliz',
  order: 6,
  symbol: 'CHZ',
  symbolImage: chzIcon,
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
  url: '/currency/chiliz/product/assets/chz-chiliz',
  category: AssetCategory.Crypto,
  localeDescription: 'chz',
  chains: [Chain.CHZ_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
    elPoints: false
  },
  mobula: chzEthMobula,
  tradingView: {
    symbol: 'CHZUSD',
    fiat: {
      usd: 'CHZUSD',
      brl: 'CHZBRL',
      eur: 'CHZEUR'
    }
  },
  ramp: [
    {
      chainId: 88888,
      minDeposit: 10
    }
  ]
}

export const opOptimism: Asset = {
  id: 'op-op',
  order: 3,
  symbol: 'OP',
  symbolImage: opIcon,
  isTestnet: false,
  url: '/currency/optimism/product/assets/op-op',
  contractAddress: '0x4200000000000000000000000000000000000042',
  category: AssetCategory.Crypto,
  localeDescription: 'op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
    elPoints: false
  },
  mobula: opOpMobula,
  tradingView: {
    symbol: 'OPUSD',
    fiat: {
      usd: 'OPUSD',
      brl: 'OPBRL',
      eur: 'OPEUR'
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
        toToken: 'OP'
      }
    }
  ]
}

export const ethArbitrum: Asset = {
  id: 'arb-eth',
  order: 4,
  symbol: 'ETH',
  symbolImage: ethIcon,
  isTestnet: false,
  url: '/currency/arbitrum/product/assets/arb-eth',
  contractAddress: '0x0000000000000000000000000000000000000000',
  category: AssetCategory.Crypto,
  localeDescription: 'eth',
  chains: [Chain.ARB_MAINNET],
  listed: false,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
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
      chainId: 42161,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'ETH'
      }
    }
  ]
}

export const arbArbitrum: Asset = {
  id: 'arb-arb',
  order: 4,
  symbol: 'ARB',
  symbolImage: arbIcon,
  isTestnet: false,
  url: '/currency/arbitrum/product/assets/arb-arb',
  contractAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
  category: AssetCategory.Crypto,
  localeDescription: 'arb',
  chains: [Chain.ARB_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
    elPoints: false
  },
  mobula: arbArbMobula,
  tradingView: {
    symbol: 'ARBUSD',
    fiat: {
      usd: 'ARBUSD',
      brl: 'ARBBRL',
      eur: 'ARBEUR'
    }
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'ARB'
      }
    }
  ]
}

export const maticPolygon: Asset = {
  id: 'matic-matic',
  order: 5,
  symbol: 'MATIC',
  symbolImage: maticIcon,
  contractAddress: '0x0000000000000000000000000000000000000000',
  isTestnet: false,
  url: '/currency/polygon/product/assets/matic-matic',
  category: AssetCategory.Crypto,
  localeDescription: 'matic',
  chains: [Chain.POL_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
    elPoints: false
  },
  mobula: maticPolMobula,
  tradingView: {
    symbol: 'MATICUSD',
    fiat: {
      usd: 'MATICUSD',
      brl: 'MATICBRL',
      eur: 'MATICEUR'
    }
  },
  ramp: [
    {
      chainId: 137,
      minDeposit: 10
    }
  ]
}

export const assetsList: Asset[] = [ethMainnet, ethOp, btcOp, chilizChz, opOptimism, maticPolygon, arbArbitrum, ethArbitrum]

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
