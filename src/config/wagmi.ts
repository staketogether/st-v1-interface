import Web3AuthConnectorInstances from '@/config/web3Auth'
import { createConfig, http } from 'wagmi'
import { holesky, mainnet, optimism, optimismSepolia } from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'

const handleConnectors = () => {
  if (typeof window !== 'undefined') {
    return [
      ...Web3AuthConnectorInstances([mainnet, optimismSepolia, holesky]).connectors,
      safe(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT as string, showQrModal: true })
    ]
  }
  return []
}

export const config = createConfig({
  chains: [mainnet, optimism, holesky, optimismSepolia],
  connectors: handleConnectors(),
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string),
    [optimism.id]: http(process.env.NEXT_PUBLIC_RPC_OPTIMISM_URL as string),
    [holesky.id]: http(process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string),
    [optimismSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_OPTIMIST_SEPOLIA_URL as string)
  }
})
