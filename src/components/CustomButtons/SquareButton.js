import React from 'react';
import './SquareButton.css';

const SquareButton = (props) => (
    <button className='SquareButton '>
        {props.children}
    </button>
)

export default SquareButton;

