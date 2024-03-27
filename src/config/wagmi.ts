import { createConfig, http } from 'wagmi'
import { mainnet, optimism, holesky, optimismSepolia } from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'
import Web3AuthConnectorInstances from '@/config/web3Auth'

export const config = createConfig({
  chains: [mainnet, optimism, holesky, optimismSepolia],
  connectors: [
    ...Web3AuthConnectorInstances([mainnet, optimismSepolia, holesky]),
    safe(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT as string, showQrModal: true })
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string),
    [optimismSepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_OPTIMIST_SEPOLIA_API_KEY as string),
    [holesky.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_HOLESKY_API_KEY as string),
    [optimism.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_API_KEY as string)
  }
})
