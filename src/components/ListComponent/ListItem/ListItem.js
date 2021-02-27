import React from 'react';
import './ListItem.css';

const listItem = (props) => (
    <div className='ListItem list-group-item list-group-item-action'>
        {props.children}
    </div>
)

export default listItem;