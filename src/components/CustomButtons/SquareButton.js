import React from 'react';
import './SquareButton.css';

const SquareButton = (props) => (
    <button className='SquareButton ' onClick={props.clicked} >
        {props.children}
    </button>
)

export default SquareButton;

