import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const CURRENT_DAYS = gql`
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

const REMOVE_DAY = gql`
  mutation remove($id: ID!) {
    removeDay(id: $id) {
      removed
      day {
        id
      }
    }
  }
`;

const dayRemoved = (cache, { data }) => {
  if (data.removeDay.removed) {
    const { totalDays, allDays } = cache.readQuery({ query: CURRENT_DAYS });
    cache.writeQuery({
      query: CURRENT_DAYS,
      data: {
        totalDays: totalDays - 1,
        allDays: allDays.filter(day => day.id !== data.removeDay.day.id)
      }
    });
  }
};

const ListDays = ({ total = 0, days = [] }) => (
  <table border={1} cellPadding={5}>
    <thead>
      <tr>
        <th colSpan={4}>{total} days</th>
      </tr>
    </thead>
    <tbody>
      {days.map(day => (
        <tr key={day.id}>
          <td>{day.mountain}</td>
          <td>{day.date}</td>
          <td>{day.conditions}</td>
          <td>
            <Mutation mutation={REMOVE_DAY} update={dayRemoved}>
              {mutation => (
                <button onClick={() => mutation({ variables: { id: day.id } })}>
                  -
                </button>
              )}
            </Mutation>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListDays;
