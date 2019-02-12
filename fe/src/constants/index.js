import { GraphQLClient } from "graphql-request";

export const BACKEND_HOST = "http://localhost:3030/api";

export const PURE_BACKEND_HOST = "http://localhost:3030/";

export const gql = new GraphQLClient(BACKEND_HOST, {
  credentials: "include",
  mode: "cors"
});
