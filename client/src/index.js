import { request } from "graphql-request";

const query = `
  query {
    totalDays
  }
`;

console.log("querying the count");
request("http://localhost:4000", query)
  .then(({ totalDays }) => `totalDays: ${totalDays}`)
  .then(console.log)
  .catch(console.error);
