import { Contracts, Product, StakingProduct } from '@/types/Product'

export const productList: Product[] = [
  {
    id: 1,
    name: 'ethereum-stake',
    title: 'Staking de Ethereum',
    symbol: 'stpETH',
    networkAvailable: 'ethereum',
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
    urlRedirect: '/currency/ethereum/product/ethereum-stake',
    stakeTogetherPool: {
      mainnet: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
      testnet: '0x737c0f05693824Ce2E93A1670145c95F82F6b94F'
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
        Airdrop: '0xCB23b587969f9089fDb3a8B65ce6992015Ac7E57',
        Withdrawals: '0xa48BE7b3F398f3CfB1B76B84734869d393b7aDa1',
        Router: '0x465e172ca14B5972Fc1e09c1eDbF262BC2232B8c',
        StakeTogether: '0x737c0f05693824Ce2E93A1670145c95F82F6b94F',
        StakeTogetherWrapper: '0xfB7a3F74e661d588dBB9323696874A6D244478a6'
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
    symbol: 'stpRETH',
    networkAvailable: 'optimism-sepolia',
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
      mainnet: '0xb20138e145A6355a064f590EcaD312CaE2608d19',
      testnet: '0xb20138e145A6355a064f590EcaD312CaE2608d19'
    },
    contracts: {
      mainnet: {
        Airdrop: '0x366F7A0D34C9b1017159d205427152D1B477585d',
        Withdrawals: '0x817b1d41EE5EC2697d606f23d90c8B6534e32B29',
        Router: '0xF5eb84f412464973fda357D3bCe1489D5f31B794',
        StakeTogether: '0xb20138e145A6355a064f590EcaD312CaE2608d19',
        StakeTogetherWrapper: '0xa0F3169Dc16D9196FdA85FA299743f4493cD79Cd'
      },
      testnet: {
        Airdrop: '0x366F7A0D34C9b1017159d205427152D1B477585d',
        Withdrawals: '0x817b1d41EE5EC2697d606f23d90c8B6534e32B29',
        Router: '0xF5eb84f412464973fda357D3bCe1489D5f31B794',
        StakeTogether: '0xb20138e145A6355a064f590EcaD312CaE2608d19',
        StakeTogetherWrapper: '0xa0F3169Dc16D9196FdA85FA299743f4493cD79Cd'
      }
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/8477/stake-together-op-sepolia/version/latest',
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
    name: 'celestia',
    title: 'Celestia',
    symbol: 'stpTIA',
    networkAvailable: 'ethereum',
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
      asset: 'Celestia',
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
