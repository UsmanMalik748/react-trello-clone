import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Auth from '../actions/Auth';
import  {withRouter} from 'react-router-dom';

import {
  Link
} from "react-router-dom";
import trelloLogo from '../images/trelloLogo.svg'

class UserNavBar extends Component{

	constructor(props){
		super(props);
		this.state = ({
			isLoggedIn:localStorage.getItem('auth')
		})
	}

	logout = (e)=>{
		e.preventDefault();

		this.setState({
			isLoggedIn:false
		});
		localStorage.setItem('auth',false);
		localStorage.clear();
		Auth.signout();		
		this.props.history.push('/login');
		window.location.reload();
	}
render(){
	return(
		
			<div style={styles.container}>
				<div className="row">
					<div style={{float:'left',margin: "-5px 6px"}}>
					
						<Link to="/home" ><Button style={styles.navbutton}><Icon>home</Icon></Button></Link>
						<Link to="/dashboard" ><Button style={styles.navbutton}><Icon>dashboard</Icon></Button></Link>
				
					</div>
				<div style={{float:'center',marginLeft:'43%'}}>
					<img
				        alt="Test"
				        src={trelloLogo}
				        width="180"
				        height="30"
				        className="d-inline-block align-top"
				      />
				</div>
					<div style={{float:'right',margin:'-40px 12px'}}>

						<Button style={styles.navbutton}><Icon>add</Icon></Button>
						<Button style={styles.navbutton}><Icon>information</Icon></Button>
						<Button style={styles.navbutton}><Icon>notificationsNone</Icon></Button>
					
						<Button style={styles.navbutton} onClick={this.logout}>Logout</Button>
					</div>
				</div>
			</div>
		)}
}

const styles={
	container:{
		backgroundColor:'#026aa7',
		padding: '14px 0'
	},
	navbutton:{
		zIndex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.24)',
		margin: '4px',
		color:'white'
	},
	btnlogin:{
		zIndex: 1,
		backgroundColor: 'blue',
		margin: '4px',
		color:'white'
	},
	btnSignup:{
		zIndex: 1,
		backgroundColor: 'green',
		margin: '4px',
		color:'white'
	}
}
export default  withRouter(UserNavBar);