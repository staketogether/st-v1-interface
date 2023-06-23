import { BigNumber, ethers } from 'ethers'

function sliceString(value: string, decimals: number) {
  const [whole, decimal] = value.split('.')
  const truncatedDecimal = decimal ? decimal.slice(0, decimals) : ''
  const noTrailingZeros = truncatedDecimal.replace(/0+$/, '')
  const formattedValue = noTrailingZeros ? `${whole}.${noTrailingZeros}` : whole
  return formattedValue
}

export function truncateWei(wei: string, maxDecimals = 4): string {
  if (!wei) {
    return ''
  }
  const updatedWei = BigNumber.from(wei).toString()
  const formatWei = ethers.utils.formatEther(updatedWei)
  return sliceString(formatWei, maxDecimals)
}

export function truncateDecimal(value: string, maxDecimals = 4): string {
  if (!value) {
    return ''
  }
  return sliceString(value, maxDecimals)
}
