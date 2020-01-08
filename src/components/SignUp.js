import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import trelloLogo from '../images/trelloLogo.svg'
import {
  Link
} from "react-router-dom";
import axios from 'axios';


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
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:'15px'
  },
  avatar: {
    margin: '2%',
    backgroundColor: "red",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '3%',
  },
  submit: {
    margin: '3% 0 2%',
  },
  shadow:{
    boxShadow: '0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)',
    borderRadius: '5px',
  }
};

let baseUrl = "http://localhost:8000/api/auth/";
let isEnabled = false;

export default class SignUp extends Component{

  constructor(props){
    super(props);

    this.state={
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirm_password:'',
      error:{}
    }
   }
componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {

            if (value !== this.state.password) {
                return false;
            }
            return true;
          
        });
    }
 
    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }
   handleForm=(e)=>{
      e.preventDefault();
      console.log(this.state);
      isEnabled = true;
      const user = {
      name:this.state.firstName +" "+ this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

      const name = e.target.name;
      const value = '';
    axios.post(baseUrl+'register',  user)
      .then(res => {
        console.log(res);
        console.log(res.data.status);

      this.setState({[name]:value});        

      }).then(response => { 
  console.log("aaaa"+response)
   isEnabled = false;

      this.setState({        
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirm_password:'',
      });
}).catch(error => {
    isEnabled = false;
    console.log("sss"+error)
});
    
   }

   handleInput=(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]:value});
   }
  
render(){
  return (
    <Container component="main" maxWidth="xs" style={classes.shadow}>
      <CssBaseline />
      <div style={classes.paper}>
       {/*<Avatar style={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>*/}
          <img
        alt="Test"
        src={trelloLogo}
        width="150"
        height="130"
        className="d-inline-block align-top"
      />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm style={classes.form} noValidate onSubmit={this.handleForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={this.handleInput}
                validators={['required', 'isString']}
                errorMessages={'This field is required'}
                value={this.state.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={this.handleInput}
                validators={['required', 'isString']}
                errorMessages={'This field is required'}
                value={this.state.lastName}
              />
            </Grid>
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
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password Mismatch', 'This field is required']}
                value={this.state.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password Mismatch', 'This field is required']}                    
                autoComplete="current-password"
                onChange={this.handleInput}
                value={this.state.confirm_password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="login" variant="body2">
                Already have an account? Sign in
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

