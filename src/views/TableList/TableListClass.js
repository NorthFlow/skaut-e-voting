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


import MyModal from "../../components/Modal/MyModal";
import { ModalManager} from 'react-dynamic-modal';
import  Combobox  from 'react-responsive-combo-box';

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

class  TableListClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes : makeStyles(styles),
      Votings : [[]],
      Questions: [[]],
      QandA : [[]],
      TableParams:{
        voting_id:'',
        user_id:''
      }
    }
  }

  componentDidMount() {
    this.loadDataAfterSuccessLogin();
  }

  openModal =(voting_id) =>{
    //this.loadQuestionAnswerData(voting_id);
    //ModalManager.open(<MyModal params={this.state.QandA} onRequestClose={() => true}/>);
 }

  loadDataAfterSuccessLogin = () => {
    //Ako krok cislo jedna si nacitame dostupne votingy pre prihlaseneho uzivatela
    Axios.get('http://localhost:4001/voting/available-votings/' + localStorage.getItem("token"))
    .then(res => {
      this.setState({
        Votings: res.data
    })
    this.loadInitQuestionsData(this.state.Votings[0].id_voting,parseInt(localStorage.getItem("token"),10));

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

  loadInitQuestionsData =(id_voting,id_user) =>{
    let TableParamsNew = { 
      voting_id:id_voting,
      user_id:id_user
     };

    this.setState({
      TableParams: TableParamsNew
    });
    console.log("----------- tableparams");
    console.log(this.state.TableParams);

    //Ako krok cislo dva si nacitame otazky votingu na pozicii 0
    Axios.post('http://localhost:4001/questions/get-voting-questions' , this.state.TableParams)
    .then(res => {
      this.setState({
        Questions: res.data,
    })
    console.log("----- QUESTIONS");
    console.log(res.data);

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

  handleFormChange = event => {

    
};

  loadQuestionAnswerData = (voting_id) =>{
    // ----- nacitanie otazok k votingom.
    Axios.get('http://localhost:4001/questions/qawording/' + voting_id)
    .then(res => {
      //console.log("in then");
      let tmpArray = [[]];
      for(var i=0; i< res.data.length; i++){
        var dataPom = [JSON.stringify(res.data[i].question), JSON.stringify(res.data[i].wording),JSON.stringify(res.data[i].id_answer), JSON.stringify(res.data[i].answer)];
        //console.log("riadok> "+dataPom);
        tmpArray.push(dataPom);
      }
      console.log(tmpArray)
      this.setState({
        QandA: tmpArray
    })

    //console.log(this.state.QandA)

    let datas = this.state.QandA.filter((e, i) => i !== 0);
    this.setState({ QandA : datas });
    
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

        
        <select value={this.state.Votings} className="form-control"  id="selectMenu" onChange={this.handleFormChange} >
          {this.state.Votings.map((item)=>{
                  return <option key={item.id_voting} value={item.id_voting}>{item.name}</option>
              }) }
          </select>

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


export default TableListClass;