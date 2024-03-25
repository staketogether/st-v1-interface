import { holesky, mainnet, optimismSepolia } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import Web3AuthConnectorInstance from './web3Auth'

const handleRpcPerChain = (chainId: number) => {
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string,
    17000: process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string,
    11155420: process.env.NEXT_PUBLIC_RPC_OPTIMIST_SEPOLIA_URL as string
  }

  return alchemyKey[chainId] || ''
}

const { chains, publicClient } = configureChains(
  [mainnet, optimismSepolia, holesky],
  [
    jsonRpcProvider({
      rpc: chain => ({
        http: handleRpcPerChain(chain.id),
        chainId: chain.id
      })
    })
  ],
  {
    retryCount: 1
  }
)

const connectors = [
  ...Web3AuthConnectorInstance(chains),
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
