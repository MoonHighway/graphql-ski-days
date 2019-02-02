import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const COUNT_DAYS = gql`
  query {
    totalDays
    allDays {
      id
      date
      mountain
      conditions
    }
  }
`;

const ListDays = ({ total = 0, days = [] }) => (
  <table border={1} cellPadding={5}>
    <thead>
      <tr>
        <th colSpan={3}>{total} days</th>
      </tr>
    </thead>
    <tbody>
      {days.map(day => (
        <tr key={day.id}>
          <td>{day.mountain}</td>
          <td>{day.date}</td>
          <td>{day.conditions}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const App = () => (
  <Fragment>
    <h1>Ski Days</h1>
    <Query query={COUNT_DAYS}>
      {({ loading, data }) => {
        if (loading) return <p>loading...</p>;
        return <ListDays total={data.totalDays} days={data.allDays} />;
      }}
    </Query>
  </Fragment>
);

export default App;
