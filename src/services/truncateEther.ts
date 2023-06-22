import { BigNumber, ethers } from 'ethers'

function formatDecimalsValue(value: string, decimals: number) {
  const [whole, decimal] = value.split('.')
  const truncatedDecimal = decimal ? decimal.slice(0, decimals) : ''
  const noTrailingZeros = truncatedDecimal.replace(/0+$/, '')
  const formattedValue = noTrailingZeros ? `${whole}.${noTrailingZeros}` : whole
  return formattedValue
}

export function truncateEther(wei: string, maxDecimals = 4): string {
  if (!wei) {
    return ''
  }

  const updatedWei = BigNumber.from(wei).toString()
  const formatEther = ethers.utils.formatEther(updatedWei)
  return formatDecimalsValue(formatEther, maxDecimals)
}

export function truncateEthDecimal(eth: string, maxDecimals = 4): string {
  if (!eth) {
    return ''
  }
  return formatDecimalsValue(eth, maxDecimals)
}
