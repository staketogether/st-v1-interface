import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import * as ChainConfig from 'viem/chains'
import stSymbol from '@assets/st-symbol.svg'

const iconUrl = stSymbol

export default function Web3AuthConnectorInstance(chains: ChainConfig.Chain[]) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0],
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string
  }

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } })

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: chains[0].testnet
      ? String(process.env.NEXT_PUBLIC_WEB3_DEVNET_AUTH_ID)
      : String(process.env.NEXT_PUBLIC_WEB3_AUTH_ID),
    chainConfig,
    privateKeyProvider,
    web3AuthNetwork: chains[0].testnet ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
  })

  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: chains[0].testnet ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
      uxMode: UX_MODE.REDIRECT,
      whiteLabel: {
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: 'en'
      }
    }
  })
  web3AuthInstance.configureAdapter(openloginAdapterInstance)

  return [
    Web3AuthConnector({
      web3AuthInstance,
      loginParams: {
        loginProvider: 'google'
      }
    }),
    Web3AuthConnector({
      web3AuthInstance,
      loginParams: {
        loginProvider: 'apple'
      }
    }),
    Web3AuthConnector({
      web3AuthInstance,
      loginParams: {
        loginProvider: 'facebook'
      }
    })
  ]
}
