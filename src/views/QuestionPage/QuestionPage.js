import React, {Component} from 'react';
import SubHeader from '../../../components/Navigation/Sub_header/Sub_header';
import ListComponentSimple from '../../components/ListComponent/ListComponent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";


class QuestionPage extends Component{
    constructor(props) {
        super(props);

        var actualVoting = JSON.parse(localStorage.getItem("votings"))[this.props.match.params.index];

        this.state = {
            purchaseable: false,
            voting: actualVoting
        }

    }

    render() {      
        return(
            <div>
                {console.log(this.state.voting)}
            </div>
        );
    }
}

export default withRouter(QuestionPage);