import { ethers } from 'ethers'

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.providers.JsonRpcProvider
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
    }
  },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY}`
    ),
    contracts: {
      STOracle: '0x57468B982AED37E595A44E32530dE770aFD384bB',
      STValidator: '0x77Cc510c8079A6e884e91306C9f6D7f63620cB1a',
      StakeTogether: '0x17fea3b3103444b448BE2728958CDf84BfF82248'
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
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in global config')
  return config
}
