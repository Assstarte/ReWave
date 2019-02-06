import { GraphQLClient } from "graphql-request";

export const gql = new GraphQLClient("http://localhost:3030/api", {
  headers: {}
});
