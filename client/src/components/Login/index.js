import React from 'react';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons'
import history from "../../history"

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  }
});

function Login({classes}) {

  const [userEmail, setUserEmail] = React.useState("geo@geo.com");
  const [userPassword, setUserPassword] = React.useState("1234567");
  const [loading, setLoading] = React.useState(false);
  const [LoginErrors, setLoginErrors] = React.useState("");


  const query = `mutation login($loginInput: LoginInput) {
      login(loginInput: $loginInput) {
        token,
        refreshToken
      }
    }
  `

  const authHandler = async () => {
    try {
      setLoading(true);

      const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            loginInput: {
              email: userEmail,
              password: userPassword
            }
          }
        })
      });

      const response = await resp.json();

      if (response.errors) {
        const errors = response.errors.map(err=>err.message).join("<br/>");
        setLoginErrors(errors);
        setLoading(false);
      }

      const { refreshToken, token } = response.data.login;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", token);

      history.push('/welcome');

      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err && err.errors && err.errors[0]) {
        console.log("SET NEW ERROR", err.errors[0].message);
      }
    }
  };

  return (
    <Paper className={classes.padding}>
      <form className={classes.margin}
            onSubmit={e => {
              e.preventDefault();
              authHandler();
            }}
      >

        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face/>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="email" label="email" type="email" fullWidth autoFocus required value={userEmail}
                       onChange={e => setUserEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint/>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="password" label="Password" type="password" fullWidth required value={userPassword}
                       onChange={e => setUserPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {
          LoginErrors &&
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <div className={'error'}>
                {LoginErrors}
              </div>
            </Grid>
          </Grid>
        }

        <Grid container justify="center" style={{marginTop: '10px'}}>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(Login);