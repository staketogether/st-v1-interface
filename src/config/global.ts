interface GlobalConfig {
  url: string
  websiteUrl: string
  auditUrl: string
  appUrl: string
  recaptchakey: string
  apy: string
  stakeTogetherUniversityUrlBr: string
  stakeTogetherUniversityUrlEn: string
  fees: {
    operation: string
    rewards: string
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://app.staketogether.org',
  websiteUrl: 'https://staketogether.org',
  appUrl: 'https://app.staketogether.org',
  auditUrl: 'https://github.com/staketogether/st-v1-contracts/tree/main/audits',
  stakeTogetherUniversityUrlEn: 'https://university.staketogether.org/en/collections/6550996-documentation',
  stakeTogetherUniversityUrlBr: 'https://university.staketogether.org/pt/collections/6550996-documentation',
  recaptchakey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
  apy: '5.1',
  fees: {
    operation: '0.3',
    rewards: '9'
  }
}
