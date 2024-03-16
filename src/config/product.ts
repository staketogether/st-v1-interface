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
      testnet: '0x3BdFaA0b55B4F6F3F9cFC6bbB1F582a1c6A0FD69'
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
      mainnet: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest',
      testnet: 'https://api.studio.thegraph.com/proxy/51080/st-subgraph-goerli/v0.2.8'
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
    networkAvailable: 'ethereum',
    networks: [
      { network: 'ethereum', enabled: true },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 11.1,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'ethereumDescription',
    enabled: true,
    urlRedirect: '/currency/ethereum/product/ethereum-restaking',
    stakeTogetherPool: {
      mainnet: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB',
      testnet: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB'
    },
    contracts: {
      mainnet: {
        Airdrop: '0xccb5F9aEc4A83f6d0DBf64AE77B6eD70b9E9Cf0b',
        Withdrawals: '0x21A487688211e1baf7C55637ac8506134aB29901',
        Router: '0x3DE749c1B1715Ec48C14C2425341f397daCB50D9',
        StakeTogether: '0xB398ccB5d98B9Ac98eDDF6268f7950A773D8e419',
        StakeTogetherWrapper: '0xE0F10DC1092aa7E5cB692a9f58f678146D6b1291'
      },
      testnet: {
        Airdrop: '0xccb5F9aEc4A83f6d0DBf64AE77B6eD70b9E9Cf0b',
        Withdrawals: '0x21A487688211e1baf7C55637ac8506134aB29901',
        Router: '0x3DE749c1B1715Ec48C14C2425341f397daCB50D9',
        StakeTogether: '0xB398ccB5d98B9Ac98eDDF6268f7950A773D8e419',
        StakeTogetherWrapper: '0xE0F10DC1092aa7E5cB692a9f58f678146D6b1291'
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
