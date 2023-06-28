import { goerli, localhost } from 'viem/chains'
import { configureChains, createConfig, mainnet } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import chainConfig from './chain'
import Web3AuthConnectorInstance from './web3Auth'

const currentChain = () => {
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

const { chains, publicClient } = configureChains(
  [currentChain()],
  [alchemyProvider({ apiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY) }), publicProvider()],
  {
    rank: true,
    retryCount: 5
  }
)

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
  })
  // new InjectedConnector({
  //   chains,
  //   options: {
  //     name: 'Injected',
  //     shimDisconnect: true
  //   }
  // })
]

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export { chains, config, currentChain }
