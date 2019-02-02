const { ApolloServer } = require("apollo-server");
const { generate } = require("shortid");
const { GraphQLScalarType } = require("graphql");

const typeDefs = `
    "A scalar type for parsing and serializing dates"
    scalar Date
    "An object that describes the details of a single ski day"
    type SkiDay {
        "A unique identifier for the record"
        id: ID!
        "The date that this ski day occurred"
        date: Date!
        "The mountain where this ski day took place"
        mountain: String!
        "The conditions at the mountain on this particular ski day"
        conditions: Conditions
    }
    "A choice of options for conditions on a ski day"
    enum Conditions {
        "Fresh snow, either deep snow or packed powder"
        POWDER
        "Heavy warm wet snow that makes it hard to turn"
        HEAVY
        "Hard bulletproof ice, scary conditions on steep slopes"
        ICE
        "A little bit of snow. a lot of rocks, bushes, and trees."
        THIN
    }
    type Query {
        "Count of total days skied during a season"
        totalDays: Int
        "A list of all ski days that an individual has recorded this season"
        allDays: [SkiDay!]!
    }
    type Mutation {
        "Adds a day to a skier's total number of ski days during a season"
        addDay(date: String! mountain: String! conditions: Conditions): SkiDay
        "Removes a day from a skier's total number of ski days during a season"
        removeDay: Int
    }
`;

let skiDays = [
  {
    id: "2WEKaVNO",
    date: "2019-02-15T00:00:00.000Z",
    mountain: "Mt. Tallac",
    conditions: "POWDER"
  },
  {
    id: "hwX6aOr7",
    date: "2019-01-03T00:00:00.000Z",
    mountain: "Freel Peak",
    conditions: "POWDER"
  },
  {
    id: "a4vhAoFG",
    date: "2019-04-13T00:00:00.000Z",
    mountain: "Tamarack Peak",
    conditions: "ICE"
  }
];

const resolvers = {
  Query: {
    totalDays: () => skiDays.length,
    allDays: () => skiDays
  },
  Mutation: {
    addDay: (parent, { date, mountain, conditions }) => {
      if (mountain === "") {
        throw new Error("A mountain must be provided.");
      }

      let newDay = {
        id: generate(),
        date,
        mountain,
        conditions
      };

      skiDays = [...skiDays, newDay];

      return newDay;
    },
    removeDay: () => --skiDays
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "A valid date value",
    serialize: value => value.substring(0, 10)
  })
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
