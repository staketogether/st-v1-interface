export type RegisterInfo = {
  wallet?: string
  email?: string
  projectName?: string
  logo?: { base64: string; mimeType?: string }
  category?: string
  aboutProject?: string
}

export type LinksToAnalyze = {
  site?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  discord?: string
  telegram?: string
}

export type CreateProjectForm = RegisterInfo & LinksToAnalyze

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
