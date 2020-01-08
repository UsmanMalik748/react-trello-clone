import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import trelloLogo from '../images/trelloLogo.svg'
import axios from 'axios';
import PropTypes from "prop-types";
import  {withRouter,Redirect} from 'react-router-dom';
import Auth from '../actions/Auth';

import {
  Link
} from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const classes = {
  paper: {
    marginTop: '18%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:'5px',
    paddingBottom : '30px'
  },
  avatar: {
    margin: '2%',
    backgroundColor: "white",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '3%',
  },
  submit: {
    margin: '8% 0 6%',
  },
  shadow:{
    boxShadow: '0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)',
    borderRadius: '5px',
  }
};

let baseUrl = "http://localhost:8000/api/auth/";
let isEnabled = false;
class Login extends Component{

 static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
     super(props, context);

    this.state={
      email:'',
      password:'',
      error:{},
      isLoggedIn:false

    } 
   }

  componentDidMount() {
     if(localStorage.getItem('auth')){
        this.setState({
            isLoggedIn : localStorage.getItem('auth')
          }); 
        this.props.history.push('/dashboard');
     }
  }

   handleForm=(e)=>{
      e.preventDefault();
      
      const user = {
      email: this.state.email,
      password: this.state.password,
    };
      const name = e.target.name;
      const value = '';
      
  
    axios.post(baseUrl+'login',  user)
      .then(res => {
    
      this.setState({[name]:value,isLoggedIn : Auth.authenticate()});        

      }).then(response => { 

   		localStorage.setItem('auth', response);
      this.setState({
      email:'',
      password:'',
      });
console.log(response)
      this.props.history.push('/dashboard');

    }).catch(error => {
      console.log(error);
});
    
   }

   handleInput=(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]:value});
   }
  
render(){
  if (this.state.isLoggedIn === true || localStorage.getItem('auth') === true) {
      return <Redirect to={{ pathname: `/dashboard` }} />;
    }else{
  return (
    <Container component="main" maxWidth="xs" style={classes.shadow}>
      <CssBaseline />
      <div style={classes.paper}>
          <img
        alt="Test"
        src={trelloLogo}
        width="150"
        height="130"
        className="d-inline-block align-top"
      />
        <Typography component="h1" variant="h5" style={{marginBottom:'8%'}}>
          Log in to Trello
        </Typography>
        <ValidatorForm style={classes.form} noValidate onSubmit={this.handleForm}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleInput}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
                value={this.state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleInput}
                validators={['isString', 'required']}
                errorMessages={'This field is required'}
                value={this.state.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
            disabled={isEnabled}
          >
            Logg In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2" margin-right="1%">
                Forget password?
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/signup" variant="body2" margin-left="1%">
                Create free Account.
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}
}
export default withRouter(Login);

