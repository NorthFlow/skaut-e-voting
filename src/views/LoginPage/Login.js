import React, { useState }  from 'react';
import Axios from 'axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types';
import logo from 'assets/img/raise-hand-blue.png';

async function loginUser(credentials) {
  return fetch('http://localhost:4001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const login = event => {
  this.setState({ error: '' });
  Axios.post('http://localhost:4001/user/login', this.state.loginParams)
    .then(res => {
      //TODO: success login
      //window.alert("Prihlásenie prebehlo úspešne.");

      console.log('success login', res.data)
      localStorage.setItem("token", res.data.user_id);
      localStorage.setItem("user",  JSON.stringify(res.data));
      this.loadDataAfterSuccessLogin();
    })
    .catch(err => {
      if (err.response) {
        //TODO: show error response from server
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
        this.setState({...this.state,error: err.response.data.message})
      } else if (err.request) {
        //TODO: msg internet connection..
        window.alert("Internet connection failed.");
      } else {
        //TODO: rly dont know what error can happend here but can happend :D
        window.alert("Something went wrong.");
    }});
    event.preventDefault();
};

 


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://skauting.sk/">
        Slovenský skauting
      </Link>{' '}
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#019ECE",
  },
}));

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const classes = useStyles();
  
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="logo" className={classes.img} style={{"width" : "10%"}} />
        <Typography component="h1" variant="h5">
          Prihlás sa
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Emailová adresa"
            name="email"
            autoComplete="email"
            autoFocus

            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Heslo"
            type="password"
            id="password"
            autoComplete="current-password"

            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamätať si ma"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Prihlásiť sa
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Zabudol si svoje heslo?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Nemáš konto? Požidaj oň."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}