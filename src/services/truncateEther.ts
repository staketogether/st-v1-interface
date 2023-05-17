import { BigNumber, ethers } from 'ethers'

export function truncateEther(wei: string, maxDecimals = 4): string {
  if (!wei) {
    return ''
  }

  const updatedWei = BigNumber.from(wei).add(1).toString()
  const formatEther = ethers.utils.formatEther(updatedWei)
  const [whole, decimal] = formatEther.split('.')
  const truncatedDecimal = decimal ? decimal.slice(0, maxDecimals) : ''
  const noTrailingZeros = truncatedDecimal.replace(/0+$/, '')
  const formattedValue = noTrailingZeros ? `${whole}.${noTrailingZeros}` : whole
  return formattedValue
}
