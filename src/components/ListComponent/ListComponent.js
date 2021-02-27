import React from 'react';
import './ListComponent.css';
import ListItem from './ListItem/ListItem';
import { Link } from "react-router-dom";

const listComponent = (props) => {
    //...

    return(
        <div className='listComponent'>
             {props.votings !== undefined && props.votings !== null ? props.votings.map((item,index)=>{
                return <Link key={index} to="" onClick={props.clickfunction}> <ListItem key={item[0] + index} >{ item[0] + "  " +item[1] } </ListItem></Link>
            }) :  ''}
        </div>
    );
}
export default listComponent;