import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

import MyModal from "../Modal/MyModal";
import { ModalManager} from 'react-dynamic-modal';
import Axios from "axios";

const useStyles = makeStyles(styles);


const openModal = (question_id, otvorene) =>{
  //console.log("otvorene");
   //console.log(otvorene);
  let hlavicka=[];
  let QuestionParams=[];
  let Odpovede=[];

  // nacitanie hlavicky otazky name - wording
  Axios.get('http://localhost:4001/questions/get-question/' + question_id)
    .then(res => {
      hlavicka = res.data;
      //console.log("== hlavicka");
      //console.log(res.data)

      //ked sme nacitali hlavicku tak ideme dalej
      // nacitanie parametrov otazky accept_answ - secret
      Axios.get('http://localhost:4001/questions/getQuestionParams/' + question_id)
      .then(res => {
        QuestionParams = res.data;
        
        //console.log("prijimam odpovede?")
        //console.log(QuestionParams[0].accept_answ)
        //console.log(QuestionParams[0].accept_answ === 0);
        //console.log("==== big if")
        //console.log(QuestionParams[0].accept_answ )
        //console.log(otvorene)
        //console.log(QuestionParams[0].accept_answ === 1 && otvorene==='Áno')

        if(QuestionParams[0].accept_answ === 1 && otvorene==='Áno'){
          // nacitanie moznych odpovedi ak je mozne odpovedat
            Axios.get('http://localhost:4001/questions/getAnswers/' + question_id)
            .then(res => {
              Odpovede = res.data;
          ModalManager.open(<MyModal statsData="data" secret={QuestionParams[0].secret} otv={otvorene} otazka_id={question_id} hlavicka={hlavicka} odpovede={Odpovede} parametre={QuestionParams} onRequestClose={() => true}/>);
        
            })
            .catch(err => {
              if (err.response) {
                //TODO: show error response from server
                window.alert(err.response.data.message);
                
                console.log(err.response.data.message);
                //this.setState({...this.state,error: err.response.data.message})
              } else if (err.request) {
                //TODO: msg internet connection..
                window.alert("Internet connection failed.");
              } else {
                  //TODO: rly dont know what error can happend here but can happend :D
                  window.alert("Something went wrong.");
            }});
          }else{
            if(otvorene==='Nie'){
              //nacitame statisticke data!!!
              Axios.get('http://localhost:4001/questions/get-question-stats/' + question_id)
                .then(res => {
                  //Odpovede = res.data;
                  //potrebujeme kus spracovat data. 
                  let data={
                    labels:[],
                    series:[[]]
                  }
                  res.data.map((item)=>{
                    data.labels.push(item.answer);
                    data.series[0].push(item.count);

                  });

                  ModalManager.open(<MyModal statsData={data} secret={QuestionParams[0].secret} otv={otvorene} otazka_id={question_id} hlavicka={hlavicka} odpovede="" parametre="" onRequestClose={() => true}/>);
              
                })
                .catch(err => {
                  if (err.response) {
                    //TODO: show error response from server
                    window.alert(err.response.data.message);
                    
                    console.log(err.response.data.message);
                    //this.setState({...this.state,error: err.response.data.message})
                  } else if (err.request) {
                    //TODO: msg internet connection..
                    window.alert("Internet connection failed.");
                  } else {
                      //TODO: rly dont know what error can happend here but can happend :D
                      window.alert("Something went wrong.");
                }});
            }
          }


      })
      .catch(err => {
        if (err.response) {
          //TODO: show error response from server
          window.alert(err.response.data.message);
          
          console.log(err.response.data.message);
          //this.setState({...this.state,error: err.response.data.message})
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
        //this.setState({...this.state,error: err.response.data.message})
      } else if (err.request) {
        //TODO: msg internet connection..
        window.alert("Internet connection failed.");
      } else {
          //TODO: rly dont know what error can happend here but can happend :D
          window.alert("Something went wrong.");
    }});

    //console.log("QP "+QuestionParams.accept_answ)
    //console.log(QuestionParams.accept_answ === 0)
    



    
}

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{color: "#019ECE"}}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((propup, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                  
                    <TableCell className={classes.tableCell} >
                      {propup.name}
                    </TableCell>
                  

                <TableCell className={classes.tableCell} >
                <Button onClick={openModal.bind(this, propup.id_question,propup.otvorene)}>DETAIL</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
