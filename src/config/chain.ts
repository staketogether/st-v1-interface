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
      STOracle: '0xAf5B0acfd0c71A442869412F76084a1b7ccF85d3',
      StakeTogether: '0x1D61e1e9a2C3DF39cfe668318ca0701db0CEDc60'
    },
    subgraphs: {
      StakeTogether: 'https://api.studio.thegraph.com/query/17823/stake-together-goerli/version/latest',
      ENS: ''
    }
  },
  {
    chainId: 31337,
    name: 'localhost',
    provider: new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`),
    contracts: {
      STOracle: '0xb36c1ae8e5076b55569Dd399Ea79D96E60E4E322',
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
