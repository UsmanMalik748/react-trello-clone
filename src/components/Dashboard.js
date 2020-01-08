import React,{Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import  {Redirect} from 'react-router-dom';
import TrelloActionButton from './TrelloActionButton';
import {
  Link,Route
} from "react-router-dom";

import SubBoard from './SubBoard';
import UserNavBar from './UserNavBar';

let baseUrl = "http://localhost:8000/api/";
const classes = {
  card: {
    minWidth: 275,
    margin:2,
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
  sideNav:{
    float: 'right',
    paddingRight: '10%',
    marginTop: '14%',
    listStyle: 'none'
  },
  sideList:{
        paddingTop: '23%'
  },
  cardBaords:{
    margin:"1% 2% 0% 1%",
    minWidth: '27%',
    display: "inline-block"
  }
};
class Dashboard extends Component {
  state = {
    boards: [],
    Redirect:localStorage.getItem('auth')
  }

   componentDidMount() {

    if(localStorage.getItem('auth')){

      axios.get(baseUrl+"boards")
        .then(res => {
          const boards = res.data;
          this.setState({ boards });
      }); 

    }else{   
         this.props.history.push('/login');
      }
    
      console.log("Dashboard localstorage",localStorage.getItem('auth'));
  }
  render(){
    if(localStorage.getItem('auth') === false) {
      return <Redirect to={{ pathname: `/login` }} />;
    }
    return (
    <div style={styles.container}>
    <UserNavBar/>
        <Container xs="12" style={{display: 'inline-flex',flexGrow: "1"}}>
           
          <Grid item   xs="4">
            <ul style={classes.sideNav}>
              <li style={classes.sideList}>Home</li>
              <li style={classes.sideList}>Boards</li>
            </ul>
          </Grid >
          <Grid item  xs="8" style={{marginTop:"8%"}}>
            {this.state.boards.map(board =>
              <div  style={classes.cardBaords} key={board.board_id}>
              <Link to={'/subboard/'+board.board_id+'/'+board.project_name}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <b>{board.project_name}</b>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card> 
              </Link>
              </div>
          )} 
          <div style={classes.cardBaords}>
          <TrelloActionButton list="board"  />
          </div>
          </Grid >       
        </Container>

              <Route  path="/subboard/:board_id/:project_name" component={SubBoard}/>
        </div>
    );
  }
}
 const styles = {
  container:{
    padding: '0 0 695px 0px',
    margin: '-1%'
  },
  listConatiner:{
    display:'flex',
    flexDirection:'row',
    height:"fit-content",
    padding:'1%'
  }
 }
export default Dashboard;
