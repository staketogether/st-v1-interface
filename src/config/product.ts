import { Contracts, Product, StakingProduct } from '@/types/Product'

export const productList: Product[] = [
  {
    id: 1,
    name: 'ethereum-stake',
    title: 'Staking de Ethereum',
    icon: 'ethereum',
    symbol: 'stpETH',
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
    urlRedirect: '/ethereum/currency/product/ethereum-stake',
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
    }
  },
  {
    id: 2,
    name: 'ethereum-restaking',
    title: 'Restaking',
    symbol: 'stpRETH',
    icon: 'EthereumRestaking',
    networks: [
      { network: 'ethereum', enabled: false },
      { network: 'optimism', enabled: false },
      { network: 'arbitrum', enabled: false },
      { network: 'polygon', enabled: false },
      { network: 'solana', enabled: false }
    ],
    apy: 11.1,
    scan: 'https://etherscan.io/',
    contractAddress: '0x1234567890',
    description: 'ethereumDescription',
    enabled: false,
    urlRedirect: '/ethereum/currency/product/ethereum-restaking',
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
    }
  },
  {
    id: 3,
    name: 'celestia',
    title: 'Celestia',
    symbol: 'stpTIA',
    icon: 'celestia',
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
    }
  },
  {
    id: 4,
    name: 'polygon',
    title: 'Polygon',
    symbol: 'stpPOL',
    icon: 'polygon',
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
    }
  },
  {
    id: 5,
    name: 'solana',
    title: 'Solana',
    symbol: 'stpSOL',
    icon: 'solana',
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
    }
  },
  {
    id: 6,
    name: 'cosmos',
    title: 'Cosmos',
    symbol: 'stpATOM',
    icon: 'cosmos',
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
    }
  },
  {
    id: 7,
    name: 'near',
    title: 'Near',
    symbol: 'stpNear',
    icon: 'near',
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
    }
  },
  {
    id: 8,
    name: 'polkadot',
    title: 'Polkadot',
    symbol: 'stpKSM',
    icon: 'polkadot',
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
