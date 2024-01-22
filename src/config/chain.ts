import { ethers } from 'ethers'

interface BlockExplorerConfig {
  baseUrl: string
}

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  stakeTogetherPool: `0x${string}`
  subgraphs: {
    StakeTogether: string
    ContentFul: string
    stBackend: string
    analytics: string
  }
  contracts: {
    Airdrop: `0x${string}`
    Withdrawals: `0x${string}`
    Router: `0x${string}`
    StakeTogether: `0x${string}`
    StakeTogetherWrapper: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 1,
    name: 'mainnet',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET),
    stakeTogetherPool: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
    blockExplorer: {
      baseUrl: 'https://etherscan.io'
    },
    contracts: {
      Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
      Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
      Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
      StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
      StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
      stBackend: 'https://st-report-airdrop-merkle-thz2yhu72a-ue.a.run.app/graphql',
      analytics: 'https://164.92.89.8/graphql'
    }
  },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI),
    stakeTogetherPool: '0x3BdFaA0b55B4F6F3F9cFC6bbB1F582a1c6A0FD69',
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    contracts: {
      Airdrop: '0xE96c5D1BC7B84Ce9d50266c60B4f3f168f276e2a',
      Withdrawals: '0x6aCDAA664D66B781e83a4374Bb093b0a8750E081',
      Router: '0xB4b7B496E556252666264cd2CC67d602d929b717',
      StakeTogether: '0x726dbeB2A4eC157E82D53e4c6A747e1A9bDF39e0',
      StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/proxy/51080/st-subgraph-goerli/v0.2.8',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
      stBackend: 'https://st-report-airdrop-merkle-thz2yhu72a-ue.a.run.app/graphql',
      analytics: 'https://164.92.89.8/graphql'
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
