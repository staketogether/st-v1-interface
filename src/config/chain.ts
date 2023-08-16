import { ethers } from 'ethers'

interface BlockExplorerConfig {
  baseUrl: string
}

export type ChainConfig = {
  chainId: number
  name: string
  provider: ethers.JsonRpcProvider
  blockExplorer: BlockExplorerConfig
  alchemyApiUrl: string
  subgraphs: {
    StakeTogether: string
    ENS: string
    contentful: string
  }
  contracts: {
    Airdrop: `0x${string}`
    Withdrawals: `0x${string}`
    Router: `0x${string}`
    StakeTogether: `0x${string}`
  }
}

const configs: ChainConfig[] = [
  // {
  //   chainId: 1,
  //   name: 'mainnet',
  //   provider: new ethers.providers.JsonRpcProvider(
  //     `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY}`
  //   ),
  //   contracts: {
  //     StakeTogether: '0x'
  //   },
  //   subgraphs: {
  //     StakeTogether: '',
  //     ENS: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
  //   }
  // },
  {
    chainId: 5,
    name: 'goerli',
    provider: new ethers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY}`
    ),
    blockExplorer: {
      baseUrl: 'https://goerli.etherscan.io'
    },
    alchemyApiUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY}`,
    contracts: {
      // TODO: Update these addresses to the correct ones
      Airdrop: '0x5A51FE21bf2807796e8dC9978753b9689f3Be597',
      Withdrawals: '0x4F0361f2fB43d604465A1dE40a0b1B1F060B21f8',
      Router: '0x43CcDd839Ab30A9b6645D50b1Aebb2f735984158',
      StakeTogether: '0xa6Ab45C2B461fBA6B501b074BD8f5F5b0976c617'
    },
    subgraphs: {
      // StakeTogether: 'https://api.studio.thegraph.com/query/17823/stake-together-v2-goerli/version/latest',
      StakeTogether: 'https://api.studio.thegraph.com/proxy/17823/stake-together-v2-goerli/v1.0.31',
      ENS: '',
      contentful: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/master`
    }
  }
  // {
  //   chainId: 31337,
  //   name: 'localhost',
  //   provider: new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`),
  //   contracts: {
  //     StakeTogether: '0x27c85150D755D383A4f86d0aeD8232815674771f'
  //   },
  //   subgraphs: {
  //     StakeTogether: '',
  //     ENS: ''
  //   }
  // }
]

export default function chainConfig(): ChainConfig {
  const config = configs.find(c => c.chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID))
  if (!config) throw new Error('chainId not found in global config')
  return config
}
