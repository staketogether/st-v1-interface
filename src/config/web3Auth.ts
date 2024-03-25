import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, UX_MODE } from "@web3auth/base";
import { Chain } from "wagmi/chains";
import stSymbol from '@assets/st-symbol.svg'
import { CreateConnectorFn } from 'wagmi'

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

export default function Web3AuthConnectorInstances({chains}:{chains: [Chain, ...Chain[]]}): CreateConnectorFn[] {
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x' + chains[0].id.toString(16),
    rpcTarget: handleRpcPerChain(chains[0].id),
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0] as string
  }

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: chains[0].testnet
      ? String(process.env.NEXT_PUBLIC_WEB3_DEVNET_AUTH_ID)
      : String(process.env.NEXT_PUBLIC_WEB3_AUTH_ID),
    privateKeyProvider,
    web3AuthNetwork: chains[0].testnet ? 'sapphire_devnet' : 'sapphire_mainnet'
  })

  const openloginAdapterInstance = new OpenloginAdapter({
    web3AuthNetwork: chains[0].testnet ? 'testnet' : 'mainnet',
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

  const googleConnector: CreateConnectorFn = new Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'google'
    }
  })

  const facebookConnector: CreateConnectorFn = new Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'facebook'
    }
  })

  const appleConnector: CreateConnectorFn = new Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: 'apple'
    }
  })

  return [googleConnector, facebookConnector, appleConnector]
}
