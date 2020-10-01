import React from 'react';
//import socket from '../../socket';
import st from './button.style.css';

const Button = ( props ) => {
	return (
        <input 
            type="button"
            className={st.button}
            onClick={props.onClick}
            value={props.value}
        />
	);
}

export default Button;