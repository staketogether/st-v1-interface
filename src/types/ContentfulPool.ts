export type ContentfulImage = {
  url: string
  fileName: string
}

export type Sys = {
  id: string
  publishedAt: string
}

export type ContentFulCategory = {
  name: string
  sys: Sys
}

export type ContentfulPool = {
  wallet: `0x${string}`
  name: string
  logo: ContentfulImage
  category: {
    name: string
    sys?: Sys
  }
  cover: ContentfulImage
  video?: string
  approvalModalViewed: boolean
  status: string
  image: ContentfulImage
  description?: string
  site?: string
  twitter?: string
  instagram?: string
  youtube?: string
  discord?: string
  aboutProject?: string
  email?: string
  discordName?: string
  gotas?: string
  lens?: string
  facebook?: string
  linkedin?: string
  whatsapp?: string
  telegram?: string
  contract?: string
  sys: Sys
}

export type ContentfulWithLocale = ContentfulPool & {
  locale?: string
}
