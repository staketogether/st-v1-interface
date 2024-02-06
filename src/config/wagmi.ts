import { goerli, mainnet } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const handleNetwork = () => {
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string)
  switch (chainId) {
    case 1:
      return mainnet
    case 5:
      return goerli
    default:
      return mainnet
  }
}

const handleRpcProvider = (): string => {
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string)
  switch (chainId) {
    case 1:
      return `${process.env.NEXT_PUBLIC_RPC_MAINNET}` as string
    case 5:
      return `${process.env.NEXT_PUBLIC_RPC_GOERLI}` as string
    default:
      return `${process.env.NEXT_PUBLIC_RPC_MAINNET}` as string
  }
}

const { chains, publicClient } = configureChains(
  [handleNetwork()],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: handleRpcProvider(),
        chainId: `${process.env.NEXT_PUBLIC_CHAIN_ID}`
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
      name: 'Rabby'
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
