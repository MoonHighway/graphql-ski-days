import React, { Fragment, Component } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const ADD_DAY_MUTATION = gql`
  mutation add {
    addDay(date: "", mountain: "") {
      id
    }
  }
`;

export default class AddDayForm extends Component {
  state = {
    error: null
  };
  displayError = error => {
    this.setState({ error });
  };
  render() {
    return (
      <Fragment>
        <Mutation mutation={ADD_DAY_MUTATION} onError={this.displayError}>
          {mutation => <button onClick={mutation}>Add Day</button>}
        </Mutation>
        {this.state.error && (
          <p style={{ color: "red" }}>{this.state.error.message}</p>
        )}
      </Fragment>
    );
  }
}
