import React from 'react';
import './SquareButton.css';
import Button from "@material-ui/core/Button";

const SquareButton = (props) => (
    <button className='SquareButton '>
        {props.children}
    </button>
)

export default SquareButton;

