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
}

export enum Networks {
  Mainnet = 1,
  OptimismSepolia = 11155420,
  holesky = 17000
}

const configs: ChainConfig[] = [
  {
    chainId: Networks.Mainnet,
    name: 'mainnet',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET),
    isTestnet: false,
    blockExplorer: {
      baseUrl: 'https://etherscan.io'
    }
  },
  {
    chainId: Networks.OptimismSepolia,
    name: 'Optimism Sepolia',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_OPTIMIST_SEPOLIA_API_KEY),
    blockExplorer: {
      baseUrl: 'https://optimism-sepolia.blockscout.com'
    },
    isTestnet: true
  },
  {
    chainId: Networks.holesky,
    name: 'holesky',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_HOLESKY_API_KEY),
    blockExplorer: {
      baseUrl: 'https://optimism-sepolia.blockscout.com'
    },
    isTestnet: true
  }
]

/**
 * @deprecated
 */
export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}

export function chainConfigByChainId(chainId: number): ChainConfig {
  const config = configs.find(c => c.chainId === chainId)
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
