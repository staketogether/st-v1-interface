import Web3AuthConnectorInstances from '@/config/web3Auth'
import { createConfig, http } from 'wagmi'
import {
  arbitrum,
  arbitrumSepolia,
  chiliz,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
  spicy,
  zkSync
} from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'

const handleConnectors = () => {
  if (typeof window !== 'undefined') {
    return [
      ...Web3AuthConnectorInstances([
        mainnet,
        optimism,
        arbitrum,
        polygon,
        chiliz,
        sepolia,
        optimismSepolia,
        arbitrumSepolia,
        polygonMumbai,
        spicy,
        zkSync
      ]).connectors,
      safe(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT!, showQrModal: true })
    ]
  }
  return []
}

export const config = createConfig({
  chains: [mainnet, optimism, arbitrum, polygon, chiliz, sepolia, optimismSepolia, arbitrumSepolia, polygonMumbai, spicy, zkSync],
  connectors: handleConnectors(),
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_ETH_MAINNET_URL),
    [optimism.id]: http(process.env.NEXT_PUBLIC_RPC_OP_MAINNET_URL),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_RPC_ARB_MAINNET_URL),
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_POL_MAINNET_URL),
    [chiliz.id]: http(process.env.NEXT_PUBLIC_RPC_CHZ_MAINNET_URL),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_ETH_TESTNET_URL),
    [optimismSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_OP_TESTNET_URL),
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_ARB_TESTNET_URL),
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_RPC_POL_TESTNET_URL),
    [spicy.id]: http(process.env.NEXT_PUBLIC_RPC_SPICY_MAINNET_URL),
    [zkSync.id]: http(process.env.NEXT_PUBLIC_RPC_ZKSYNC_MAINNET_RPC_URL)
  }
})
