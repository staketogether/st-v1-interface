interface GlobalConfig {
  url: string
  websiteUrl: string
  auditUrl: string
  appUrl: string
  docsPt: string
  docsEn: string
  termsPt: string
  termsEn: string
  privacyPt: string
  privacyEn: string
  backendUrl: string
  contentFul: string
  analyticsSubgraph: string
  backendSubgraph: string
}

export const globalConfig: GlobalConfig = {
  url: 'https://app.staketogether.org',
  websiteUrl: 'https://staketogether.org',
  appUrl: 'https://app.staketogether.org',
  auditUrl: 'https://github.com/staketogether/st-v1-contracts/tree/main/audits',
  docsPt: 'https://docs.staketogether.org/protocol/v/portugues',
  docsEn: 'https://docs.staketogether.org/protocol',
  termsPt: 'https://docs.staketogether.org/protocol/v/portugues/juridico/termos-de-uso',
  termsEn: 'https://docs.staketogether.org/protocol/legal/terms-and-conditions',
  privacyPt: 'https://docs.staketogether.org/protocol/v/portugues/juridico/politica-de-privacidade',
  privacyEn: 'https://docs.staketogether.org/protocol/legal/privacy-policies',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://st-backend-dev-thz2yhu72a-ue.a.run.app',
  contentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  analyticsSubgraph: 'https://st-analytics-api-ddfui.ondigitalocean.app/graphql',
  backendSubgraph: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://st-backend-dev-thz2yhu72a-ue.a.run.app'}/graphql`
}
