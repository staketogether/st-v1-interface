import { gql } from '@apollo/client'

export const queryContentfulPoolByAddress = gql`
  query PoolByAddress($walletAddress: String!, $locale: String) {
    poolCollection(where: { wallet: $walletAddress }, locale: $locale) {
      items {
        wallet
        name
        logo {
          url
          fileName
        }
        category {
          name
          sys {
            id
            publishedAt
          }
        }
        cover {
          url
          fileName
        }
        video
        image {
          url
          fileName
        }
        description
        acceptedTermsOfUse
        email
        aboutProject
        approvalModalViewed
        site
        twitter
        instagram
        youtube
        discord
        discordName
        gotas
        lens
        facebook
        status
        linkedin
        telegram
        contract
        sys {
          id
          publishedAt
        }
      }
    }
  }
`
