import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

const httpLink = createHttpLink({
  uri: 'https://beyond-translation.perseus.org/graphql/',
});

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
