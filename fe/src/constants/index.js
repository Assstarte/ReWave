import { GraphQLClient } from "graphql-request";

export const BACKEND_HOST = "http://localhost:3030/api/";

//Change to pure IP Host of the local machine to cross-test (ex. http://10.1.100.11:3030)
export const PURE_BACKEND_HOST = "http://localhost:3030";

export const gql = new GraphQLClient(`/api`, {
  credentials: "include",
  mode: "cors"
});
