import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import chainConfig from './chain'
import { setContext } from '@apollo/client/link/context'
export const apolloClient = new ApolloClient({
  uri: chainConfig().subgraphs.StakeTogether,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
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
  uri: chainConfig().subgraphs.contentful
})

export const contentfulClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  connectToDevTools: true
})
