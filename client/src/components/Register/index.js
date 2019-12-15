import React from 'react';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  }
});

function Register({classes}) {

  const [userName, setUserName] = React.useState("geo");
  const [userEmail, setUserEmail] = React.useState("geo@geo.com");
  const [userPassword, setUserPassword] = React.useState("1234567");
  const [userConfirmPassword, setuserConfirmPassword] = React.useState("1234567");
  const [loading, setLoading] = React.useState(false);
  const [registerErrors, setRegisterErrors] = React.useState("");


  const query = `mutation register($registerInput: RegisterInput) {
      register(registerInput: $registerInput) {
        name,
        email
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
            registerInput: {
              name: userName,
              email: userEmail,
              password: userPassword,
              confirmPassword: userConfirmPassword
            }
          }
        })
      });

      const data = await resp.json();

      if (data.errors) {
        const errors = data.errors.map(err=>err.message).join("<br/>");
        setRegisterErrors(errors);
        setLoading(false);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err && err.errors && err.errors[0]) {
        console.log("SET NEW ERROR", err.errors[0].message);
      }
    }
  };

  console.log("USER EMAIL", userEmail);

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
            <TextField id="name" label="name" type="name" fullWidth autoFocus required value={userName}
                 onChange={e => setUserName(e.target.value)}
            />
          </Grid>
        </Grid>
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
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint/>
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="passwordconfirm" label="Password Confirm" type="password" fullWidth required
                 value={userConfirmPassword}
                 onChange={e => setuserConfirmPassword(e.target.value)}

            />
          </Grid>
        </Grid>

        {
          registerErrors &&
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <div className={'error'}>
              {registerErrors}
            </div>
          </Grid>
        </Grid>
        }

        <Grid container justify="center" style={{marginTop: '10px'}}>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </Grid>
      </form>
    </Paper>
  );
}

export default withStyles(styles)(Register);