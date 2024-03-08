import { Product } from '@/types/Product'

export const handleProductConfig = (network: string, currency: string) => {
  const productsList: Product[] = [
    {
      id: 1,
      name: 'ethereum',
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
      urlRedirect: `/${network}/${currency}/product/ethereum`,
      getMobulaAssetData: {
        asset: 'Ethereum',
        blockchain: 'ethereum',
        symbol: 'eth'
      }
    },
    {
      id: 2,
      name: 'restaking',
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
      urlRedirect: '/',
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
      getMobulaAssetData: {
        asset: 'polkadot',
        blockchain: '',
        symbol: ''
      }
    },
    {
      id: 9,
      name: 'bitcoin',
      title: 'bitcoin',
      symbol: 'stpCHZ',
      icon: 'bitcoin',
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
      getMobulaAssetData: {
        asset: 'Bitcoin',
        blockchain: '',
        symbol: ''
      }
    },
    {
      id: 10,
      name: 'chiliz',
      title: 'Chiliz Staking',
      symbol: 'stpCHZ',
      icon: 'chiliz',
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
      getMobulaAssetData: {
        asset: '0x3506424f91fd33084466f402d5d97f05f8e3b4af',
        blockchain: '',
        symbol: ''
      }
    }
  ]
  return productsList
}
