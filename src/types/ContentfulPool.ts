export type ContentfulLogo = {
  url: string
  fileName: string
}

export type ContentfulPool = {
  wallet: `0x${string}`
  name: string
  logo: ContentfulLogo
  video?: string
  description?: string
  site?: string
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  contract?: string
  discord?: string
  category: {
    name: string
  }
}
