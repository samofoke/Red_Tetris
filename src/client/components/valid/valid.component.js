import React from 'react';

import classes from './valid.style.css';

const Valid = ( props ) => (
	props.show ? <div className={classes.valid} onClick={props.clicked}></div> : null
);

export default Valid;