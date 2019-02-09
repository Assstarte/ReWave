import { GraphQLClient } from "graphql-request";

export const BACKEND_HOST = "http://localhost:3030/api";

export const gql = new GraphQLClient(BACKEND_HOST, {
  headers: {}
});
