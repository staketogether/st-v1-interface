import { goerli, localhost } from 'viem/chains'
import { configureChains, createConfig, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import chainConfig from './chain'

const selectChainConfig = () => {
  const { chainId } = chainConfig()

  if (chainId === 1) {
    return mainnet
  }

  if (chainId === 5) {
    return goerli
  }

  if (chainId === 31337) {
    return localhost
  }

  throw new Error('Chain not supported')
}

const { chains, publicClient, webSocketPublicClient } = configureChains([selectChainConfig()], [], {
  rank: true,
  retryCount: 3
})

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient
})

export { chains, config }
