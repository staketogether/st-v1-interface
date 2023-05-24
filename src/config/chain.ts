import { ethers } from 'ethers'

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.providers.JsonRpcProvider
  subgraphs: {
    StakeTogether: string
    ENS: string
  }
  contracts: {
    STOracle: `0x${string}`
    STValidator: `0x${string}`
    StakeTogether: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  {
    chainId: 1,
    name: 'mainnet',
    provider: new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY}`
    ),
    contracts: {
      STOracle: '0x',
      STValidator: '0x',
      StakeTogether: '0x'
    },
    subgraphs: {
      StakeTogether: '',
      ENS: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
    }
  },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY}`
    ),
    contracts: {
      STOracle: '0x6f0Ac11a4853aFfFe55124d490F675196FCA4d77',
      STValidator: '0xfCB3C7bc76abc884bD7f2A288b2E1542B678165F',
      StakeTogether: '0x5FA43a35AF0d89C695ba89aae742c38A35dE6592'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/17823/stake-together-goerli/version/latest',
      ENS: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
    }
  },
  {
    chainId: 31337,
    name: 'localhost',
    provider: new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`),
    contracts: {
      STOracle: '0xb36c1ae8e5076b55569Dd399Ea79D96E60E4E322',
      STValidator: '0x9c63686aE146B45A2368ABc9AecE4203A3559f35',
      StakeTogether: '0x27c85150D755D383A4f86d0aeD8232815674771f'
    },
    subgraphs: {
      StakeTogether: '',
      ENS: ''
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in global config')
  return config
}
