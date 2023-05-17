export default function truncateAddress(address: string): string {
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
