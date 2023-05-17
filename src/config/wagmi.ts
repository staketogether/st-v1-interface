import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient, goerli, mainnet } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import chainConfig from './chain'

const wagmiChain = () => {
  const { chainId } = chainConfig()

  const localhost = {
    id: 31337,
    name: 'Hardhat',
    network: 'localhost',
    nativeCurrency: {
      name: 'Hardhat Ether',
      symbol: 'HETH',
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ['http://localhost:8545']
      },
      public: {
        http: ['http://localhost:8545']
      }
    }
  }

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

const { chains, provider } = configureChains(
  [wagmiChain()],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: chainConfig().provider.connection.url
      })
    })
  ]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains })]
  }
])

export { chains }
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
