import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from 'react-beautiful-dnd';
import Modal from "./Modal";
import useModal from './useModal';
const TrelloCard = ( {text,id,index} ) => {


  function handlemodel (){
    alert("click");
  }

	const classes = useStyles();
 const card = "card-";
  const {isShowing, toggle,addChecklist} = useModal();
	return (
    <Draggable draggableId={String(id)} index={index} key={String(id)}>
      {provided =>(
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
		   <Card className={classes.card} key={String(id)} index={index} onClick={toggle}>
		      <CardContent>
		        <Typography className={classes.title} color="textSecondary" gutterBottom>
		          {text}
		        </Typography>
		      </CardContent>
		    </Card>
         <Modal
        isShowing={isShowing}
        hide={toggle}
        addChecklist={addChecklist}
      />
        </div>
        )}
      </Draggable>
		);
}

const useStyles = makeStyles({
  card: {
    minWidth: 258,
    margin:'8px',

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default TrelloCard;