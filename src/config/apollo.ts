import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { assetsList } from './asset'
import { globalConfig } from './global'

export const ethereumMainnetClient = getSubgraphClient({ assetId: 'eth-staking' })

export const stBackendClient = new ApolloClient({
  uri: globalConfig.backendSubgraph,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),

  connectToDevTools: true
})

export const analyticsClient = new ApolloClient({
  uri: globalConfig.analyticsSubgraph,
  ssrMode: typeof window === 'undefined',

  cache: new InMemoryCache(),

  connectToDevTools: true,
  link: new HttpLink({
    uri: globalConfig.analyticsSubgraph
  })
})

const contentfulAuthorization = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN}`
    }
  }
})

const httpLink = new HttpLink({
  uri: globalConfig.contentFul
})

export const contentfulClient = new ApolloClient({
  link: contentfulAuthorization.concat(httpLink),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export function getSubgraphClient({ assetId }: { assetId: string }) {
  const stakingAsset = assetsList.find(asset => asset.id === assetId)

  if (!stakingAsset?.staking) {
    throw new Error(`Asset ${assetId} is not a staking asset`)
  }

  return new ApolloClient({
    uri: stakingAsset.staking.subgraph,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pool: {
              keyArgs: ['id', 'delegate_contains']
            }
          }
        }
      }
    }),
    connectToDevTools: true
  })
}
