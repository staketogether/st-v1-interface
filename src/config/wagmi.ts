import { goerli, mainnet } from 'viem/chains'
import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import Web3AuthConnectorInstance from './web3Auth'

const handleAlchemyKey = (chainId: number) => { 
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string,
    5: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY as string
  }

  return alchemyKey[chainId] || ''
}

const { chains, publicClient } = configureChains(
  [ mainnet, goerli],
  [   
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.alchemy.http[0]+`/${handleAlchemyKey(chain.id)}`,
        chainId: chain.id
      }),
    }),
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
