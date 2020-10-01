import React from 'react';
import bd from './Board.style.css';
import tetrocolors from '../tetrocolors/tetrocolor.style.css';

const board = ( props ) => {
	let content = <div>EMPTY BOARD</div>;

	let cellClasses = [];
	cellClasses.push(tetrocolors.cell);

	if (props.gameState && props.gameState.cells != undefined) {
		content = props.gameState.cells.map( (row, rIndex) => {

			let line = row.map( (cell, cIndex) => {
				let classes = [...cellClasses];
				classes.push(tetrocolors[cell]);
				classes = classes.join(' ');
				return <div key={(rIndex + 1) * (cIndex + 1)} className={classes}></div>;
			});
			line = <div key={rIndex} className={bd.row}>{line}</div>
			return line;
		})
	}

	return (
		<div className={bd.Board}>
			{content}
		</div>
	);
}

export default board
