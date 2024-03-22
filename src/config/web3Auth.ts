import { CHAIN_NAMESPACES } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import * as ChainConfig from 'viem/chains'
import stSymbol from '@assets/st-symbol.svg'

const iconUrl = stSymbol

const handleRpcPerChain = (chainId: number) => {
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string,
    17000: process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string,
    11155420: process.env.NEXT_PUBLIC_RPC_OPTIMIST_SEPOLIA_URL as string
  }

  return alchemyKey[chainId] || ''
}

export default function Web3AuthConnectorInstance(chains: ChainConfig.Chain[]) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chains[0].id.toString(16),
    rpcTarget: handleRpcPerChain(chains[0].id),
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string
  }

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: chains[0].testnet
      ? String(process.env.NEXT_PUBLIC_WEB3_DEVNET_AUTH_ID)
      : String(process.env.NEXT_PUBLIC_WEB3_AUTH_ID),
    chainConfig,
    web3AuthNetwork: chains[0].testnet ? 'sapphire_devnet' : 'sapphire_mainnet'
  })

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } })

  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: chains[0].testnet ? 'testnet' : 'mainnet',
      uxMode: 'redirect',
      whiteLabel: {
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: 'en'
      }
    }
  })
  web3AuthInstance.configureAdapter(openloginAdapterInstance)

  return [
    new Web3AuthConnector({
      chains: chains,
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'google'
        }
      }
    }),
    new Web3AuthConnector({
      chains: chains,
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'facebook'
        }
      }
    }),
    new Web3AuthConnector({
      chains: chains,
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'apple'
        }
      }
    })
  ]
}
