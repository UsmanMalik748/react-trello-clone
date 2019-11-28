import React,{Component} from 'react';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-autosize-textarea';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addList,addCard } from '../action'

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
		const {dispatch} = this.props;
		const {text} = this.state;

		if(text){
			dispatch(addList(text));
		}

		return;
	}

	handleAddCard = () => {
		const {dispatch,listID} = this.props;
		const {text} = this.state;

		if(text){
			dispatch(addCard(listID,text));
		}

		return;	
	}

	renderAddButton = () => {
		const {list} = this.props;
		const buttonText = list ? "Add another list" : "Add another card";
		const buttonTextColor = list ? "white" : "inherit";
		const buttonBackground = list ? "hsla(0,0%,100%,.24)" : "inherit";
		const buttonTextOpacity = list ? 1 : 0.5;
		
		return (
				<div
				onClick={this.openForm} 
				style={{
					...styles.addButton,
					opacity:buttonTextOpacity,
					color:buttonTextColor,
					backgroundColor:buttonBackground,
					height:"fit-content",
					maxWidth: "264px"
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
		const cardPlaceHolder = list ? "Enter a title for this card… " : "Enter list title..." ;
		const cardButtonTitle = list ? "Add title" : "Add card" ;
		
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
				    	onMouseDown={list ? this.handleAddList : this.handleAddCard} 
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

export default connect()(TrelloActionButton);