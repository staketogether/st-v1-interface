export type ContentfulImage = {
  url: string
  fileName: string
}

export type ContentfulPool = {
  wallet: `0x${string}`
  logo: ContentfulImage
  name: string
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
  discord_name?: string
  discord?: string
  gotas?: string
  lens?: string
  facebook?: string
  linkedin?: string
  whatsapp?: string
  telegram?: string
  contract?: string
}
