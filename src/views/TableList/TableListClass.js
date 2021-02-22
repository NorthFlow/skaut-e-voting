import React, {Component} from "react";
import Axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

//const useStyles = makeStyles(styles);



class  TableListClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes : makeStyles(styles),
      DataForTable : [[]]
    }
  }
  componentDidMount() {
    this.loadDataAfterSuccessLogin();
  }

  loadDataAfterSuccessLogin = () => {
    //console.log("SPUSTAM NACITAVANIE");
    //LOAD poistovne
    Axios.get('http://localhost:4001/voting/questions')
    .then(res => {
      let tmpArray = [[]];
      for(var i=0; i< res.data.length; i++){
        var dataPom = [JSON.stringify(res.data[i].id_question), res.data[i].wording, JSON.stringify(res.data[i].id_voting)];
        tmpArray.push(dataPom);
      }

      this.setState({
        DataForTable: tmpArray
    })

    let datas = this.state.DataForTable.filter((e, i) => i !== 0);
    this.setState({ DataForTable : datas });

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
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary">
            <h4 className={this.state.classes.cardTitleWhite}>Hlasovanie malý snem 2021</h4>
            <p className={this.state.classes.cardCategoryWhite}>
              V tejto tabuľké nájdete konkrétne body hlasovania nastavené pre Malý snem SLSK 2021.
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Číslo", "Krátky popis", "Id_voting"]}
              tableData= {this.state.DataForTable}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
  
}


export default TableListClass;