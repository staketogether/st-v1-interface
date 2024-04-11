import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from '@web3auth/base'
import * as ChainConfig from 'viem/chains'
import { WalletServicesPlugin } from '@web3auth/wallet-services-plugin'
import { makeVar } from '@apollo/client'

const handleRpcPerChain = (chainId: number) => {
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string,
    10: process.env.NEXT_PUBLIC_RPC_OPTIMISM_URL as string,
    17000: process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string,
    11155420: process.env.NEXT_PUBLIC_RPC_OPTIMISM_SEPOLIA_URL as string
  }

  return alchemyKey[chainId] || ''
}

export const web3AuthInstanceVar = makeVar<Web3AuthNoModal | undefined>(undefined)

export default function Web3AuthConnectorInstances(chains: ChainConfig.Chain[]) {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chains[0].id.toString(16),
    rpcTarget: handleRpcPerChain(chains[0].id),
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
    web3AuthNetwork: chains[0].testnet ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    enableLogging: true,
    uiConfig: {
      mode: 'dark',
      useLogoLoader: true,
      logoLight:
        'https://raw.githubusercontent.com/staketogether/st-v1-interface/cf6b14fe8e7e7264942b6af82945a479e4a39c12/public/assets/st-symbol.svg',
      logoDark:
        'https://raw.githubusercontent.com/staketogether/st-v1-interface/cf6b14fe8e7e7264942b6af82945a479e4a39c12/public/assets/st-symbol.svg',
      defaultLanguage: 'pt',
      theme: {
        primary: '#768729'
      }
    }
  })

  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      uxMode: UX_MODE.REDIRECT
    }
  })
  web3AuthInstance.configureAdapter(openloginAdapterInstance)

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true
      }
    }
  })
  web3AuthInstance.addPlugin(walletServicesPlugin)
  web3AuthInstanceVar(web3AuthInstance)

  const googleConnector = Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'google'
    }
  })

  const facebookConnector = Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'facebook'
    }
  })

  const appleConnector = Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'apple'
    }
  })

  return { connectors: [googleConnector, facebookConnector, appleConnector], web3AuthInstance }
}
