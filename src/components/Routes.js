import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import SubBoard from './SubBoard';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
const Router = (props) => (

		<Switch>
				<Route exact path="/">
    				<Home/> 
    			</Route> 
		        <Route exact path="/home">
		            <Home/> 
		        </Route> 			
	            <Route path="/login">
	             	<Login />	          
	            </Route>
	            <Route path="/Signup">
	              	<SignUp />
	            </Route>
	            <Route path="/ExampleComponent">
	              	<ExampleComponent />
	            </Route>
	            <PrivateRoute  path="/dashboard" component={Dashboard}/>
	            <PrivateRoute  path="/subboard/:board_id/:project_name" component={SubBoard}/>
		</Switch>

)
const PrivateRoute = ({ component: Component, ...rest }) => (
<Route
{...rest}
render={props =>
localStorage.getItem('auth') ? (
<Component {...props} />
) : (
<Redirect
to={{
pathname: "/"
}}
/>
)
}
/>
);
export default Router;