import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import chainConfig from './chain'
export const apolloClient = new ApolloClient({
  uri: chainConfig().subgraphs.StakeTogether,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pool: {
            keyArgs: ['id', 'delegate_contains']
          },
          account: {
            keyArgs: ['id']
          }
        }
      }
    }
  }),

  connectToDevTools: true
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN}`
    }
  }
})

const httpLink = new HttpLink({
  uri: chainConfig().subgraphs.ContentFul
})

export const contentfulClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  connectToDevTools: true
})
