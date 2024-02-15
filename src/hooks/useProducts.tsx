import { Airdrop, StakingProduct } from '@/types/Product'
import { useRouter } from 'next/router'

export type Network = 'ethereum' | 'optimism' | 'arbitrum' | 'polygon' | 'solana'

export type NetworkWrap = {
  network: Network
  enabled: boolean
}

export type Products = {
  id: number
  name: string
  symbol: string
  icon: StakingProduct
  networks: NetworkWrap[]
  apy: number
  airdrops: Airdrop[]
  enabled: boolean
  urlRedirect: string
}

export default function useProducts(productName) {
  const { query } = useRouter()
  const { currency, network } = query

  const productsList: Products[] = [
    {
      id: 1,
      name: 'Ethereum Staking',
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
      enabled: true,
      urlRedirect: `/${network}/${currency}`
    },
    {
      id: 2,
      name: 'Ethereum ReStaking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 3,
      name: 'Celestia Staking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 4,
      name: 'Polygon Staking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 5,
      name: 'Solana Staking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 6,
      name: 'Cosmos Staking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 7,
      name: 'Near Staking',
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
      enabled: false,
      urlRedirect: '/'
    },
    {
      id: 8,
      name: 'Polkadot Staking',
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
      enabled: false,
      urlRedirect: '/'
    }
  ]

  return { productsList }
}
