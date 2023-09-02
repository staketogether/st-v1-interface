interface GlobalConfig {
  url: string
  websiteUrl: string
  recaptchakey: string
}

export const globalConfig: GlobalConfig = {
  url: 'https://alpha.staketogether.app',
  websiteUrl: 'https://staketogether.app',
  recaptchakey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
}
