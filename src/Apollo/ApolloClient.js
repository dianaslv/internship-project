import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: "http://localhost:4001/gql",
  cache: cache,
});
