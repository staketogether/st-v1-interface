import { ethers } from 'ethers'

interface BlockExplorerConfig {
  baseUrl: string
}

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  isTestnet: boolean
  subgraphs: {
    stBackend: string
    analytics: string
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 1,
    name: 'mainnet',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET),
    isTestnet: false,
    blockExplorer: {
      baseUrl: 'https://etherscan.io'
    },
    subgraphs: {
      stBackend: 'https://st-backend-thz2yhu72a-uc.a.run.app/graphql',
      analytics: 'https://st-analytics-api-ddfui.ondigitalocean.app/graphql'
    }
  },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI),
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    isTestnet: true,
    subgraphs: {
      stBackend: 'https://st-backend-thz2yhu72a-uc.a.run.app/graphql',
      analytics: 'https://st-analytics-api-ddfui.ondigitalocean.app/graphql'
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
