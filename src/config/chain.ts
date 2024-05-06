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
  paymasterKey?: string
  transactionConfig: {
    blockTimePerSeconds: number
    confirmations: number
  }
}

const configs: ChainConfig[] = [
  {
    chainId: mainnet.id,
    name: 'Ethereum',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ETH_MAINNET_URL),
    isTestnet: false,
    paymasterKey: process.env.NEXT_PUBLIC_PAYMASTER_ETH_MAINNET,
    blockExplorer: {
      baseUrl: mainnet.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 15,
      confirmations: 2
    }
  },
  {
    chainId: optimism.id,
    name: 'Optimism',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_OP_MAINNET_URL),
    isTestnet: false,
    paymasterKey: process.env.NEXT_PUBLIC_PAYMASTER_OP_MAINNET,
    blockExplorer: {
      baseUrl: optimism.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: arbitrum.id,
    name: 'Arbitrum',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ARB_MAINNET_URL),
    isTestnet: false,
    paymasterKey: process.env.NEXT_PUBLIC_PAYMASTER_ARB_MAINNET,
    blockExplorer: {
      baseUrl: arbitrum.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: polygon.id,
    name: 'Polygon',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_POL_MAINNET_URL),
    isTestnet: false,
    paymasterKey: process.env.NEXT_PUBLIC_PAYMASTER_POL_MAINNET,
    blockExplorer: {
      baseUrl: polygon.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: chiliz.id,
    name: 'Chiliz',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_CHZ_MAINNET_URL),
    isTestnet: false,
    paymasterKey: process.env.NEXT_PUBLIC_PAYMASTER_CHZ_MAINNET,
    blockExplorer: {
      baseUrl: chiliz.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: sepolia.id,
    name: 'Sepolia',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ETH_TESTNET_URL),
    isTestnet: true,
    paymasterKey: '0x',
    blockExplorer: {
      baseUrl: sepolia.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: optimismSepolia.id,
    name: 'OptimismSp',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_OP_TESTNET_URL),
    isTestnet: true,
    paymasterKey: 'XWk3Bd3kC.5a555601-f5ab-4fed-ab01-5ad406015e80',
    blockExplorer: {
      baseUrl: optimismSepolia.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: arbitrumSepolia.id,
    name: 'Arbitrum Sepolia',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_ARB_TESTNET_URL),
    isTestnet: true,
    paymasterKey: '0x',
    blockExplorer: {
      baseUrl: arbitrumSepolia.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: polygonMumbai.id,
    name: 'Polygon Mumbai',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_POL_TESTNET_URL),
    isTestnet: true,
    paymasterKey: '0x',
    blockExplorer: {
      baseUrl: polygonMumbai.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  },
  {
    chainId: spicy.id,
    name: 'Chiliz Spicy',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_CHZ_TESTNET_URL),
    isTestnet: true,
    paymasterKey: '0x',
    blockExplorer: {
      baseUrl: spicy.blockExplorers.default.url
    },
    transactionConfig: {
      blockTimePerSeconds: 4,
      confirmations: 2
    }
  }
]

export enum Chain {
  ETH_MAINNET = mainnet.id,
  OP_MAINNET = optimism.id,
  ARB_MAINNET = arbitrum.id,
  POL_MAINNET = polygon.id,
  CHZ_MAINNET = chiliz.id,
  ETH_TESTNET = sepolia.id,
  OP_TESTNET = optimismSepolia.id,
  ARB_TESTNET = arbitrumSepolia.id,
  POL_TESTNET = polygonMumbai.id,
  CHZ_TESTNET = spicy.id
}

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
