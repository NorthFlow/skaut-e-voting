import React, { Component }  from 'react';
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

import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import PropTypes from 'prop-types';
import logo from 'assets/img/raise-hand-blue.png';


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

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    //margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
  },
  submit: {
    //margin: theme.spacing(3, 0, 2),
    backgroundColor: "#019ECE",
  }
};




class LoginClass extends Component{
  constructor(props) {

    super(props);
    this.state = {
      classes : makeStyles(styles),
      error: null,
      islogged: false,
      loginParams:{
        login: '',
        password: ''
      }
    };
  }

  //const classes = useStyles();

  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };

  login = event => {
    this.setState({ error: '' });
    Axios.post('http://localhost:4001/user/login', this.state.loginParams)
      .then(res => {
        //TODO: success login
        //window.alert("Prihlásenie prebehlo úspešne.");
  
        console.log('success login', res.data)
        console.log('res.data.user_id: ', res.data.id_user);
        localStorage.setItem("token", res.data.id_user);
        localStorage.setItem("user",  JSON.stringify(res.data));
        console.log(localStorage.getItem("token"));
        console.log('');
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
          window.alert("Something went wrong with login");
      }});
      event.preventDefault();
  };

  loadDataAfterSuccessLogin = () => {
    this.setState({
      ...this.state,
      islogged: true
    });
  }


  render() {  
    if ( localStorage.getItem("token") ) {
      //console.log('TOKEN MAME!!!');
      //console.log(localStorage.getItem("token"));
      
      
      return <Redirect to="/admin" />;
      
    }

    return (
      <Container component="main" maxWidth="xs" style={{"textAlign" : "center", "paddingTop" : "80px"}}>
        <CssBaseline />
        <div className={this.state.classes.paper} >
          <img src={logo} alt="logo" className={this.state.classes.img} style={{"width" : "10%"}} />
          <Typography component="h1" variant="h5" >
            Skautský e-voting
          </Typography>
          <form className={this.state.classes.form} noValidate onSubmit={this.login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Emailová adresa"
              name="login"
              autoComplete="email"
              autoFocus

              onChange={this.handleFormChange}
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

              onChange={this.handleFormChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.state.classes.submit}

              style={{"marginTop" : "30px"}}
            >
              Prihlásiť sa
            </Button>

          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );}



}


export default LoginClass;