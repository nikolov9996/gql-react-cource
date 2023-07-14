const graphql = require("graphql");
const _ = require("loadsh");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const users = [
  { firstName: "Ram", id: "1", age: 23 },
  { firstName: "Shyam", id:"2", age: 28 },
  { firstName: "John", id: "3", age: 33 },
  { firstName: "Bob", id: "4", age: 41 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
