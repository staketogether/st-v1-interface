interface GlobalConfig {
  url: string
  websiteUrl: string
  auditUrl: string
  appUrl: string
  apy: string
  stakeTogetherUniversityUrlBr: string
  stakeTogetherUniversityUrlEn: string
  docsPt: string
  docsEn: string
  backendUrl: string
  contentFul: string
  analyticsSubgraph: string
  backendSubgraph: string
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
  docsPt: 'https://docs.staketogether.org',
  docsEn: 'https://docs.staketogether.org/stake-together/v/stake-together-en/stake-together/what-we-do',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://st-backend-dev-thz2yhu72a-ue.a.run.app',
  contentFul: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
  analyticsSubgraph: 'https://st-analytics-api-ddfui.ondigitalocean.app/graphql',
 backendSubgraph: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://st-backend-dev-thz2yhu72a-ue.a.run.app'}/graphql`,
  apy: '5.1',
  fees: {
    operation: '0',
    rewards: '8'
  }
}
