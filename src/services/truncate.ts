import { ethers } from 'ethers'
import { DateTime } from 'luxon'

function sliceString(value: string, decimals: number) {
  const [whole, decimal] = value.split('.')
  const truncatedDecimal = decimal ? decimal.slice(0, decimals) : ''
  const noTrailingZeros = truncatedDecimal.replace(/0+$/, '')
  const formattedValue = noTrailingZeros ? `${whole}.${noTrailingZeros}` : whole
  return formattedValue
}

export function truncateWei(wei: bigint, maxDecimals = 4, smallValue = false): string {
  if (!wei || wei.toString() === '0') {
    return '0'
  }

  const formatWei = ethers.formatEther(wei)
  const formattedValue = sliceString(formatWei, maxDecimals)

  if (parseFloat(formattedValue) < 0.00001 && !smallValue) {
    return '>0.00001'
  }

  return formattedValue
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

export function truncateAddress(address: string, charsToShow = 6): string {
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
  const words = text.split(' ')

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    words[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }

  return words.join(' ')
}

export function truncateTimestamp(timestamp: number, locale: string) {
  const formatTimestamp = timestamp
    ? DateTime.fromSeconds(Number(timestamp))
        .toRelative({
          locale: locale,
          style: 'short'
        })
        ?.replace('.', '') || ''
    : ''

  return formatTimestamp
}
