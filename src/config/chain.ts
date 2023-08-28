import { ethers } from 'ethers'

interface BlockExplorerConfig {
  baseUrl: string
}

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  subgraphs: {
    StakeTogether: string
    ContentFul: string
  }
  contracts: {
    Airdrop: `0x${string}`
    Withdrawals: `0x${string}`
    Router: `0x${string}`
    StakeTogether: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY}`
    ),
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    contracts: {
      Airdrop: '0xd7200bb807b617E216fcB49A55Bfa86c57A3F6A7',
      Withdrawals: '0x9A1e2bc3068f56B3d737C022b8f5068Ea31DC63c',
      Router: '0x1F6AC1ee1bEB0C079164f45201ebf1424880Fd1b',
      StakeTogether: '0x0290f3B76C837A06Cd585fd45A26C7B65A6d1A76'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/17823/stake-together-v2-goerli/v1.2.1',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/master`
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
