import React,{Component} from 'react'
import Button from '@material-ui/core/Button';


import {
  Link
} from "react-router-dom";
import trelloLogo from '../images/trelloLogo.svg'

export default class MainNavBar extends Component{



render(){

	return(
		
			<div style={styles.container} >
				<div className="row">
					<div style={{float:'left',    margin: '-15px 0px 0px -24px'}}>
							<img
				        alt="Test"
				        src={trelloLogo}
				        width="180"
				        height="30"
				        className="d-inline-block align-top"
				      />
					</div>
					<div style={{float:'right',margin:'-22px 15px'}}>
						<Link to="/login" ><Button style={styles.navbutton}>Login</Button></Link>
						<Link to="/signup" ><Button style={styles.navbutton}>Signup</Button></Link>
					</div>
				</div>
			</div>
		)
	}
}


const styles={
	container:{
		backgroundColor:'#026aa7',
		padding: '27px 0',
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