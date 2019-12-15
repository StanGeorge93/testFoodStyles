import React from 'react';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import history from "../../history"

const {useEffect} = React;

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  }
});

function Register({classes}) {
  const [userName, setuserName] = React.useState("");

  const query = `mutation me($token: String) {
      me(token: $token) {
        ok,
        name
      }
    }
  `

  const checkIfLoggedIn = async (token) => {
    const resp = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          token: token,
        }
      })
    });

    const response = await resp.json();

    const { ok, name } = response.data.me;

    if (!ok) {
      history.push("/login")
    }

    setuserName(name);

  };

  useEffect( () => {
    const token = localStorage.getItem("token");

    checkIfLoggedIn(token);
  })

  return (
    <Paper className={classes.padding}>
      <h1>Welcome: {userName}!</h1>
    </Paper>
  );
}

export default withStyles(styles)(Register);