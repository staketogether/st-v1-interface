import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { globalConfig } from './global'
import { getStakingById } from '@/config/product/staking'
import { StakingId } from '@/types/Staking'

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

const ethStaking = new ApolloClient({
  uri: getStakingById('eth-staking').subgraph,
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

const chzStaking = new ApolloClient({
  uri: getStakingById('chz-staking').subgraph,
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

const ethRestaking = new ApolloClient({
  uri: getStakingById('eth-restaking').subgraph,
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

export function getSubgraphClient({ stakingId }: { stakingId: StakingId }) {
  const stakingClients = {
    ['eth-staking']: ethStaking,
    ['eth-restaking']: ethRestaking,
    ['chz-staking']: chzStaking
  }
  return stakingClients[stakingId]
}

export const ethereumMainnetClient = getSubgraphClient({ stakingId: 'eth-staking' })
export const ethereumOpClient = getSubgraphClient({ stakingId: 'eth-restaking' })
