import { mainnet } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `${process.env.NEXT_PUBLIC_RPC_MAINNET}`,
        chainId: 1
      })
    }),
    publicProvider()
  ],
  {
    retryCount: 1
  }
)

const connectors = [
  // ...Web3AuthConnectorInstance(chains),
  new MetaMaskConnector({ chains }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Rabby',
      shimDisconnect: false
    }
  }),
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
