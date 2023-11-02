export type CreateProjectForm = {
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

export type ProjectContentfulForm = CreateProjectForm & {
  cover?: { base64: string; mimeType?: string }
  videoPt?: string
  videoEn?: string
  youtube?: string
  facebook?: string
  discordName?: string
  telegram?: string
  descriptionPt?: string
  descriptionEn?: string
  contract?: string
}
