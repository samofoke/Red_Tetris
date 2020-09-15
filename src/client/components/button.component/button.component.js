import React from 'react';
import button from './button.style.css';

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
        >
        </button>
    );
}

export default Button;