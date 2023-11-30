import { ethers } from 'ethers'

interface BlockExplorerConfig {
  baseUrl: string
}

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  stakeTogetherPool: `0x${string}`
  subgraphs: {
    StakeTogether: string
    ContentFul: string
  }
  contracts: {
    Airdrop: `0x${string}`
    Withdrawals: `0x${string}`
    Router: `0x${string}`
    StakeTogether: `0x${string}`
    StakeTogetherWrapper: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 1,
    name: 'mainnet',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET),
    stakeTogetherPool: '0x',
    blockExplorer: {
      baseUrl: 'https://etherscan.io'
    },
    contracts: {
      Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
      Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
      Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
      StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
      StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/51080/st-subgraph-goerli/version/latest',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`
    }
  },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI),
    stakeTogetherPool: '0xdC4d86Da67B12DFD72F41B782ac1D04394506196',
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    contracts: {
      Airdrop: '0x1011E6EDFEE18B55E4A9E81Ee927c8E8771C6FBe',
      Withdrawals: '0x8E261aaD364997f1da72e8b886b64c1a950CD081',
      Router: '0xa3128B8f902Ee7A7618264709F2308759ac0ad3e',
      StakeTogether: '0xdF18a49Dff8CF441Fda56F2007Be7Ac60ACFECf7',
      StakeTogetherWrapper: '0xB43a1a44Bb0d6012F9Ab575e4fDC37F77ffCAA27'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/51080/st-subgraph-goerli/v0.0.7-exp',
      ContentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in chainConfig')
  return config
}
