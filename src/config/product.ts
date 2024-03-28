import { Contracts, Product, StakingProduct } from '@/types/Product'

export const productList: Product[] = [
  {
    id: 1,
    name: 'ethereum-stake',
    title: 'Staking de Ethereum',
    symbol: 'stpETH',
    networkAvailable: 'holesky',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: true },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 5.1,
    scan: 'https://etherscan.io/',
    contractAddress: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
    description: 'ethereumDescription',
    enabled: true,
    urlRedirect: '/currency/holesky/product/ethereum-stake',
    stakeTogetherPool: {
      mainnet: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
      testnet: '0xF4e8Dd9C44438ee697B61a426a592010e9a86a90'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
        Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
        Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
        StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
        StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
      },
      testnet: {
        Airdrop: '0x5B625457fE23e87957Eb9eE610D590BD848f4775',
        Withdrawals: '0xC43344d37f6Dd117676a33866fB086484834d4dF',
        Router: '0xfc65Cb4C3e00f760A42362b6a946818ebEFE7C31',
        StakeTogether: '0xF4e8Dd9C44438ee697B61a426a592010e9a86a90',
        StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
      }
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest',
      testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-holesky/version/latest'
    },
    getMobulaAssetData: {
      asset: 'Ethereum',
      blockchain: 'ethereum',
      symbol: 'eth'
    }
  },
  {
    id: 2,
    name: 'ethereum-restaking',
    title: 'Restaking',
    symbol: 'strETH',
    networkAvailable: 'optimism-sepolia',
    eigenPointsAvailable: true,
    networks: [
      { network: 'ethereum', enabled: true },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 11.1,
    scan: 'https://optimism-sepolia.blockscout.com',
    contractAddress: '0x1234567890',
    description: 'ethereumDescription',
    enabled: true,
    urlRedirect: '/currency/optimism-sepolia/product/ethereum-restaking',
    stakeTogetherPool: {
      mainnet: '0x15Df22857d8208d4add356dB92E48B347488969E',
      testnet: '0x15Df22857d8208d4add356dB92E48B347488969E'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x9A967118f216eCE6B5853915691b96d28df19b4A',
        Withdrawals: '0xB01fD1CDd2fDfa3cC4955635776733A8abaad8F8',
        Router: '0x3B5f4719d701D905ab206C2255476bC37AfdcfdD',
        StakeTogether: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
        StakeTogetherWrapper: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508'
      },
      testnet: {
        Airdrop: '0x6D38e32dB2A5e88b3D6DEf74b981c4CAF50B0533',
        Withdrawals: '0xbBeAE3626810c9A001DdddF825A13793B94433Db',
        Router: '0xd5aC0835a7E537b4D263DbfDC8c6176fE04b878a',
        StakeTogether: '0x15Df22857d8208d4add356dB92E48B347488969E',
        StakeTogetherWrapper: '0xE9550754410Fa6f4B5EFC3379793c8bf2b69C59E'
      }
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together-optimism/v1.0.0',
      testnet: 'https://api.studio.thegraph.com/query/8477/stake-together-op-sepolia/version/latest'
    },
    getMobulaAssetData: {
      asset: 'Ethereum',
      blockchain: 'ethereum',
      symbol: 'eth'
    }
  },
  {
    id: 3,
    name: 'chiliz',
    title: 'Chiliz',
    symbol: 'stpCHZ',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 14.5,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'ethereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
        Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
        Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
        StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
        StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
      },
      testnet: {
        Airdrop: '0xE96c5D1BC7B84Ce9d50266c60B4f3f168f276e2a',
        Withdrawals: '0x6aCDAA664D66B781e83a4374Bb093b0a8750E081',
        Router: '0xB4b7B496E556252666264cd2CC67d602d929b717',
        StakeTogether: '0x726dbeB2A4eC157E82D53e4c6A747e1A9bDF39e0',
        StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },
    getMobulaAssetData: {
      asset: '0x3506424f91fd33084466f402d5d97f05f8e3b4af',
      blockchain: '',
      symbol: ''
    }
  },
  {
    id: 4,
    name: 'polygon',
    title: 'Polygon',
    symbol: 'stpPOL',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 5.2,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'ethereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
        Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
        Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
        StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
        StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
      },
      testnet: {
        Airdrop: '0xE96c5D1BC7B84Ce9d50266c60B4f3f168f276e2a',
        Withdrawals: '0x6aCDAA664D66B781e83a4374Bb093b0a8750E081',
        Router: '0xB4b7B496E556252666264cd2CC67d602d929b717',
        StakeTogether: '0x726dbeB2A4eC157E82D53e4c6A747e1A9bDF39e0',
        StakeTogetherWrapper: '0xaf423Cd5b9124d2032fD4Ab80BAd1D3735172B5c'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },
    getMobulaAssetData: {
      asset: 'Polygon',
      blockchain: '',
      symbol: ''
    }
  },
  {
    id: 5,
    name: 'solana',
    title: 'Solana',
    symbol: 'stpSOL',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 7.6,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'EthereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      },
      testnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },
    getMobulaAssetData: {
      asset: 'Solana',
      blockchain: 'ethereum',
      symbol: 'eth'
    }
  },
  {
    id: 6,
    name: 'cosmos',
    title: 'Cosmos',
    symbol: 'stpATOM',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 13.7,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'EthereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      },
      testnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },
    getMobulaAssetData: {
      asset: '0x0eb3a705fc54725037cc9e008bdede697f62f335', //BNB CHAIN
      blockchain: '',
      symbol: ''
    }
  },
  {
    id: 7,
    name: 'near',
    title: 'Near',
    symbol: 'stpNear',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 8.8,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'EthereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      },
      testnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },

    getMobulaAssetData: {
      asset: '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4',
      blockchain: '',
      symbol: ''
    }
  },
  {
    id: 8,
    name: 'polkadot',
    title: 'Polkadot',
    symbol: 'stpKSM',
    networkAvailable: 'ethereum',
    eigenPointsAvailable: false,
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 9,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'EthereumDescription',
    enabled: false,
    urlRedirect: '/',
    stakeTogetherPool: {
      mainnet: '0x',
      testnet: '0x'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      },
      testnet: {
        Airdrop: '0x',
        Withdrawals: '0x',
        Router: '0x',
        StakeTogether: '0x',
        StakeTogetherWrapper: '0x'
      }
    },
    subgraph: {
      mainnet: '',
      testnet: ''
    },
    getMobulaAssetData: {
      asset: 'polkadot',
      blockchain: '',
      symbol: ''
    }
  }
]

export function getProductByName({ productName }: { productName: StakingProduct }): Product {
  return productList.find(product => product.name === productName) || productList[0]
}

export function getContractsByProductName({
  productName,
  isTestnet
}: {
  productName: StakingProduct
  isTestnet: boolean
}): Contracts {
  return getProductByName({ productName }).contracts[isTestnet ? 'testnet' : 'mainnet']
}

export function getSubgraphByProductName({
  productName,
  isTestnet
}: {
  productName: StakingProduct
  isTestnet: boolean
}): string {
  return getProductByName({ productName }).subgraph[isTestnet ? 'testnet' : 'mainnet']
}
