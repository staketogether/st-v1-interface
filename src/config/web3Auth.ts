// Web3Auth Libraries
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
// eslint-disable-next-line import/named
import { Chain } from 'wagmi'

const name = 'Stake Together'
const iconUrl = 'https://web3auth.io/docs/contents/logo-ethereum.png'

export default function Web3AuthConnectorInstance(chain: Chain) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chain.id.toString(16),
    rpcTarget: chain.rpcUrls.default.http[0],
    displayName: chain.name,
    tickerName: chain.nativeCurrency?.name,
    ticker: chain.nativeCurrency?.symbol,
    blockExplorer: chain.blockExplorers?.default.url[0] as string
  }

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: String(process.env.NEXT_PUBLIC_WEB3_AUTH_ID),
    chainConfig,
    web3AuthNetwork: 'cyan'
  })

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } })

  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: 'cyan',
      uxMode: 'redirect',
      whiteLabel: {
        name,
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: 'en',
        dark: true
      }
    }
  })
  web3AuthInstance.configureAdapter(openloginAdapterInstance)

  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: 'bottom-left'
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: false, colors: { primary: '#283B8A' } },
        logoDark: iconUrl,
        logoLight: iconUrl
      },
      useWalletConnect: true,
      enableLogging: true
    }
  })
  web3AuthInstance.addPlugin(torusPlugin)

  return [
    new Web3AuthConnector({
      chains: [chain],
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'facebook'
        }
      }
    }),
    new Web3AuthConnector({
      chains: [chain],
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'google'
        }
      }
    }),
    new Web3AuthConnector({
      chains: [chain],
      options: {
        web3AuthInstance,
        loginParams: {
          loginProvider: 'apple'
        }
      }
    })
  ]
}
