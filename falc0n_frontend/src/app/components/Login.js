import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../logo.png";
import { login } from '../views/main/mainSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: '#5e6a81' }} align="center">
      {'Copyright © '}
      <span>
        FalcOn.exe Team
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    color: 'white',
    width: '100%',
    backgroundColor: '#151c32',
    fontSize: '13px',
  },
  label: {
    color: 'white',
    fontSize: '13px',
    width: '100%'
  },
  button: {
    backgroundColor: '#dd8108',
    color: '#151c32',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  }
}));

export default function SignIn({ setLogin }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  
  const [user, setuser] = useState({
    email: "",
    password: "",

  })
  useEffect(() => {
    console.log(user);
  }, [user])


  const loginNow = () => {
    dispatch(login(user))
  }

  return (
    <div className="app-main" style={{ padding: "50px 20%" }}>
      <div className="chart-container" style={{ display: "flex", flexDirection: "column" }} >
        <div className={classes.paper}>
          <div style={{ width: "200px", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <img style={{ width: "50%" }} src={logo} />
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              InputProps={{ className: classes.input, autoComplete: 'off' }}
              InputLabelProps={{ className: classes.label }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              autoFocus
            />
            <TextField
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              InputProps={{ className: classes.input, autoComplete: 'off' }}
              InputLabelProps={{ className: classes.label }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
            />

            <Button
              onClick={() => loginNow()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item className="switcherAuth" style={{ color: '#5e6a81' }}>
                <div onClick={() => setLogin(false)}>
                  {"Don't have an account? Sign Up"}
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </div>
  );
}