import { configureChains } from '@wagmi/core'
import { goerli, mainnet } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { localhost } from 'viem/chains'
import { createConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, localhost],
  [publicProvider()],
  { rank: true, retryCount: 3 }
)

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient
})

export { chains, config }
