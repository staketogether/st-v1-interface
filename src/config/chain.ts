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
      STOracle: '0xEB75Bd8cb45145cf22092DbE256D6c7520DfC5a3',
      StakeTogether: '0xCdD86DB078eD468a6931617D0A85D06Cd34bedcA'
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
      STOracle: '0x5D553864900780be550fA2Af918ABF4F83715A8a',
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
