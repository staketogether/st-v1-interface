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
      testnet: '0x6C1715B7F989A7dBc2635114e5f8B78F39eA6F48'
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
        StakeTogether: '0x6C1715B7F989A7dBc2635114e5f8B78F39eA6F48',
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
      mainnet: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB',
      testnet: '0x47e333845Fce1E2804e0653FD6aa43E3016D8761'
    },
    contracts: {
      mainnet: {
        Airdrop: '0xBF43F150b6c93C9d8bc2AAE1d515dAfbceEA5077',
        Withdrawals: '0xcf9ee3755bD96C7194211d00e81404014e29ab64',
        Router: '0x57Dbd848ECDC9E4A6cF1a45E993208b1044F9Fa2',
        StakeTogether: '0x47e333845Fce1E2804e0653FD6aa43E3016D8761',
        StakeTogetherWrapper: '0xEC4e033E546ad00E52d535d9105a836eFE45b21a'
      },
      testnet: {
        Airdrop: '0xBF43F150b6c93C9d8bc2AAE1d515dAfbceEA5077',
        Withdrawals: '0xcf9ee3755bD96C7194211d00e81404014e29ab64',
        Router: '0x57Dbd848ECDC9E4A6cF1a45E993208b1044F9Fa2',
        StakeTogether: '0x47e333845Fce1E2804e0653FD6aa43E3016D8761',
        StakeTogetherWrapper: '0xEC4e033E546ad00E52d535d9105a836eFE45b21a'
      }
    },
    subgraph: {
      mainnet: 'https://api.studio.thegraph.com/query/51080/st-eigen-layer/v1.0.1',
      testnet: 'https://api.studio.thegraph.com/query/51080/st-eigen-layer/v1.0.1'
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
