import React from 'react'; 
import { createBrowserHistory } from "history";
import {  Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin";
import LoginClass from "views/LoginPage/LoginClass";
import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

function App() {

    const Page404 = ({ location }) => (
        <div>
        <h2>No match found for <code>{location.pathname}</code></h2>
        </div>
    );

    
    if(!localStorage.getItem("token")) {
        return <LoginClass  />
      }
      
    return (
        
        <div>
        <Router history={hist}>
            <Switch>

            <Route path="/admin" component={Admin} />
            <Route path="/" component={Admin} />

            <Route component={Page404} />
            </Switch> 
        </Router>
        </div>
        
    );
}

export default App;
