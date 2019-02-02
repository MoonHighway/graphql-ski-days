import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import AddDayForm from "./AddDayForm";
import ListDays from "./ListDays";

const COUNT_DAYS = gql`
  query {
    totalDays
    allDays {
      id
      date
      mountain
      conditions
    }
    conditions: __type(name: "Conditions") {
      enumValues {
        name
      }
    }
  }
`;

const App = () => (
  <Fragment>
    <h1>Ski Days</h1>
    <Query query={COUNT_DAYS}>
      {({ loading, data }) => {
        if (loading) return <p>loading...</p>;
        return (
          <Fragment>
            <AddDayForm
              conditions={data.conditions.enumValues.map(c => c.name)}
            />
            <ListDays total={data.totalDays} days={data.allDays} />
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default App;
