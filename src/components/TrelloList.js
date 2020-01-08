import React from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import {Droppable} from 'react-beautiful-dnd'
const TrelloList = ({ title,cards,listID,index,listing,handleCardToUpdate }) => {

	return(
		
		<Droppable droppableId={String(listID)} index={index} key={listID}>
		{provided =>(
		<div style={styles.containers} index={index}>
		<h3 style={styles.titles}>{title}</h3>
			
				<div {...provided.droppableProps} ref={provided.innerRef} style={styles.container} index={index} style={styles.cardslist}>
						{cards.map((card,index) => (
							<TrelloCard key={card.card_id} text={card.text} id={card.card_id} index={index}/>
							))}
					
				</div>
					<TrelloActionButton listID={listID} listing={listing} handleCardToUpdate={handleCardToUpdate}/>
					{provided.placeholder}
		</div>
					)}
		</Droppable>
		
		);
}

const styles = {
	containers:{
		backgroundColor:'#ebecf0',
		width :'300px',
		minWidth:'300px',
		borderRadius: 3,
		marginRight:'8px',
		height: 'fit-content',
    	maxHeight: '-webkit-fill-available',
    	overflowY: 'auto',
		
	},
	titles:{
		padding:'0px 0 0 16px'
	},
	cardslist:{
		maxHeight: '60vh',		
    	overflowY: 'auto',
    	
	}
}
export default TrelloList;

