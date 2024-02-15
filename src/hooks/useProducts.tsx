import { Product } from '@/types/Product'
import { useRouter } from 'next/router'

export default function useProducts() {
  const { query } = useRouter()
  const { currency, network } = query
  const productsList: Product[] = [
    {
      id: 1,
      name: 'ethereum',
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
      contractAddress: '0x1234567890',
      description: 'EthereumDescription',
      enabled: true,
      urlRedirect: `/${network}/${currency}`
    },
    {
      id: 2,
      name: 'restaking',
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
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 3,
      name: 'celestia',
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
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 4,
      name: 'polygon',
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
      description: 'EthereumDescription',
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 5,
      name: 'solana',
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

  return { productsList }
}
