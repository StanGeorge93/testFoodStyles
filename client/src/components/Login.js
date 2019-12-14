import React, {Component} from "react";

class Login extends Component {
  constructor() {
    super();

    this.login = this.login.bind(this);

    this.state = {
      email: null,
      password: null
    }
  }

  handleChange(stateKey, evt) {
    this.setState({
      [stateKey]: evt.target.value
    })
  }

  login(e) {
    e.preventDefault();

  }


  render() {
    const props = this.props;

    return (
      <div className={``}>
        LOGIN
        <br/>

        <form onSubmit={this.login}>

          LOGIN FORM
          <fieldset>
            email: <input type="text" value={this.state.email} onChange={(e) => { this.handleChange("email", e) }} />
            password: <input type="password" value={this.state.password} onChange={(e) => { this.handleChange("password", e) }} />

          </fieldset>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}


export default Login;
