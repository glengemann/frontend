import { createPinia } from 'pinia';
import {ApolloClient, HttpLink} from "@apollo/client/core";
import {InMemoryCache} from "@apollo/client/cache";

const pinia = createPinia();

pinia.use(() => {
  const link = new HttpLink({
    uri:
      //process.env.VUE_APP_ATLAS_GRAPHQL_ENDPOINT ||
      'https://beyond-translation.perseus.org/graphql/',
  });
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          passageTextParts: {
            merge: false,
          },
        },
      },
    },
  });
  const client = new ApolloClient({ link, cache });

  return { client };
});

export default pinia;
