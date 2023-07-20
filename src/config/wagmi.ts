import { goerli } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import Web3AuthConnectorInstance from './web3Auth'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY) }), publicProvider()],
  {
    retryCount: 5
  }
)

const connectors = [
  ...Web3AuthConnectorInstance(chains),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: String(process.env.NEXT_PUBLIC_WALLET_CONNECT),
      showQrModal: true
    }
  }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Stake Together'
    }
  })
]

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export { chains, config }
