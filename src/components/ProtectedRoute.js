import React from 'react';
import {Route,Redirect} from 'react-router-dome';
import Auth from '../action/Auth'
export const ProtectedRoute = ({component:Component,...rest})=>{
	return (
		<Route 
		{...rest},
		render = {props=>{
			if(Auth.IsAuthanticated){
				return <Component {...props} />
			}else{

				return <Redirect to={
					pathname: '/',
					state:{
						from:props.location
					}
				}/>
				console.log("error");
			}	
		}}

		/>
		);
}