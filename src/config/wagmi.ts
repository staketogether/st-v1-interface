import { goerli, localhost } from 'viem/chains'
import { configureChains, createConfig, mainnet } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import chainConfig from './chain'
import Web3AuthConnectorInstance from './web3Auth'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, localhost],
  [alchemyProvider({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY) }), publicProvider()],
  {
    rank: true,
    retryCount: 5
  }
)

const currentChain = () => {
  const { chainId } = chainConfig()

  if (chainId === 1) {
    return chains[0]
  }

  if (chainId === 5) {
    return chains[1]
  }

  if (chainId === 31337) {
    return chains[2]
  }

  throw new Error('Chain not supported')
}

const connectors = [
  ...Web3AuthConnectorInstance(currentChain()),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: String(process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY),
      showQrModal: true
    }
  }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Stake Together'
    }
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true
    }
  })
]

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export { chains, config, currentChain }
