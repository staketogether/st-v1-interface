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
    WrappedStageTogether: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI),
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    contracts: {
      Airdrop: '0xAB99F24E3e08dC2A9A1D9ff02F433905de0cF85b',
      Withdrawals: '0xBc17749133560Ee932A72DD5fF19f70a1Ca592FB',
      Router: '0x0aFEA28F7a8d28C0558b89600caA326B3f947764',
      StakeTogether: '0xA150cA113A7f468ae0b9688Cb8aF161Aa85d99e6',
      WrappedStageTogether: '0x6BD9bb497fd9b4032324417EA45603af837c01bE'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/51080/stake-together/v0.0.48',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/master`
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
