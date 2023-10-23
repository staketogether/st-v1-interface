export type ProjectContentfulForm = {
  logo?: { base64: string; mimeType?: string }
  wallet?: string
  communityName?: string
  video?: string
  category?: string
  site?: string
  linkedin?: string
  youtube?: string
  twitter?: string
  instagram?: string
  facebook?: string
  discordName?: string
  discord?: string
  gotas?: string
  lens?: string
  telegram?: string
  description?: string
  projectDescription?: string
  cover?: { base64: string; mimeType?: string }
}

export type CreateCommunityForm = {
  wallet?: string
  projectName?: string
  logo?: { base64: string; mimeType?: string }
  category?: string
  aboutProject?: string
  email?: string
  site?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  discord?: string
  telegram?: string
}
