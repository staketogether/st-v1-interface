import type { RcFile } from 'antd/es/upload/interface'

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
  const match = url.match(youtubeUrlPattern)

  if (match && match[4]) {
    return match[4]
  } else {
    return null
  }
}
