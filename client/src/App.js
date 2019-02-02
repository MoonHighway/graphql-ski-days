import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

const COUNT_DAYS_QUERY = gql`
  query {
    totalDays
  }
`;

const ADD_DAY_MUTATION = gql`
  mutation add {
    addDay
  }
`;

const REMOVE_DAY_MUTATION = gql`
  mutation remove {
    removeDay
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
    <p>
      <Mutation
        mutation={ADD_DAY_MUTATION}
        refetchQueries={[{ query: COUNT_DAYS_QUERY }]}
      >
        {addDay => <button onClick={addDay}>+</button>}
      </Mutation>
      <Mutation
        mutation={REMOVE_DAY_MUTATION}
        refetchQueries={[{ query: COUNT_DAYS_QUERY }]}
      >
        {removeDay => <button onClick={removeDay}>-</button>}
      </Mutation>
    </p>
  </Fragment>
);

export default App;
