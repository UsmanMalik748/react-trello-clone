import React,{Component} from 'react';
import axios from 'axios';

import UserNavBar from './UserNavBar';
import MainNavBar from './MainNavBar'
class Home extends Component {
	state = {
    persons: []
  }

	 componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
      console.log("localstorage",localStorage.getItem('auth'));
  }
	render(){
    if(localStorage.getItem('auth')){
return (
        <div>
          <UserNavBar/>
          <h1>Home</h1> 
          <ul>
            { this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
          </ul>           
        </div>
        
    );
  }
	  return (
	    	<div>
          <MainNavBar/>
	    		<h1>Home</h1> 
	    		<ul>
            { this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
          </ul> 		   		
	    	</div>

	  );
	}
}
export default Home;
