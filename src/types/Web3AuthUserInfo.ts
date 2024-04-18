const LOGIN_PROVIDER = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  REDDIT: 'reddit',
  DISCORD: 'discord',
  TWITCH: 'twitch',
  APPLE: 'apple',
  LINE: 'line',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  JWT: 'jwt'
} as const

export type LOGIN_PROVIDER_TYPE = (typeof LOGIN_PROVIDER)[keyof typeof LOGIN_PROVIDER]
export type CUSTOM_LOGIN_PROVIDER_TYPE = string & { toString?: (radix?: number) => string }

export type Web3AuthUserInfo = {
  email?: string
  name?: string
  profileImage?: string
  aggregateVerifier?: string
  verifier?: string
  verifierId?: string
  typeOfLogin?: LOGIN_PROVIDER_TYPE | CUSTOM_LOGIN_PROVIDER_TYPE
}
