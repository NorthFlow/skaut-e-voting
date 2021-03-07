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

class  TableListClassMalySnem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes : makeStyles(styles),
      Votings : [[]],
      Questions: [[]],
      QandA : [[]],
      value: 'select',
      TableParams:{
        voting_id:'',
        user_id:''
      },
      SelectedVoting: '999999'
    };
  }

  componentDidMount() {
    this.loadDataAfterSuccessLogin();
  }

  loadDataAfterSuccessLogin = () => {
    this.loadInitQuestionsData(1,parseInt(localStorage.getItem("token"),10));
  }

  loadInitQuestionsData =(id_voting,id_user) =>{
    let TableParamsNew = { 
      voting_id:id_voting,
      user_id:id_user
     };
    this.setState({
      TableParams: TableParamsNew,
    });

    //Ako krok cislo jedna si nacitame otazky votingu na pozicii 0
    Axios.post('http://localhost:4001/questions/get-voting-questions' , TableParamsNew)
    .then(res => {
      this.setState({
        Questions: res.data,
    })
    //console.log("questions")
    //console.log(res.data)

    this.setState({
      SelectedVoting: id_voting,
    });
    this.forceUpdate();

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
          <CardHeader style={{background: "#019ECE", color: "white"}}>
            <h4 className={this.state.classes.cardTitleWhite}>Hlasovanie malý snem 2021</h4>
            <p className={this.state.classes.cardCategoryWhite}>
              V tejto tabuľké nájdete konkrétne hlasovania nastavené pre Malý snem SLSK 2021.
            </p>
          </CardHeader>
          <CardBody>
          <Table
              tableHeaderColor="primary"
              tableHead={["Krátky popis", ""]}
              tableData= {this.state.Questions}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
  
}


export default TableListClassMalySnem;