import {CONSTANTS} from '../action';

let listID = 3;
let cardID = 7;


const initialState = [
		{
			title:'Last Episode',
			id:'list-${0}',
			cards:[
				{
					id:'card-${1}',
					text:'We created a static list and static cards'

				},
				{
					id:'card-${2}',
					text:'We created a second static list and second static cards'

				},
				{
					id:'card-${3}',
					text:'We created a third static list and third static cards'

				}
			]
		},
		{
			title:'New Last Episode',
			id:'list-${1}',
			cards:[
				{
					id:'card-${4}',
					text:'New We created a static list and static cards'

				},
				{
					id:'card-${5}',
					text:'New We created a second static list and second static cards'

				},
				{
					id:'card-${6}',
					text:'New We created a third static list and third static cards'

				}
			]
		}
];

const listsReducer = (state=initialState,action)=>{
	switch(action.type){
		case CONSTANTS.ADD_LIST:
			const newList = {
				title : action.payload,
				cards : [],
				id : 'list-${listID}', 
			};

			listID += 1;

			return [...state,newList];
		
		case CONSTANTS.ADD_CARD:{
			const newCard = {
				text : action.payload.text,
				id : 'card-${cardID}', 
			};
			cardID += 1;
			const newState = state.map(list=>{

				if(list.id === action.payload.listID){
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
			return newState;
		}
		case CONSTANTS.DRAG_HAPPENED:
		
		const {
			droppableIdStart,
			droppableIdEnd,
			droppableIndexStart,
			droppableIndexEnd,
			deaggableId
		}	= action.payload;

		const newState = [...state];

		if(droppableIdStart === droppableIdEnd){
			const list = state.find(list => droppableIdStart === list.id);
			const card = list.cards.splice(droppableIndexStart,1);
			list.cards.splice(droppableIndexEnd,0,...card)
		}

		if(droppableIdStart !== droppableIdEnd){
			const listStart = state.find(list => droppableIdStart === list.id);
			const card = listStart.cards.splice(droppableIndexStart,1);
			const listEnd = state.find(list => droppableIdEnd === list.id);
			console.log(listEnd);
			listEnd.cards.splice(droppableIndexEnd,0,...card);
		}
		return newState
	

		default:
			return state;
	}
};

export default listsReducer;