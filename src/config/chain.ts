import { ethers } from 'ethers'

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.providers.JsonRpcProvider
  contracts: {
    Oracle: `0x${string}`
    Validator: `0x${string}`
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
      Oracle: '0x',
      Validator: '0x',
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
      Oracle: '0xdfBC02F7d9422a2Aea051d8dD82D6834cfa52124',
      Validator: '0x48a6D53A0b5335ccFD8970dbCe1B38b2beb59987',
      StakeTogether: '0xdFe0E9Fb22e3CAd5dd7605f592717CbAC39057CD'
    }
  },
  {
    chainId: 31337,
    name: 'localhost',
    provider: new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`),
    contracts: {
      Oracle: '0xb36c1ae8e5076b55569Dd399Ea79D96E60E4E322',
      Validator: '0x9c63686aE146B45A2368ABc9AecE4203A3559f35',
      StakeTogether: '0x27c85150D755D383A4f86d0aeD8232815674771f'
    }
  }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in global config')
  return config
}
