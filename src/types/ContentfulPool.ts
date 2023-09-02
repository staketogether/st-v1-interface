export type ContentfulImage = {
  url: string
  fileName: string
}

export type ContentfulPool = {
  wallet: `0x${string}`
  name: string
  logo: ContentfulImage
  cover: ContentfulImage
  video?: string
  description?: string
  site?: string
  facebook?: string
  youtube?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  contract?: string
  telegram?: string
  whatsapp?: string
  discord?: string
  category: {
    name: string
  }
}
