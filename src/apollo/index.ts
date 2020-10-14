import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

export * from './defs'

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || process.env.REACT_APP_GRAPHQL_URL || undefined
  // fetchOptions: {
  //   mode: 'no-cors'
  // }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
