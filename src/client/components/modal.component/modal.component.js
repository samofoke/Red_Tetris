import React from 'react';
import Valid from '../valid/valid.component';
import styl from './modal.style.css';

const modal = ( props ) => {
	return (
		<div>
			<Valid show={props.show} clicked={props.modalClosed}/>
			<div
				className={styl.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}>
				{ props.children }
			</div>
		</div>
	);
}

export default modal;
