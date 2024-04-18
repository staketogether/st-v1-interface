import Web3AuthConnectorInstances from '@/config/web3Auth'
import { createConfig, http } from 'wagmi'
import { arbitrum, arbitrumSepolia, chiliz, mainnet, optimism, optimismSepolia, polygon, polygonMumbai, sepolia, spicy } from 'wagmi/chains'
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
        spicy
      ]).connectors,
      safe(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT as string, showQrModal: true })
    ]
  }
  return []
}

export const config = createConfig({
  chains: [mainnet, optimism, arbitrum, polygon, chiliz, sepolia, optimismSepolia, arbitrumSepolia, polygonMumbai, spicy],
  connectors: handleConnectors(),
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_ETH_MAINNET_URL as string),
    [optimism.id]: http(process.env.NEXT_PUBLIC_RPC_OP_MAINNET_URL as string),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_RPC_ARB_MAINNET_URL as string),
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_POL_MAINNET_URL as string),
    [chiliz.id]: http(process.env.NEXT_PUBLIC_RPC_CHZ_MAINNET_URL as string),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_ETH_TESTNET_URL as string),
    [optimismSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_OP_TESTNET_URL as string),
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_ARB_TESTNET_URL as string),
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_RPC_POL_TESTNET_URL as string),
    [spicy.id]: http(process.env.NEXT_PUBLIC_RPC_SPICY_MAINNET_URL as string)
  }
})
