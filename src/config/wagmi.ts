import { goerli, localhost } from 'viem/chains'
import { configureChains, createConfig, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, localhost],
  [],
  { retryCount: 3 }
)

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient
})

export { chains, config }
