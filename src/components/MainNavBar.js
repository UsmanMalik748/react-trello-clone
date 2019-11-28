import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default function MainNavBar(){

	return(
			<div style={styles.container}>
				<div className="row">
					<div style={{float:'left',    margin: '-11px 0px -0px -9px'}}>
						<Button style={styles.navbutton}><Icon>home</Icon></Button>
						<Button style={styles.navbutton}><Icon>dashboard</Icon></Button>
					</div>
				<div style={{float:'center',marginLeft:'43%'}}>
					Trello Board
				</div>
					<div style={{float:'right',margin:'-30px 0'}}>
						<Button style={styles.navbutton}><Icon>add</Icon></Button>
						<Button style={styles.navbutton}><Icon>information</Icon></Button>
						<Button style={styles.navbutton}><Icon>notificationsNone</Icon></Button>
					</div>
				</div>
			</div>
		)
}
const styles={
	container:{
		backgroundColor:'#026aa7',
		padding: '20px'
	},
	navbutton:{
		zIndex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.24)',
		margin: '4px',
		color:'white'
	}
}