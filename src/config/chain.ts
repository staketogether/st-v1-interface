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
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI),
    stakeTogetherPool: '0x2050A9E6d5995aA14630AA4f1FF9b24D8926a016',
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    contracts: {
      Airdrop: '0x5965121361612dd375FEe7Bc2BfEcc5d5c97AC4B',
      Withdrawals: '0x7196aF48a3eD18872C6Aa7f41c63586f57e71854',
      Router: '0x34f7595158fEE901A0B66074e1c86F8e1671779f',
      StakeTogether: '0x989F9B4624CD4A141f48bEC5cd3eF716B15260b6',
      StakeTogetherWrapper: '0x7CCeB44B5a455Ed42010B0651295B85E0be23c29'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/51080/st-subgraph-goerli/version/latest',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
