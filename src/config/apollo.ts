import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache()
})
