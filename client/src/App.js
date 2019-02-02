import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const COUNT_DAYS_QUERY = gql`
  query {
    totalDays
  }
`;

const App = () => (
  <Fragment>
    <h1>Ski Days</h1>
    <Query query={COUNT_DAYS_QUERY}>
      {({ loading, data }) => {
        if (loading) return <p>loading...</p>;
        return <p>total days: {data.totalDays}</p>;
      }}
    </Query>
  </Fragment>
);

export default App;
