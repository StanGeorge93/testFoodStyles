import React, {Component} from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Register extends Component {
  constructor() {
    super();

    this.register = this.register.bind(this);

    this.state = {
      name: "geo",
      email: "geo2@geo.com",
      password: "123456",
      passwordConfirm: "123456"
    }
  }

  handleChange(stateKey, evt) {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  register = async (e) =>{
    e.preventDefault();


    const { name, email, password, passwordConfirm } = this.state;

    const response = await this.props.mutate({
      variables: { name, email, password, passwordConfirm },
    });

  };


  render() {
    const props = this.props;

    return (
      <div className={``}>
        REGISTER
        <br/>
        <form onSubmit={this.register}>

         REGISTER FORM
          <fieldset>
            name: <input type="text" value={this.state.name} onChange={(e) => { this.handleChange("name", e) }} />
            email: <input type="text" value={this.state.email} onChange={(e) => { this.handleChange("email", e) }} />
            password: <input type="password" value={this.state.password} onChange={(e) => { this.handleChange("password", e) }} />
            password: <input type="password" value={this.state.passwordConfirm} onChange={(e) => { this.handleChange("passwordConfirm", e) }} />

          </fieldset>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

// mutation($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
//   register(registerInput: {name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm}) {
//     ok
//   }
// }

const registerMutation = gql`
  mutation($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
    register(registerInput: {name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm}) {
      user {
        email
      }
    }
  }
`;

export default graphql(registerMutation)(Register);