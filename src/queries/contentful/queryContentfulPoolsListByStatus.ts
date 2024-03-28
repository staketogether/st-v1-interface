import { gql } from '@apollo/client'

export const queryContentfulPoolsListByStatus = gql`
  query PoolsList(
    $locale: String
    $status: String
    $first: Int
    $skip: Int
    $nameContains: String
    $walletContains: String
    $walletNotIn: [String]
    $chainId: [String]
  ) {
    poolCollection(
      locale: $locale
      where: {
        status: $status
        OR: [{ name_contains: $nameContains, wallet_contains: $walletContains, wallet_not_in: $walletNotIn }]
        supportedNetworks_contains_some: $chainId
      }
      skip: $skip
      limit: $first
    ) {
      total
      items {
        wallet
        sys {
          id
          publishedAt
        }
        aboutProject
        email
        name
        logo {
          url
          fileName
        }
        category {
          name
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
        site
        twitter
        instagram
        status
        youtube
        discord
        discordName
        gotas
        lens
        facebook
        linkedin
        telegram
        contract
      }
    }
  }
`
