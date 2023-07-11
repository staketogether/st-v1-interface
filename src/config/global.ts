interface GlobalConfig {
  url: string
  recaptchakey: string
  fee: {
    protocol: bigint
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://alpha.staketogether.app',
  recaptchakey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
  fee: {
    protocol: 90000000000000000n
  }
}
