import { Asset, AssetCategory } from '@/types/Asset'
import btcIcon from '@assets/assets/bitcoin.svg'
import restakingIcon from '@assets/assets/restaking.svg'
import ethIcon from '@assets/network/ethereum.svg'

import { Chain } from './chain'

export const ethEth: Asset = {
  id: 'eth-eth',
  order: 1,
  symbol: 'ETH',
  image: ethIcon,
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
  image: ethIcon,
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
  image: btcIcon,
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
  image: ethIcon,
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
      mainnet: {
        Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
        Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
        Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
        StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
        StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
      },
      testnet: {
        Airdrop: '0x5B625457fE23e87957Eb9eE610D590BD848f4775',
        Withdrawals: '0xC43344d37f6Dd117676a33866fB086484834d4dF',
        Router: '0xfc65Cb4C3e00f760A42362b6a946818ebEFE7C31',
        StakeTogether: '0x6C1715B7F989A7dBc2635114e5f8B78F39eA6F48',
        StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
      }
    },
    stakeTogetherPool: {
      mainnet: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
      testnet: '0x6C1715B7F989A7dBc2635114e5f8B78F39eA6F48'
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest',
      testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-holesky/version/latest'
    }
  }
}

export const ethRestaking: Asset = {
  id: 'eth-restaking',
  order: 5,
  symbol: 'strETH',
  image: restakingIcon,
  url: '/currency/product/eth-restaking',
  category: AssetCategory.Staking,
  chains: [Chain.OP_MAINNET],
  listed: true,
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
      mainnet: {
        Airdrop: '0x9A967118f216eCE6B5853915691b96d28df19b4A',
        Withdrawals: '0xB01fD1CDd2fDfa3cC4955635776733A8abaad8F8',
        Router: '0x3B5f4719d701D905ab206C2255476bC37AfdcfdD',
        StakeTogether: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
        StakeTogetherWrapper: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508'
      },
      testnet: {
        Airdrop: '0x6D38e32dB2A5e88b3D6DEf74b981c4CAF50B0533',
        Withdrawals: '0xbBeAE3626810c9A001DdddF825A13793B94433Db',
        Router: '0xd5aC0835a7E537b4D263DbfDC8c6176fE04b878a',
        StakeTogether: '0x15Df22857d8208d4add356dB92E48B347488969E',
        StakeTogetherWrapper: '0xE9550754410Fa6f4B5EFC3379793c8bf2b69C59E'
      }
    },
    stakeTogetherPool: {
      mainnet: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
      testnet: '0x15Df22857d8208d4add356dB92E48B347488969E'
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together-optimism/version/latest',
      testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-op-sepolia/version/latest'
    }
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

export function getAssetContractsById(id: string, isTestnet: boolean) {
  const asset = getAssetById(id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  if (!asset.staking) {
    throw new Error(`Asset with id ${id} does not have staking contracts`)
  }

  return asset.staking?.contracts[isTestnet ? 'testnet' : 'mainnet']
}

export function getAssetSubgraphById(id: string, isTestnet: boolean) {
  const asset = getAssetById(id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  if (!asset.staking) {
    throw new Error(`Asset with id ${id} does not have staking contracts`)
  }

  return asset.staking?.subgraph[isTestnet ? 'testnet' : 'mainnet']
}
