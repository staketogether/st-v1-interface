import { Product, StakingProduct } from '@/types/Product'
import { useRouter } from 'next/router'

export default function useProducts() {
  const { query } = useRouter()
  const { currency, network } = query
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
      description: 'ethereumDescription',
      enabled: true,
      urlRedirect: `/${network}/${currency}/product/ethereum`
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
      airdrops: ['stakeTogether', 'layerZero', 'eigenLayer'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'ethereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero', 'celestia'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'ethereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'ethereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
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
      airdrops: ['stakeTogether', 'layerZero'],
      scan: 'https://etherscan.io/',
      contractAddress: '0x1234567890',
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
    }
  ]

  function findProduct(productName: StakingProduct) {
    return productsList.find(product => product.name === productName) || productsList[0]
  }

  return { productsList, findProduct }
}
