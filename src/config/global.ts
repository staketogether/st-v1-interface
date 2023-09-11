interface GlobalConfig {
  url: string
  websiteUrl: string
  auditUrl: string
  appUrl: string
  recaptchakey: string
  apy: string
  fees: {
    operation: string
    rewards: string
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://beta.staketogether.app',
  websiteUrl: 'https://beta.staketogether.app',
  appUrl: 'https://beta.staketogether.app',
  auditUrl:
    'https://github.com/blocksecteam/audit-reports/blob/main/solidity/blocksec_staketogether_v1.1-signed.pdf',
  recaptchakey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
  apy: '6',
  fees: {
    operation: '0.3',
    rewards: '0.45'
  }
}
