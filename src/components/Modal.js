import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import LinearProgress from '@material-ui/core/LinearProgress';
const Modal = ({ isShowing, hide,addChecklist,addcheckbox,handleChange  }) => isShowing ? ReactDOM.createPortal(


  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <div style={{display:"flex",width:"98%"}}> 
        				<Icon style={{float:'left',paddingTop:"18px"}}>reorder</Icon> 			
        				<h4 style={{marginLeft:"2%"}}>Todo</h4>
        </div>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
        <div className="row">
        	<div className="col-md-12" style={{display: 'inline-flex'}}>
        	
        	<div className="col-md-8" style={{marginRight: "8%"}}>
        		<div>
        			<div>
        				<label style={{display:"flex",marginBottom:"3%"}}>
	        				<Icon style={{float:'left'}}>subject</Icon><div style={{padding:'1%'}}>Description</div>
        				</label>  			
        				<textarea className="modaldesc"></textarea>
        			</div>
        			<div>
        				 
        				<div > 
	        				<label style={{display:"block",marginBottom:"3%"}}>
	        					<Icon style={{float:'left'}}>checkbox</Icon><div style={{padding:'1%'}}>Check List</div>
	        				</label>
	        				<div>
	        				<span>1/2 </span>
	        				<div style={{marginBottom:'8%'}}><LinearProgress
						        variant="determinate"
						        color="primary"
						        value={50}
						        margin="5% 26px"
						        size={24}
						        label = "1/2"
						     />
						     </div>
	        				
						     </div>
        					<form>	
        					<div style={{display:"flex"}}>		
        					<Checkbox
						        value="secondary"
						        color="primary"
						        inputProps={{ 'aria-label': 'secondary checkbox' }}
						      />
						      <textarea className="modaldesc" style={{marginLeft:"1%",width: '312px'}}></textarea>
						      </div>
        					</form>
        				</div>
        				<div>
        					<button className="modalButton" onClick={addcheckbox} style={{marginLeft:"7%"}}>Add Items</button>
        				</div>
        			</div>

        			<div style={{marginTop:"2%"}}>
        				<label style={{display:"flex",marginBottom:"3%"}}>
        					<Icon style={{float:'left'}}>toc</Icon><div style={{padding:'1%'}}>Activity</div>
        				</label>
        				<div style={{display:"flex"}}> 
        				<Icon style={{float:'left',paddingTop:"2%"}}>account_circle</Icon> 			
        				<textarea className="modaldesc" style={{marginLeft:"1%"}}></textarea>
        				</div>
        			</div>

        		</div>

        	</div>
        	<div className="col-md-4" style={{display: 'inline-grid'}}>
        		<label>Suggest</label>
        		<button className="modalButton"><Icon style={{float:'left'}}>people</Icon><div style={{padding:'4%'}}>Join</div></button>

        		<a className="offset-2" style={{margin:'5% 17%'}}>Feedback</a>
        		<label style={{margin:"8% 0"}}>Add to card</label>
        		<button className="modalButton"><Icon style={{float:'left'}}>people</Icon><div style={{padding:'4%'}}>Members</div></button>
        		<button className="modalButton"><Icon style={{float:'left'}}>label</Icon><div style={{padding:'4%'}}>Label</div></button>
        		<button className="modalButton" onClick={addChecklist}><Icon style={{float:'left'}}>checkbox</Icon><div style={{padding:'4%'}}>Checklist</div></button>
        		<button className="modalButton" style={{display:"inline-block"}}><Icon style={{float:'left'}}>event</Icon><div style={{padding:'4%'}}>Due Date</div></button>
        		<button className="modalButton"><Icon style={{float:'left'}}>attachment</Icon><div style={{padding:'4%'}}>Attachment</div></button>
        		<button className="modalButton"><Icon style={{float:'left'}}>payment</Icon><div style={{padding:'4%'}}>Card</div></button>
        		



        	</div>

        	</div>

        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;