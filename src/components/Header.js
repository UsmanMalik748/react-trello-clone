import React,{Component} from 'react'


import MainNavBar from './MainNavBar';
import UserNavBar from './UserNavBar';
class Header extends Component{
	
	constructor(props){
			super(props);
			this.state = ({
				isLoggedIn:localStorage.getItem('auth')
			});
	}

	componentWillMount() {
    this.setState({
    		isLoggedIn : localStorage.getItem('auth')
  		}); 
    console.log('navbarr'+localStorage.getItem('auth'));
  }
	

		render(){
			if(this.state.isLoggedIn){
				return <UserNavBar/>
			}
			return <MainNavBar/>
		}
}
export default Header;