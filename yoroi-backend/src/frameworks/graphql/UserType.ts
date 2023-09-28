import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLInt },
  },
});
