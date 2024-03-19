import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from '@wagmi/connectors'
import { mainnet, optimismSepolia, holesky } from '@wagmi/core/chains'
import Web3AuthConnectorInstance from './web3Auth'

const connectors = [
  ...Web3AuthConnectorInstance([mainnet, optimismSepolia, holesky]),
  injected(),
  walletConnect({
    projectId: String(process.env.NEXT_PUBLIC_WALLET_CONNECT),
    showQrModal: true
  })
]

const config = createConfig({
  chains: [mainnet, optimismSepolia, holesky],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string),
    [optimismSepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_OPTIMIST_SEPOLIA_API_KEY as string),
    [holesky.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_HOLESKY_API_KEY as string)
  },
  connectors
})

export { config }
