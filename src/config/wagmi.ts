import { createConfig, http } from 'wagmi'
import { mainnet, optimism, holesky, optimismSepolia } from 'wagmi/chains'
import { injected, walletConnect, safe } from 'wagmi/connectors'
import { defineChain, Chain } from 'viem'
import Web3AuthConnectorInstances from '@/config/web3Auth'

const handleRpcPerChain = (chainId: number) => {
  const alchemyKey: { [key: number]: string } = {
    1: process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string,
    10: process.env.NEXT_PUBLIC_RPC_OPTIMISM_URL as string,
    17000: process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string,
    11155420: process.env.NEXT_PUBLIC_RPC_OPTIMISM_SEPOLIA_URL as string
  }

  return alchemyKey[chainId] || ''
}

const mainnetChain = defineChain({
  ...mainnet,
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_MAINNET_URL as string] },
  }
})

const optimismChain = defineChain({
  ...optimism,
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_OPTIMISM_URL as string] },
  }
})

const holeskyChain = defineChain({
  ...holesky,
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_HOLESKY_URL as string] },
  }
})

const optimismSepoliaChain = defineChain({
  ...optimismSepolia,
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_OPTIMISM_SEPOLIA_URL as string] },
  }
})

const chains: [Chain, ...Chain[]] = process.env.NEXT_PUBLIC_ENV === 'production' ? [mainnetChain, optimismChain] : [holeskyChain, optimismSepoliaChain]

const web3Auth = () => Web3AuthConnectorInstances({ chains })

const config = createConfig({
  chains,
  connectors: [...web3Auth(), injected(), safe(), walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT as string})],
  transports: process.env.NEXT_PUBLIC_ENV === 'production' ? {
    [mainnet.id]: http(handleRpcPerChain(mainnet.id)),
    [optimism.id]: http(handleRpcPerChain(optimism.id))
  } : {
    [holesky.id]: http(handleRpcPerChain(holesky.id)),
    [optimismSepolia.id]: http(handleRpcPerChain(optimismSepolia.id))
  },
})

export { chains, config }
