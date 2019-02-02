import React from "react";
import { render } from "react-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const COUNT_DAYS_QUERY = gql`
  query countDays {
    totalDays
  }
`;

render(
  <ApolloProvider client={client}>
    <Query query={COUNT_DAYS_QUERY}>
      {({ loading }) => {
        if (loading) return <p>loading</p>;
        return <p>ready</p>;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);
