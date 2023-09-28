import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserType } from "./graphql/UserType";
import axios from "axios";
import Paths from "@src/domain/constants/Paths";
import { IUser } from "@src/domain/models/User";

const BASE_URL = `http://localhost:3000${Paths.Base}`;

async function fetchUser(): Promise<IUser[]> {
  const response = await axios.get(`${BASE_URL}${Paths.Users.Base}`);
  return response.data as IUser[];
}

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello word";
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => await fetchUser(),
      },
    },
  }),
});
