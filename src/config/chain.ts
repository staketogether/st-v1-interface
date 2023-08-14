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
      Airdrop: '0xe5C16aB0d8b285bC59d349C94e759bd9f15c89B0',
      Withdrawals: '0x28d10155d3476742358841531F8b88c1BC2AB610',
      Router: '0x3A27d46AF55c9441865B5C500E5819b1a1900A79',
      StakeTogether: '0xb5E5BE5Bd9D41559a00de34aDF2aBAE11FC3143D'
    },
    subgraphs: {
      // StakeTogether: 'https://api.studio.thegraph.com/query/17823/stake-together-v2-goerli/version/latest',
      StakeTogether: 'https://api.studio.thegraph.com/proxy/17823/stake-together-v2-goerli/v1.0.25',
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
