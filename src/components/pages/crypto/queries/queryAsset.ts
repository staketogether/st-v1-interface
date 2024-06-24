import { gql } from '@apollo/client'

export const queryAssetsList = gql`
  query Assets($offset: Float, $chainId: Float, $limit: Float, $orderDirection: String, $orderBy: String, $category: String) {
    assets(offset: $offset, chainId: $chainId, limit: $limit, orderDirection: $orderDirection, orderBy: $orderBy, category: $category) {
      currentPriceUsd
      imageUrl
      marketCap
      name
      networks {
        chainId
        contractAddress
        name
      }
      priceChangePercentage24h
      ref
      symbol
      totalVolume
    }
  }
`
