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

const openModal = (voting_id) =>{

  console.log("ID V MODAL :   " + voting_id);

  //q-a-count
  /*
  let counts=[[]];
  Axios.get('http://localhost:4001/questions/q-a-count/' + voting_id)
    .then(res => {
      counts = res.data;
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
    }});*/


  //urobime loop nad datami
  //let datas = this.state.Votings;
  // ----- nacitanie otazok k votingom.
/*
  Axios.get('http://localhost:4001/questions/qawording/' + voting_id)
    .then(res => {
      let datas = [[]];
      datas=res.data;
      
      ModalManager.open(<MyModal params={datas} acount={counts} onRequestClose={() => true}/>);
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
    }});*/

  
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
                <Button onClick={openModal.bind(this, propup.id_question)}>DETAIL</Button>
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
