import type { RcFile } from 'antd/es/upload/interface'
import { ChainConfig, chainConfigs } from '@/config/chain'
import humanFormat from 'human-format'
import { AssetNetwork } from '@/types/Asset'

export function formatNumberByLocale(num: string, lang?: string): string {
  if (Number(num) < 1) {
    return num
  }
  const parsedNum = parseFloat(num)

  if (isNaN(parsedNum)) {
    return num
  }

  switch (lang) {
    case 'pt':
      return new Intl.NumberFormat('pt-BR').format(parsedNum)
    case 'es':
      return new Intl.NumberFormat('es-ES').format(parsedNum)
    case 'en':
      return new Intl.NumberFormat('en-US').format(parsedNum)
    default:
      return num
  }
}

export const getBase64 = (file: RcFile | File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = e => {
      if (e.target) {
        const result = e.target.result as string
        resolve(result)
      } else {
        resolve('')
      }
    }

    reader.onerror = () => {
      resolve('')
    }

    reader.readAsDataURL(file)
  })
}

export function getVideoIdFromUrl(url?: string): string | null {
  if (!url) return ''
  const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v=([A-Za-z0-9_-]+)/
  const match = url?.match(youtubeUrlPattern)

  if (match?.[4]) {
    return match[4]
  } else {
    return null
  }
}

export type AllowedNetworks =
  | 'ethereum'
  // | 'bitcoin-mainnet '
  | 'optimism-sepolia'
  | 'optimistic'
  | 'chiliz'
  | 'polygon'
  | 'arbitrum'
  | 'zksync'
  | 'sepolia'
  | 'arbitrumSepolia'
  | 'polygonMumbai'

export const chainByMobulaName = (mobulaName: 'ethereum' | 'optimistic' | 'chiliz' | 'polygon' | 'arbitrum' | 'zksync'): ChainConfig => {
  const chainMobulaName = {
    'bitcoin-mainnet': 500,
    ethereum: 1,
    optimistic: 10,
    chiliz: 88888,
    polygon: 137,
    arbitrum: 42161,
    zksync: 324
  }

  const chain = chainConfigs.find(config => config.chainId === chainMobulaName[mobulaName])

  if (!chain) {
    throw new Error('Chain not found')
  }

  return chain
}

export function handleEvmChainIdByNetwork(
  network: AllowedNetworks
): 1 | 324 | 10 | 42161 | 137 | 88888 | 11155111 | 11155420 | 421614 | 80001 | 88882 | undefined {
  const chainIdByNetwork = {
    // 'bitcoin-mainnet ': 500,
    ethereum: 1,
    'optimism-sepolia': 11155420,
    optimistic: 10,
    chiliz: 88888,
    'chiliz-spicy': 88882,
    polygon: 137,
    arbitrum: 42161,
    zksync: 324,
    sepolia: 11155111,
    arbitrumSepolia: 421614,
    polygonMumbai: 80001
  }

  return (chainIdByNetwork[network] as 1 | 324 | 10 | 42161 | 137 | 88888 | 11155111 | 11155420 | 421614 | 80001 | 88882) ?? undefined
}

export function toHumanFormat(value: number): string {
  if (value === 0) {
    return '0'
  }

  return humanFormat(Number(value), {
    separator: ''
  }).replace('G', 'B') // Necessary since the prefix for short scale is B, not G: https://en.wikipedia.org/wiki/Metric_prefix
}

export function handleNetworksList(networks: AssetNetwork[]) {
  return networks.reduce<AssetNetwork[]>((acc, current) => {
    if (!acc.some(item => item.chainId === current.chainId)) {
      acc.push(current)
    }
    return acc
  }, [])
}
