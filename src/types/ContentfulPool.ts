export type ContentfulImage = {
  url: string
  fileName: string
}

export type ContentFulCategory = {
  name: string
}

export type ContentfulPool = {
  wallet: `0x${string}`
  name: string
  logo: ContentfulImage
  category: {
    name: string
  }
  cover: ContentfulImage
  video?: string
  image: ContentfulImage
  description?: string
  site?: string
  twitter?: string
  instagram?: string
  youtube?: string
  discord?: string
  discordName?: string
  gotas?: string
  lens?: string
  facebook?: string
  linkedin?: string
  whatsapp?: string
  telegram?: string
  contract?: string
}
