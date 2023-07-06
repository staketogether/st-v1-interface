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
    return '0'
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

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function convertYouReceiveValue(amountInEther: string): string {
  if (!amountInEther) {
    return '0'
  }
  const etherAsBigInt = BigInt(Math.round(parseFloat(amountInEther) * Number(10 ** 18))) - BigInt(1)
  return truncateWei(etherAsBigInt, 7)
}
