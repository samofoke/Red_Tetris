import React from 'react';
//import socket from '../../socket';
import button from './button.style.css';

const Button = (props) => {
    return (
        <button
            className={button.tetro}
            onClick={props.onClick}
        >
        BUTTON
        </button>
    );
}

export default Button;