import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import stSymbol from '@assets/st-symbol.svg'
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from '@web3auth/base'
import * as ChainConfig from 'viem/chains'

const iconUrl = stSymbol

const handleRpcPerChain = (chainId: number) => {
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string,
    10: process.env.NEXT_PUBLIC_RPC_OPTIMISM_URL as string,
    17000: process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string,
    11155420: process.env.NEXT_PUBLIC_RPC_OPTIMISM_SEPOLIA_URL as string
  }

  return alchemyKey[chainId] || ''
}

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
    privateKeyProvider,
    web3AuthNetwork: chains[0].testnet ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
  })

  const openloginAdapterInstance = new OpenloginAdapter({
    web3AuthNetwork: chains[0].testnet ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    adapterSettings: {
      uxMode: UX_MODE.REDIRECT,
      whiteLabel: {
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: 'en'
      }
    }
  })
  web3AuthInstance.configureAdapter(openloginAdapterInstance)

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

  return [googleConnector, facebookConnector, appleConnector]
}
