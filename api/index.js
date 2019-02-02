const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Query {
        "Count of total days skied during a season"
        totalDays: Int
    }
    type Mutation {
        "Adds a day to a skier's total number of ski days during a season"
        addDay: Int
        "Removes a day from a skier's total number of ski days during a season"
        removeDay: Int
    }
`;

let skiDays = 0;

const resolvers = {
  Query: {
    totalDays: () => skiDays
  },
  Mutation: {
    addDay: () => ++skiDays,
    removeDay: () => --skiDays
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => `GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
