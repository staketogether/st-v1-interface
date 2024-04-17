import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { globalConfig } from './global'
import { getSubgraphByProductName } from './products/staking'

const ethereumMainnetSubgraph = getSubgraphByProductName({ productName: 'ethereum-stake', isTestnet: false })
const ethereumTestnetSubgraph = getSubgraphByProductName({ productName: 'ethereum-stake', isTestnet: true })
const ethereumMainnetRestaking = getSubgraphByProductName({
  productName: 'ethereum-restaking',
  isTestnet: false
})
const ethereumTestnetRestaking = getSubgraphByProductName({
  productName: 'ethereum-restaking',
  isTestnet: true
})

export const ethereumMainnetClient = new ApolloClient({
  uri: ethereumMainnetSubgraph,
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

export const ethereumTestnetClient = new ApolloClient({
  uri: ethereumTestnetSubgraph,
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

export const ethereumRestakingMainnetClient = new ApolloClient({
  uri: ethereumMainnetRestaking,
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

export const ethereumRestakingTestnetClient = new ApolloClient({
  uri: ethereumTestnetRestaking,
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

export function getSubgraphClient({ productName, isTestnet }: { productName: string; isTestnet: boolean }) {
  const clientList = {
    'ethereum-stake': isTestnet ? ethereumTestnetClient : ethereumMainnetClient,
    'ethereum-restaking': isTestnet ? ethereumRestakingTestnetClient : ethereumRestakingMainnetClient,
    polygon: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    solana: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    celestia: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    cosmos: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    near: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    polkadot: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    chiliz: isTestnet ? ethereumTestnetClient : ethereumTestnetClient,
    bitcoin: isTestnet ? ethereumTestnetClient : ethereumTestnetClient
  }

  const client = clientList[productName as keyof typeof clientList]
  return client
}
