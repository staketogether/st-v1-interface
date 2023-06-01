export default function truncateText(text: string, chars = 16): string {
  if (!text) {
    return ''
  }

  return `${text.slice(0, chars)}${text.length > chars ? '...' : ''}`
}
