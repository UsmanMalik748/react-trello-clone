import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import {Droppable} from 'react-beautiful-dnd'
const TrelloList = ({ title,cards,listID }) => {
	return(
		<Droppable droppableId={String(listID)}>
			{provided =>(
				<div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
					<h3 style={styles.titles}>{title}</h3>
						{cards.map((card,index) => (<TrelloCard key={card.id} text={card.text} id={card.id} index={index}/>))}
					<TrelloActionButton listID={listID} />
					{provided.placeholder}
				</div>
					)}
		</Droppable>
		);
}

const styles = {
	container:{
		backgroundColor:'#ebecf0',
		width :'300px',
		borderRadius: 3,
		marginRight:'8px',
		height: 'fit-content'
	},
	titles:{
		padding:'0px 0 0 16px'
	}
}
export default TrelloList;

