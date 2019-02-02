import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const query = gql`
  query {
    totalDays
  }
`;

console.log("querying the count");
client
  .query({ query })
  .then(({ data }) => `totalDays: ${data.totalDays}`)
  .then(console.log)
  .catch(console.error);
