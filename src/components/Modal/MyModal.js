import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';
import SquareButton from '../CustomButtons/SquareButton';
import { makeStyles } from "@material-ui/core/styles";
import Aux from '../hoc/AuxComponent';
import ChartistGraph from "react-chartist";
import './Modal.css';
import Axios from 'axios';


// core components
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";


import {
   questionStatsParams
 } from "../../variables/charts";
 
const styles = {
   overlay: {
      position        : 'relative',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      zIndex          : 99999999,
      overflowY       : 'scroll',
      height          : '500px',
      backgroundColor : 'rgba(0, 0, 0, 0.3)'
    },
  
    content: {
      position                : 'relative',
      margin                  : '15% auto',
      width                   : '50%',
      border                  : '1px solid rgba(0, 0, 0, .2)',
      background              : '#fff',
      overflowY               : 'scroll',
      borderRadius            : '4px',
      outline                 : 'none',
      boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
      
    }
 };


class MyModal extends Component{
   constructor(props) {
      super(props);
  
      this.state = {
         statData:[[]],
        classes : makeStyles(styles),
        SetVoteParams:{
         answer_id:'',
         question_id:'',
         voting_id:'',
         user_id:''
       },
       SetMarkVotedParams:{
        question_id:'',
        user_id:''
      },
      }
    }
    

    handleClick=(answer_id,quest_id)=>{
      //onRequestClose
      console.log("CLICKED "+answer_id)

      let SetVoteParamsNew = { 
         answer_id:answer_id,
         question_id:quest_id,
         voting_id:2,
         user_id:parseInt(localStorage.getItem("token"),10)
        };
        let SetMarkVotedParamsNew = { 
         question_id:quest_id,
         user_id:parseInt(localStorage.getItem("token"),10)
        };
   
   
       console.log("updatneute data po clicknuti")
       console.log(SetVoteParamsNew);
       console.log(SetMarkVotedParamsNew);
       
       Axios.post('http://localhost:4001/voting/set-vote' , SetVoteParamsNew)
       .then(res => {
         console("SET VOTE DONE");
       //ak toto preslo ok tak ulozime este info ze uzivatel hlasoval
   
       Axios.post('http://localhost:4001/voting/set-mark-voted' , SetMarkVotedParamsNew)
       .then(res => {
         console("SET MARK VOTED DONE");
   
         window.location.reload(false);
   
       })
       .catch(err => {
         if (err.response) {
           //TODO: show error response from server
           window.alert(err.response.data.message);
           
           console.log(err.response.data.message);
           this.setState({...this.state,error: err.response.data.message})
         } else if (err.request) {
           //TODO: msg internet connection..
           window.alert("Internet connection failed.");
         } else {
             //TODO: rly dont know what error can happend here but can happend :D
             window.alert("Something went wrong.");
       }});
       })
       .catch(err => {
         if (err.response) {
           //TODO: show error response from server
           window.alert(err.response.data.message);
           
           console.log(err.response.data.message);
           this.setState({...this.state,error: err.response.data.message})
         } else if (err.request) {
           //TODO: msg internet connection..
           window.alert("Internet connection failed.");
         } else {
             //TODO: rly dont know what error can happend here but can happend :D
             window.alert("Something went wrong.");
       }});
       
    }

   render(){
      const { statsData,otv,otazka_id,hlavicka,odpovede,parametre, onRequestClose } = this.props;
      //console.log(hlavicka[0].name)
      //console.log(odpovede)
      //console.log(parametre)
      //console.log("------ stats data in modal")
      //console.log(statsData);
           
      if(otv==='Áno'){

         return (
            <Modal
               onRequestClose={onRequestClose}
               effect={Effect.SlideFromBottom}
               className={this.state.classes.content,this.state.classes.overlay}
               >
                  <h3 className='h3-custom'>{ hlavicka[0].name } </h3>
                  <p className='h5-custom'>{ hlavicka[0].wording } </p>

               {odpovede.map((item,index)=>{
                  return <SquareButton key={index} clicked={() => this.handleClick(item.id_answer,otazka_id)}>{item.answer } </SquareButton>
               }
               )} 
            </Modal>
         );
      }else{
         return(
            <Modal
               onRequestClose={onRequestClose}
               effect={Effect.SlideFromBottom}
               className={this.state.classes.content,this.state.classes.overlay}
               >
                  <h3 className='h3-custom'>{ hlavicka[0].name } </h3>
                  <p className='h5-custom'>{ hlavicka[0].wording } </p>

                  <Card chart>
                     <CardHeader color="warning">
                     <ChartistGraph
                        className="ct-chart"
                        data={statsData}
                        type="Bar"
                        options={questionStatsParams.options}
                        responsiveOptions={questionStatsParams.responsiveOptions}
                        listener={questionStatsParams.animation}
                     />
                     </CardHeader>
                  </Card>

            </Modal>
         )
      }
               
   }
}

export default MyModal;