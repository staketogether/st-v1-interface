import type { RcFile } from 'antd/es/upload/interface'
import { ChainConfig, chainConfigs } from '@/config/chain'
import humanFormat from 'human-format'

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

export type AllowedNetworks = 'ethereum' | 'holesky' | 'optimism-sepolia' | 'optimistic' | 'chiliz' | 'polygon' | 'arbitrum' | 'era'

export const chainByMobulaName = (mobulaName: 'ethereum' | 'optimistic' | 'chiliz' | 'polygon' | 'arbitrum' | 'zksync'): ChainConfig => {
  const chainMobulaName = {
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

export const handleChainIdByNetwork = (network: AllowedNetworks) => {
  const chainIdByNetwork = {
    ethereum: 1,
    holesky: 17000,
    'optimism-sepolia': 11155420,
    optimistic: 10,
    chiliz: 88888,
    'chiliz-spicy': 88882,
    polygon: 137,
    arbitrum: 42161,
    era: 324
  }

  return chainIdByNetwork[network] || 0
}

export function toHumanFormat(value: number): string {
  if (value === 0) {
    return '0'
  }

  return humanFormat(Number(value), {
    separator: ''
  }).replace('G', 'B') // Necessary since the prefix for short scale is B, not G: https://en.wikipedia.org/wiki/Metric_prefix
}
