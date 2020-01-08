import React,{Component} from 'react';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import {DragDropContext} from'react-beautiful-dnd';
import {sort} from '../actions';
import axios from 'axios';
import UserNavBar from './UserNavBar';
import  {Redirect} from 'react-router-dom';
import {CONSTANTS} from '../actions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
let baseUrl = "http://localhost:8000/api/";
const state = [];
let newList=null;
let statess = null;
class SubBoard extends Component {
	constructor(props) {
     super(props);
	this.handleToUpdate	= this.handleToUpdate.bind(this);
	this.handleCardToUpdate	= this.handleCardToUpdate.bind(this);

            var arg1 = '';
    this.state = {
    	lists:[]
    }
	}

	state = {
	    lists: [],
	  
	  }

	handleCardToUpdate(newCard){

	const newState = statess.map(list=>{

				if(list.id == newCard.c_title_id){
					
					return {
							...list,
							cards:[
									...list.cards,
										newCard
									]
							};	
				}else{

					return list;
				}
			});
console.log(newState);
statess = newState;
		       this.setState({lists:newState});

	
	}

	handleToUpdate(newTitle){
	
				const newState = [...statess,newTitle];
		       this.setState({lists:newState});
	
	}


	onDragEnd = result => {

		const { destination, source, draggableId} = result;

		if(!destination){
			return; 
		}
		if(destination.droppableId === source.droppableId){
			const newState = [...statess];
			
			const list = statess.find(list => source.droppableId == list.id);
			const card = list.cards.splice(source.index,1);
		
			list.cards.splice(destination.index,0,card[0])
		
			const listing = {
			      source: source.droppableId,
			      destination: destination.droppableId,
			      newlists:list,
			      user_id:1,
			      board_id:this.props.match.params['board_id']
			    };
			    if(destination.index !== source.index){
						axios.post(baseUrl+'updatelist',  listing)
					      .then(res => {
					    
					           console.log(res); 

					      }).then(response => { 
					});
		  }

		  }
		if(destination.droppableId !== source.droppableId){

			const newState = [...statess];
			
			const listStart = statess.find(list => source.droppableId == list.id);
			
			const card = listStart.cards.splice(source.index,1);
			const listEnd = statess.find(list => destination.droppableId == list.id);
		

			listEnd.cards.splice(destination.index,0,card[0]);


				const listing = {
				      source: source.droppableId,
				      destination: destination.droppableId,
				      newlists:listEnd,
				      user_id:1,
				      board_id:this.props.match.params['board_id']
				    };
			   
						axios.post(baseUrl+'updatelist',  listing)
					      .then(res => {
					    
					           console.log(res); 

					      }).then(response => { 
					});
		  

				return this.setState({ lists:newState });	
			}

	};


	   componentDidMount() {

		    axios.get(baseUrl+"cards/"+this.props.match.params.board_id+"/1")
		      .then(res => {
		      	 this.setState({ lists:res.data });
		      	 statess = this.state.lists;
		      	 localStorage.setItem('lists', state.lists);
		        return res.data;
		      });

		  }

	render(){
	var	handleToUpdate	=	this.props.handleToUpdate;
	if (localStorage.getItem('auth') === false) {
      	return <Redirect to={{ pathname: `/login` }} />;
    }else{

		  return (
				  
					    <div style={styles.container}>
					    	  	<UserNavBar/>
					    	  	<div className="row" style={{display: 'inline-flex',marginBottom:'14px'}}>
					    	  	<span style={styles.projectname}>{this.props.match.params['project_name']}</span>
					    	  	<Button style={styles.navbutton}><Icon>star</Icon></Button>  
					    	  	<span> <Button style={styles.navbutton}>Invite</Button>  </span>  
					    	  	<span> <Button style={styles.navbutton}>Private</Button>  </span> 
					    	  	<span> <Button style={styles.navbuttons}><Icon>peopleOutline</Icon><span>Team View</span></Button></span> 
					    	  	</div>	
					    	  	<div style={styles.mainContainer}>	
					    		<DragDropContext onDragEnd={this.onDragEnd}>
					        				<div style={styles.listConatiner}>
					        					{ this.state.lists.map((list,index) => (<TrelloList 
					        											index = {index}		
																		listID={list.id} 
																		key={list.id} 
																		title={list.title} 
																		cards={list.cards}
																		listing = {this.state.lists}
																		handleCardToUpdate = {this.handleCardToUpdate}
																	/>
																))}
					        						<TrelloActionButton list="list" listing={this.state.lists} handleToUpdate = {this.handleToUpdate}/>
					        				</div>
					      			</DragDropContext>
					      		</div>
					    </div>
				    
				  );

			}

		}	

	}

const mapStateToProps = state =>(console.log(state),{
	lists:state.lists
})

 const styles = {
 	container:{
 		backgroundColor:'#0079bf',
 		margin: '-6px 8px 0px -6px',
 		position: 'absolute',
    	minWidth: '-webkit-fill-available',
    	
    	maxWidth: '-webkit-fill-available',
     	maxHeight: '-webkit-fill-available',
 	},
 	listConatiner:{
 		display:'flex',
 		flexDirection:'row',
 		height:"fit-content",
 		
 	},
 	mainContainer:{
 		overflowX:"scroll",
 		height:"86vh",
 		marginLeft: '10px',
 		marginLeft:'10px'
 	},
 	navbutton:{
		zIndex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.24)',
		margin: '4px',
		color:'white',
		height: '36px',
    	marginTop: '23px',
    	marginLeft: '21px',

	},
	navbuttons:{
		zIndex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.24)',
		color:'white',
		height: '36px',
    	marginTop: '23px',
    	marginLeft: '21px',
    	position: 'absolute'
	},
	projectname:{
		fontFamily:'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
		marginLeft:"1%",
		color:"white",
		marginTop: '27px',
    	marginLeft: '15px',
    	fontSize: 'larger',
    	fontWeight: 'bold'
	}
 }

export default SubBoard;
