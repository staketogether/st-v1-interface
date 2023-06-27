import { ethers } from 'ethers'

function sliceString(value: string, decimals: number) {
  const [whole, decimal] = value.split('.')
  const truncatedDecimal = decimal ? decimal.slice(0, decimals) : ''
  const noTrailingZeros = truncatedDecimal.replace(/0+$/, '')
  const formattedValue = noTrailingZeros ? `${whole}.${noTrailingZeros}` : whole
  return formattedValue
}

export function truncateWei(wei: bigint, maxDecimals = 4): string {
  if (!wei) {
    return ''
  }
  const formatWei = ethers.formatEther(wei)
  return sliceString(formatWei, maxDecimals)
}

export function truncateDecimal(value: string, maxDecimals = 4): string {
  if (!value) {
    return ''
  }
  return sliceString(value, maxDecimals)
}

export function truncateText(text: string, chars = 16): string {
  if (!text) {
    return ''
  }

  return `${text.slice(0, chars)}${text.length > chars ? '...' : ''}`
}

export function truncateAddress(address: string): string {
  const charsToShow = 6
  if (!address) {
    return ''
  }

  if (address.length <= charsToShow * 2 + 2) {
    return address
  }

  const start = address.slice(0, charsToShow)
  const end = address.slice(-charsToShow)
  return `${start}...${end}`
}
