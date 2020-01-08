import React,{Component} from 'react';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-autosize-textarea';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addList,addCard,createBoard } from '../actions';
import axios from 'axios';
let baseUrl = "http://localhost:8000/api/";
class TrelloActionButton extends Component{
	
	state = {
		formOpen:false
	};

	openForm = () => {
		this.setState({
			formOpen:true,
			text : ''
		});
	}

	closeForm = e => {
		this.setState({
			formOpen:false
		});
	}
	handleInputChange = e => {
		this.setState({
			text : e.target.value
		});
	}

	handleAddList = () =>{
		const {dispatch,handleToUpdate} = this.props;
		const {text} = this.state;

		if(text){

			const data = {
				title:text,
				user_id:1,
				board_id:1
			}
			axios.post(baseUrl+'addNewTitle',  data)
				      .then(res => {
				    		console.log(res.data);
				    		handleToUpdate(res.data["data"]);
				      }).catch(error=>{
				      	console.log("erorrs"+error);
				      });
				      
			//dispatch(addList(text));
		}

		return;
	}

	handleAddCard = () => {
		const {dispatch,listID,listing,handleCardToUpdate} = this.props;
		const {text} = this.state;

		if(text){
			const data = {
				description:text,
				user_id:1,
				title_id:listID
			}

			
			axios.post(baseUrl+'addNewCard',  data)
				      .then(res => {
				    		//console.log(res.data["cards"]);
				    		handleCardToUpdate(res.data["cards"]);
				      }).catch(error=>{
				      	console.log("erorrs"+error);
				      });
			

			//dispatch(addCard(listID,text));
		}

		return;	
	}

	handleCreateBoard = () =>{
		const {dispatch,handleToUpdate} = this.props;
		const {text} = this.state;
console.log("here"+text);
		if(text){
			const data = {
				project_name:text,
				user_id:1
			}
			{/*axios.post(baseUrl+'addNewBoard',  data)
				      .then(res => {
				    		console.log("board res"+res);
				      }).catch(error=>{
				      	console.log("erorrs"+error);
				      });*/}
				      
				      handleToUpdate();

		}

		return;
	}

	renderAddButton = () => {
		const {list} = this.props;
		const buttonText = (list === "list") ? "Add another list" : (list === "board") ? "Create new board" : "Add another card";
		const buttonTextColor = (list === "list") ? "white" : (list === "board") ? "inherit"  : "inherit";
		const buttonBackground = (list === "list") ? "hsla(0,0%,100%,.24)" : (list === "board") ? "inherit" : "inherit";
		const buttonTextOpacity = (list === "list" || list === "board") ? 1 : 0.5;
		
		return (
				<div
				onClick={this.openForm} 
				style={{
					...styles.addButton,
					opacity:buttonTextOpacity,
					color:buttonTextColor,
					backgroundColor:buttonBackground,
					height:"fit-content",
					maxWidth: "264px",
					minWidth: "264px"
				}}>
					<Icon 
						style={{
							padding: '13px 0'
						}}
					>
					add
					</Icon>
					<p>{buttonText}</p>
				</div>
			); 	
	};



	renderForm = () => {
		const {list} = this.props ;
		const cardPlaceHolder = (list === "list") ? "Enter a title for this card… " : (list === "board") ? "Create new board"  : "Enter list title..." ;
		const cardButtonTitle = (list === "list") ? "Add title" : (list === "board") ? "Create board" : "Add card" ;
		
		return <div style={{
			    		width: '282px',
    					backgroundColor:"#ebecf0",
    					height:"fit-content",
    					borderRadius: 3 ,
    					padding: "8px"
					}}>
					<Card style={{
						minWidth:"282px",
						height:"100px"
					}}>
						<Textarea 
							placeholder = {cardPlaceHolder}
							autoFocus
							onBlur = {this.closeForm}
							value = {this.state.text}
							onChange = {this.handleInputChange}
							style={{
								overFlow:"hidden",
								resize:"none",
								width:"100%",
								border:"none",
								outline:"none",
								padding:"10px"
							}}
						/>
				    </Card>
				    <div style={styles.formbutton}>
				    <Button 
				    	onMouseDown={(list === "list") ? this.handleAddList : (list === "board") ?  this.handleCreateBoard : this.handleAddCard} 
				    	varient="contained" 
				    	style={{color:"white",backgroundColor:"#5aac44"}}
				    >
				    	{cardButtonTitle}
				    </Button>
				    <Icon style={{marginLeft:"8px", cursor:"pointer"}}>close</Icon>
				    </div>
			    </div>
			    ;
	}


	render(){

		return this.state.formOpen ? this.renderForm() : this.renderAddButton();
	}

}

const styles = {
	addButton:{
		borderRadius: '3px',
    	flexGrow: 1,
    	margin: '2px 0 8px 8px',
    	padding: '4px 8px',
    	display: 'flex',
    	cursor: 'pointer'	
    },
    formbutton:{
    	display:"flex",
    	marginTop: 8,
    	alignItema:"center"
    }
}

export default TrelloActionButton;