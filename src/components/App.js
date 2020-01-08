import React,{Component} from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
class App extends Component {

    constructor(props){
      super(props);
      this.state= {
        loggedIn:localStorage.getItem('auth')

      }
    }


	render(){
    
  return (
  	<Router auth={this.state.loggedIn} >
    <div className="App" >
  
    		<Routes/>
    		   		   		
    </div>
    </Router>
  );
}
}
export default App;
