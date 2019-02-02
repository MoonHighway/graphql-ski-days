const { ApolloServer } = require("apollo-server");
const { generate } = require("shortid");
const { GraphQLScalarType } = require("graphql");

const typeDefs = `
    "A scalar type for parsing and serializing dates"
    scalar Date
    "An object that describes the characteristics of a ski day"
    type SkiDay {
        "A ski day's unique ID"
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
    "The input type that is passed into the addDay mutation"
    input AddDayInput {
      "The date when the ski day occurred. If not provided, this value will be set to the date when the mutation is sent (i.e. Now)"
      date: Date
      "The mountain where this ski day took place"
      mountain: String!
      "The conditions at the mountain on this particular ski day. Defaults to POWDER if no value provided"
      conditions: Conditions=POWDER
    }
    type Query {
        "Count of total days skied during a season"
        totalDays: Int
        "A list of all ski days that an individual has recorded this season"
        allDays: [SkiDay!]!
    }
    type Mutation {
        "Adds a day to a skier's total number of ski days during a season"
        addDay(input: AddDayInput!): SkiDay
        "Removes a day from a skier's total number of ski days during a season"
        removeDay: Int
    }
`;

let skiDays = [
  {
    id: "2WEKaVNO",
    date: "3/28/2019",
    mountain: "Mt. Tallac",
    conditions: "POWDER"
  },
  {
    id: "hwX6aOr7",
    date: "1/2/2019",
    mountain: "Freel Peak",
    conditions: "POWDER"
  },
  {
    id: "a4vhAoFG",
    date: "11/23/2019",
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
    addDay: (parent, { input: { date, mountain, conditions } }) => {
      if (mountain === "") {
        throw new Error("The name of a mountain must be provided");
      }

      if (!date) {
        date = new Date().toISOString();
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
    serialize: value => value.substring(0, 10),
    parseValue: value => new Date(value).toISOString(),
    parseLiteral: literal => new Date(literal.value).toISOString()
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
