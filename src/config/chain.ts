import { ethers } from 'ethers'
import { arbitrum, arbitrumSepolia, chiliz, mainnet, optimism, optimismSepolia, polygon, polygonMumbai, sepolia, spicy } from 'wagmi/chains'

interface BlockExplorerConfig {
  baseUrl: string
}

export interface ChainConfig {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  isTestnet: boolean
}

const configs: ChainConfig[] = [
  {
    chainId: mainnet.id,
    name: 'Ethereum',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ETH_MAINNET_URL),
    isTestnet: false,
    blockExplorer: {
      baseUrl: mainnet.blockExplorers.default.url
    }
  },
  {
    chainId: optimism.id,
    name: 'Optimism',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_OP_MAINNET_URL),
    isTestnet: false,
    blockExplorer: {
      baseUrl: optimism.blockExplorers.default.url
    }
  },
  {
    chainId: arbitrum.id,
    name: 'Arbitrum',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ARB_MAINNET_URL),
    isTestnet: false,
    blockExplorer: {
      baseUrl: arbitrum.blockExplorers.default.url
    }
  },
  {
    chainId: polygon.id,
    name: 'Polygon',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_POL_MAINNET_URL),
    isTestnet: false,
    blockExplorer: {
      baseUrl: polygon.blockExplorers.default.url
    }
  },
  {
    chainId: chiliz.id,
    name: 'Chiliz',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_CHZ_MAINNET_URL),
    isTestnet: false,
    blockExplorer: {
      baseUrl: chiliz.blockExplorers.default.url
    }
  },
  {
    chainId: sepolia.id,
    name: 'Sepolia',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ETH_TESTNET_URL),
    isTestnet: true,
    blockExplorer: {
      baseUrl: sepolia.blockExplorers.default.url
    }
  },
  {
    chainId: optimismSepolia.id,
    name: 'Optimism',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_OP_TESTNET_URL),
    isTestnet: true,
    blockExplorer: {
      baseUrl: optimismSepolia.blockExplorers.default.url
    }
  },
  {
    chainId: arbitrumSepolia.id,
    name: 'Arbitrum Sepolia',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ARB_TESTNET_URL),
    isTestnet: true,
    blockExplorer: {
      baseUrl: arbitrumSepolia.blockExplorers.default.url
    }
  },
  {
    chainId: polygonMumbai.id,
    name: 'Polygon Mumbai',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_POL_TESTNET_URL),
    isTestnet: true,
    blockExplorer: {
      baseUrl: polygonMumbai.blockExplorers.default.url
    }
  },
  {
    chainId: spicy.id,
    name: 'Chiliz Spicy',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_CHZ_TESTNET_URL),
    isTestnet: true,
    blockExplorer: {
      baseUrl: spicy.blockExplorers.default.url
    }
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
  const config: ChainConfig | undefined = configs.find(c => c.chainId === chainId)
  if (!config) throw new Error('chainConfigByChainId: chainId not found')
  return config
}
