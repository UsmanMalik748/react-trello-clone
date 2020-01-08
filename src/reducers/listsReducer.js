import {CONSTANTS} from '../actions';

let listID = 3;
let cardID = 7;


const initialState = [];

const listsReducer = (state=initialState,action='ADD_LIST')=>{
	switch(action.type){
		case CONSTANTS.ADD_LIST:
			const newList = {
				title : action.payload,
				cards : [],
			};

			listID += 1;

			return [...state,newList];
		
		case CONSTANTS.ADD_CARD:{
			console.log("here we are going");
			const newCard = {
				text : action.payload.text,
			};
			console.log(newCard);
			console.log("after card");
			console.log(state);
			cardID += 1;
			const newState = state.map(list=>{

				if(list.id === action.payload.listID){
					console.log("sadasd"+list.id);
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
			return newState;
		}
		case CONSTANTS.DRAG_HAPPENED:
		
		const {
			droppableIdStart,
			droppableIdEnd,
			droppableIndexStart,
			droppableIndexEnd,
			draggableId
		}	= action.payload;

		const newState = [...state];
console.log("droppableIdStart"+droppableIdStart);
console.log("droppableIdEnd"+droppableIdEnd);

		if(droppableIdStart === droppableIdEnd){
			const list = state.find(list => droppableIdStart === list.id);
			const card = list.cards.splice(droppableIndexStart,1);
			list.cards.splice(droppableIndexEnd,0,...list)
		}

		if(droppableIdStart !== droppableIdEnd){
			const listStart = state.find(list => droppableIdStart === list.id);
			console.log("listStart"+listStart);
			const card = listStart.cards.splice(droppableIndexStart,1);
			const listEnd = state.find(list => droppableIdEnd === list.id);
			console.log("drag list end"+listEnd);
			listEnd.cards.splice(droppableIndexEnd,0,...listStart);
		}
		return newState
	

		default:
			return state;
	}
};

export default listsReducer;