import { ethMainnet, ethOptimism } from '@/config/products/crypto'
import { ProductStaking, ProductStakingContracts } from '@/types/ProductStaking'

export const ethereumStaking: ProductStaking = {
  id: 1,
  name: 'ethereum-stake',
  title: 'Staking de Ethereum',
  symbol: 'stpETH',
  networkAvailable: 'ethereum',
  chainIdNetworkAvailable: 1,
  eigenPointsAvailable: false,
  newProductTag: false,
  apy: 5.7,
  scan: 'https://etherscan.io/',
  rampEnabled: true,
  asset: ethMainnet,
  description: 'ethereumDescription',
  enabled: true,
  urlRedirect: '/currency/ethereum/product/staking/ethereum-stake',
  stakeTogetherPool: {
    mainnet: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
    testnet: '0x6C1715B7F989A7dBc2635114e5f8B78F39eA6F48'
  },
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
  subgraph: {
    mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest',
    testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-holesky/version/latest'
  },
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  eventsTrack: {
    pageView: 'pageview-staking',
    checkout: 'initiateCheckout_staking',
    confirmation: 'confirmation-staking',
    success: 'success-staking',
    withdraw: 'withdraw-staking'
  },
  transactionConfig: {
    blockTimePerSeconds: 15,
    confirmations: 2
  }
}

export const ethereumOpStaking: ProductStaking = {
  id: 2,
  name: 'ethereum-restaking',
  title: 'Restaking',
  symbol: 'strETH',
  networkAvailable: 'optimism',
  chainIdNetworkAvailable: 10,
  eigenPointsAvailable: true,
  rampEnabled: true,
  asset: ethOptimism,
  newProductTag: true,
  apy: 5.7,
  scan: 'https://optimistic.etherscan.io',
  description: 'restakingDescription',
  enabled: true,
  urlRedirect: '/currency/optimism/product/staking/ethereum-restaking',
  stakeTogetherPool: {
    mainnet: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
    testnet: '0x15Df22857d8208d4add356dB92E48B347488969E'
  },
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
  subgraph: {
    mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together-optimism/version/latest',
    testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-op-sepolia/version/latest'
  },
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  eventsTrack: {
    pageView: 'pageview-restaking',
    checkout: 'initiateCheckout_restaking',
    confirmation: 'confirmation-restaking',
    success: 'success-restaking',
    withdraw: 'withdraw-restaking'
  },
  transactionConfig: {
    blockTimePerSeconds: 2,
    confirmations: 4
  }
}

export const chilizStaking: ProductStaking = {
  id: 3,
  name: 'chiliz',
  title: 'Chiliz',
  symbol: 'stpCHZ',
  networkAvailable: 'chiliz',
  chainIdNetworkAvailable: 0,
  eigenPointsAvailable: false,
  rampEnabled: false,
  asset: ethMainnet,
  newProductTag: false,
  apy: 14.5,
  scan: 'https://etherscan.io/',
  description: 'ethereumDescription',
  enabled: false,
  urlRedirect: '/',
  stakeTogetherPool: {
    mainnet: '0x0',
    testnet: '0x0'
  },
  contracts: {
    mainnet: {
      Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
      Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
      Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
      StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
      StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
    },
    testnet: {
      Airdrop: '0xE96c5D1BC7B84Ce9d50266c60B4f3f168f276e2a',
      Withdrawals: '0x6aCDAA664D66B781e83a4374Bb093b0a8750E081',
      Router: '0xB4b7B496E556252666264cd2CC67d602d929b717',
      StakeTogether: '0x726dbeB2A4eC157E82D53e4c6A747e1A9bDF39e0',
      StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
    }
  },
  subgraph: {
    mainnet: '',
    testnet: ''
  },
  tradingView: {
    symbol: 'ETHUSD',
    fiat: {
      usd: 'ETHUSD',
      brl: 'ETHBRL',
      eur: 'ETHEUR'
    }
  },
  eventsTrack: {
    pageView: 'pageview-chiliz',
    checkout: 'initiateCheckout_chiliz',
    confirmation: 'confirmation-chiliz',
    success: 'success-chiliz',
    withdraw: 'withdraw-chiliz'
  },
  transactionConfig: {
    blockTimePerSeconds: 0,
    confirmations: 0
  }
}

export const stakingList: ProductStaking[] = [chilizStaking, ethereumOpStaking, ethereumStaking]

export function getStakingProduct({ name }: { name: string }): ProductStaking {
  return stakingList.find(product => product.name === name) || stakingList[0]
}

export function getStakingContracts({
  name,
  isTestnet
}: {
  name: string
  isTestnet: boolean
}): ProductStakingContracts {
  return getStakingProduct({ name: name }).contracts[isTestnet ? 'testnet' : 'mainnet']
}

export function getStakingSubgraph({ name, isTestnet }: { name: string; isTestnet: boolean }): string {
  return getStakingProduct({ name: name }).subgraph[isTestnet ? 'testnet' : 'mainnet']
}
