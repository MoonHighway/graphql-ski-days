import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const COUNT_DAYS_QUERY = gql`
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

const ADD_DAY_MUTATION = gql`
  mutation add($input: AddDayInput!) {
    addDay(input: $input) {
      id
      date
      mountain
      conditions
    }
  }
`;

export default class AddDayForm extends Component {
  state = {
    mountain: "",
    conditions: this.props.conditions[0],
    date: new Date().toISOString().substring(0, 10)
  };
  dayAdded = (client, { data }) => {
    let { allDays, totalDays } = client.readQuery({
      query: COUNT_DAYS_QUERY
    });
    client.writeQuery({
      query: COUNT_DAYS_QUERY,
      data: {
        totalDays: totalDays + 1,
        allDays: [...allDays, data.addDay]
      }
    });
  };
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={this.state.mountain}
          onChange={e => this.setState({ mountain: e.target.value })}
          placeholder="mountain..."
        />
        <input
          type="date"
          value={this.state.date}
          onChange={e => this.setState({ date: e.target.value })}
        />
        <select onChange={e => this.setState({ conditions: e.target.value })}>
          {this.props.conditions.map(c => (
            <option key={c} value={c}>
              {c.toLowerCase()}
            </option>
          ))}
        </select>
        <Mutation mutation={ADD_DAY_MUTATION} update={this.dayAdded}>
          {mutation => (
            <button
              onClick={() => mutation({ variables: { input: this.state } })}
            >
              Add Day
            </button>
          )}
        </Mutation>
      </form>
    );
  }
}
