import React,{Component} from 'react';
import MainNavBar from './MainNavBar';
import TrelloList from './TrelloList';
import {connect} from 'react-redux';
import TrelloActionButton from './TrelloActionButton';
import {DragDropContext} from'react-beautiful-dnd';
import {sort} from '../action'
class App extends Component {
	
	onDragEnd = result => {
		const { destination, source, draggableId} = result;

		if(!destination){
			return; 
		}

		this.props.dispatch(
			sort(
					source.droppableId,
					destination.droppableId,
					source.index,
					destination.index,
					draggableId

				)
			);
	};
	render(){
		const {lists} = this.props;
		let listHeight = lists ? "70px;" : "2px"; 
  return (
  	
    <div className="App" style={styles.container}>
    	<MainNavBar/>
    		
    		<DragDropContext onDragEnd={this.onDragEnd}>
      			
        			<h1>Trello</h1>

        				<div style={styles.listConatiner}>
        					{ lists.map(list => (<TrelloList 
        													
													listID={list.id} 
													key={list.id} 
													title={list.title} 
													cards={list.cards}
												/>
											))}
        						<TrelloActionButton list />
        				</div>
      			
      			</DragDropContext>
    		
    </div>
    
  );
}
}
const mapStateToProps = state =>({
	lists:state.lists
})

 const styles = {
 	container:{
 		backgroundColor:'#0079bf',
 		padding: '0 0 695px 9px',
 		margin: '-1%'
 	},
 	listConatiner:{
 		display:'flex',
 		flexDirection:'row',
 		height:"fit-content",
 		padding:'1%'
 	}
 }
export default connect(mapStateToProps)(App);
