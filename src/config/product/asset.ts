import { Asset, AssetCategory } from '@/types/Asset'
import arbIcon from '@assets/assets/arbitrum.svg'
import btcIcon from '@assets/assets/bitcoin.svg'
import chzIcon from '@assets/assets/chiliz.svg'
import ethIcon from '@assets/assets/ethereum.svg'
import opIcon from '@assets/assets/optimism.svg'
import maticIcon from '@assets/assets/polygon.svg'
import stpEthIcon from '@assets/assets/stp-eth.svg'
import strEthIcon from '@assets/assets/str-eth.svg'
import { Chain } from '../chain'

export const ethMainnet: Asset = {
  id: 'eth-mainnet',
  order: 1,
  symbol: 'ETH',
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
  type: 'native',
  wrapperContractAddress: '0x4200000000000000000000000000000000000006',
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
  type: 'erc20',
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
  type: 'native',
  wrapperContractAddress: '0x721EF6871f1c4Efe730Dce047D40D1743B886946',
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
  type: 'erc20',
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
  type: 'native',
  wrapperContractAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
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
  type: 'erc20',
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
  type: 'native',
  wrapperContractAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
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
  ramp: [
    {
      chainId: 137,
      minDeposit: 10
    }
  ]
}

const stpEth: Asset = {
  id: 'stp-eth',
  order: 1,
  symbol: 'ETH',
  contractAddress: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
  type: 'erc20',
  symbolImage: stpEthIcon,
  url: '/currency/ethereum/product/assets/stp-eth',
  category: AssetCategory.Crypto,
  chains: [Chain.ETH_MAINNET],
  listed: false,
  enabled: true,
  isTestnet: false,
  new: false,
  localeDescription: 'eth',
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300
    }
  ]
}

const stpReth: Asset = {
  id: 'stp-reth',
  order: 2,
  symbol: 'strETH',
  contractAddress: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
  type: 'erc20',
  symbolImage: strEthIcon,
  url: '/currency/ethereum/product/assets/stp-reth',
  category: AssetCategory.Crypto,
  chains: [Chain.OP_MAINNET],
  listed: false,
  enabled: true,
  isTestnet: false,
  new: false,
  localeDescription: 'reth',
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300
    }
  ]
}

export const assetsList: Asset[] = [
  ethMainnet,
  ethOp,
  btcOp,
  chilizChz,
  opOptimism,
  maticPolygon,
  arbArbitrum,
  ethArbitrum,
  stpEth,
  stpReth
]

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
