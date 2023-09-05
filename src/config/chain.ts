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
      Airdrop: '0xfc58edB236EDa6419f36730e6571cD2741f66A2b',
      Withdrawals: '0xAa239728BFE657Bd3CcD93E47325077419Dc234d',
      Router: '0xEDc6FD2A5C28ba251bD118dB1DE7F70107caD487',
      StakeTogether: '0x0106805dFa5a63638842cC757620f1791f73036d'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/51080/stake-together/version/latest',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/master`
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
