import React from 'react'; 

import { createBrowserHistory } from "history";
import {  Router, Route, Switch } from "react-router-dom";

import useToken from './components/App/useToken';
// core components
import Admin from "layouts/Admin";
import Login from "views/LoginPage/LoginClass";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();



function App() {
    const { token, setToken } = useToken();
    //const token = getToken();
    //const [token, setToken] = useState();

    const Page404 = ({ location }) => (
        <div>
        <h2>No match found for <code>{location.pathname}</code></h2>
        </div>
    );

    
    if(!token) {
        return <Login setToken={setToken} />
      }
      
    return (
        
        <div>
        <Router history={hist}>
            <Switch>

            <Route path="/" component={Admin} />
            <Route path="/admin" component={Admin} />

            <Route component={Page404} />
            </Switch> 
        </Router>

        
        </div>
        
    );
}

export default App;
