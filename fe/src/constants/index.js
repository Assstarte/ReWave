import { GraphQLClient } from "graphql-request";

export const BACKEND_HOST = "https://localhost:3030/api";

export const gql = new GraphQLClient(BACKEND_HOST, {
  headers: {}
});
