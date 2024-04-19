import { Asset, AssetCategory } from '@/types/Asset'
import btcIcon from '@assets/assets/bitcoin.svg'
import restakingIcon from '@assets/assets/restaking.svg'
import ethIcon from '@assets/network/ethereum.svg'

import { Chain } from './chain'

export const ethEth: Asset = {
  id: 'eth-eth',
  order: 1,
  symbol: 'ETH',
  isTestnet: false,
  symbolImage: ethIcon,
  logoImage: ethIcon,
  url: '/currency/product/eth',
  category: AssetCategory.Crypto,
  chains: [Chain.ETH_MAINNET],
  listed: false,
  enabled: true,
  new: false,
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: {
    asset: 'Ethereum',
    blockchain: 'ethereum',
    symbol: 'eth',
    filter: 'Ethereum-ethereum'
  },
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
  logoImage: ethIcon,
  isTestnet: false,
  url: '/currency/product/eth-op',
  category: AssetCategory.Crypto,
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: {
    asset: 'Ethereum',
    blockchain: 'optimism',
    symbol: 'eth',
    filter: 'Ethereum-optimism'
  },
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
  logoImage: btcIcon,
  isTestnet: false,
  url: '/currency/product/wbtc-op',
  category: AssetCategory.Crypto,
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  contractAddress: '0x68f180fcce6836688e9084f035309e29bf0a2095',
  points: {
    stPoints: false,
    elPoints: false
  },
  mobula: {
    asset: 'Bitcoin',
    blockchain: 'optimism',
    symbol: 'wbtc',
    filter: 'Bitcoin-optimism'
  },
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

export const ethStaking: Asset = {
  id: 'eth-staking',
  order: 4,
  symbol: 'stpETH',
  symbolImage: ethIcon,
  logoImage: ethIcon,
  isTestnet: false,
  url: '/currency/product/eth-staking',
  category: AssetCategory.Staking,
  chains: [Chain.ETH_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  linkedAssets: { [Chain.ETH_MAINNET]: ethEth },
  points: {
    stPoints: true,
    elPoints: false
  },
  mobula: {
    asset: 'Ethereum',
    blockchain: 'ethereum',
    symbol: 'eth',
    filter: 'Ethereum-ethereum'
  },
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  staking: {
    apy: 5.7,
    contracts: {
      Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
      Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
      Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
      StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
      StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
    },
    stakeTogetherPool: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
    subgraph: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest'
  }
}

export const ethRestaking: Asset = {
  id: 'eth-restaking',
  order: 5,
  symbol: 'strETH',
  symbolImage: restakingIcon,
  logoImage: restakingIcon,
  url: '/currency/product/eth-restaking',
  category: AssetCategory.Staking,
  chains: [Chain.OP_MAINNET],
  listed: true,
  isTestnet: false,
  enabled: true,
  new: true,
  linkedAssets: { [Chain.OP_MAINNET]: ethOp },
  points: {
    stPoints: true,
    elPoints: true
  },
  mobula: {
    asset: 'Ethereum',
    blockchain: 'optimism',
    symbol: 'eth',
    filter: 'Ethereum-optimism'
  },
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  staking: {
    apy: 5.7,
    contracts: {
      Airdrop: '0x9A967118f216eCE6B5853915691b96d28df19b4A',
      Withdrawals: '0xB01fD1CDd2fDfa3cC4955635776733A8abaad8F8',
      Router: '0x3B5f4719d701D905ab206C2255476bC37AfdcfdD',
      StakeTogether: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
      StakeTogetherWrapper: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508'
    },
    stakeTogetherPool: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
    subgraph: 'https://api.studio.thegraph.com/query/60033/stake-together-optimism/version/latest'
  }
}

export const assetsList: Asset[] = [ethEth, ethOp, btcOp, ethStaking, ethRestaking]

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

export function getAssetContractsById(id: string) {
  const asset = getAssetById(id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  if (!asset.staking) {
    throw new Error(`Asset with id ${id} does not have staking contracts`)
  }

  return asset.staking?.contracts
}

export function getAssetSubgraphById(id: string) {
  const asset = getAssetById(id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  if (!asset.staking) {
    throw new Error(`Asset with id ${id} does not have staking contracts`)
  }

  return asset.staking?.subgraph
}
