import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';
import SquareButton from '../CustomButtons/SquareButton';
import { makeStyles } from "@material-ui/core/styles";
import ChartistGraph from "react-chartist";
import './Modal.css';
import Axios from 'axios';

// core components
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader.js";

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
    

    handleClick=(answer_id,quest_id,is_secret)=>{
      //onRequestClose
      //console.log("CLICKED "+answer_id)

      //pouzijeme ak je volba NEtajna
      let SetVoteParamsNew = { 
         answer_id:answer_id,
         question_id:quest_id,
         user_id:parseInt(localStorage.getItem("token"),10)
        };
        let SetMarkVotedParamsNew = { 
         user_id:parseInt(localStorage.getItem("token"),10),
         question_id:quest_id
        };
      //pouzijeme ak je volba TAJNA
      let SetVoteParamsNew_tajna = { 
         answer_id:answer_id,
         question_id:quest_id,
         user_id:null
         };
         //console.log("is secret:"+is_secret)

         if(is_secret===1){
            console.log(SetVoteParamsNew_tajna)

            Axios.post('/voting/set-vote' , SetVoteParamsNew_tajna)
            .then(res => {
               console.log("SET VOTE DONE");
               //console.log(res.results)
            //ak toto preslo ok tak ulozime este info ze uzivatel hlasoval
         
            Axios.post('/voting/set-mark-voted' , SetMarkVotedParamsNew)
            .then(res => {
               console.log("SET MARK VOTED DONE");
               console.log(res.results)
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
               //console.log("internte connection failed");
               } else {
                  //TODO: rly dont know what error can happend here but can happend :D
                  window.alert("Something went wrong.");
                  //console.log("something went wrong?!");
            }});
            
         }else{
            console.log(SetVoteParamsNew)
            Axios.post('/voting/set-vote' , SetVoteParamsNew)
            .then(res => {
               //console.log("SET VOTE DONE");
               console.log(res.results)
            //ak toto preslo ok tak ulozime este info ze uzivatel hlasoval
         
            Axios.post('/voting/set-mark-voted' , SetMarkVotedParamsNew)
            .then(res => {
               //console.log("SET MARK VOTED DONE");
               console.log(res.results)
         
               window.location.reload(false);
         
            })
            .catch(err => {
               if (err.response) {
               //TODO: show error response from server
               window.alert(err.response.data.message);
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
       
         
    }

   render(){
      const { statsData,secret,otv,otazka_id,hlavicka,odpovede,parametre, onRequestClose } = this.props;
      //console.log(hlavicka[0].name)
      //console.log(" /// odpovede")
      //console.log(odpovede)
      //console.log(parametre)
      //console.log("------ stats data in modal")
      //console.log(statsData);
      //console.log("otvorene: "+otv)
           
      if(otv==='Áno'){

         return (
            <div style={{textAlign: 'center'}}>
               <Modal
               onRequestClose={onRequestClose}
               effect={Effect.SlideFromBottom}
               >
                     <h3 className='h3-custom'>{ hlavicka[0].name } </h3>
                     <p className='h5-custom'>{ hlavicka[0].wording } </p>

                     <div style={{paddingBottom: '40px'}}>
                     {odpovede.map((item,index)=>{
                        return <SquareButton key={index} clicked={() => this.handleClick(item.id_answer,otazka_id,secret)}>{item.answer } </SquareButton>
                     }
                     )}
                     </div>
                  
               </Modal>
            </div>

            
         );
      }else{
         return(
            <div style={{textAlign: 'center'}}>
               <Modal
               onRequestClose={onRequestClose}
               effect={Effect.SlideFromBottom}
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
            </div>
            
         )
      }
               
   }
}

export default MyModal;