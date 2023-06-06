import { ApolloClient, InMemoryCache } from '@apollo/client'
import chainConfig from './chain'

export const apolloClient = new ApolloClient({
  uri: chainConfig().subgraphs.StakeTogether,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  connectToDevTools: true
})
