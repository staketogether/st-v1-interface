import { goerli } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import Web3AuthConnectorInstance from './web3Auth'

const { chains, publicClient } = configureChains(
  [goerli],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `${process.env.NEXT_PUBLIC_RPC_GOERLI}`
      })
    }),
    publicProvider()
  ],
  {
    retryCount: 1
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
  })
]

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export { chains, config }
