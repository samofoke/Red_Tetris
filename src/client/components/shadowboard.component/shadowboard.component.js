import React from 'react'
import styls from './shadowBoard.css'

const shadowBoard = ( props ) => {
	let content = <div>EMPTY BOARD</div>;
	let info = '';
	let shadowCellClasses = [];
	shadowCellClasses.push(styles.shadowCell);

	let contentArray = [];
	if (props.shadowState) {
		props.shadowState.forEach((shadowBoard, sbIndex) => {
			if (shadowBoard.id == props.playerUUID) return;
			let board = shadowBoard.board.map( (row, rIndex) => {
				let line = row.map( (cell, cIndex) => {
					let classes = [...shadowCellClasses];
					classes.push(styls[cell]);
					classes = classes.join(' ');

					return <div key={(rIndex + 1) * (cIndex + 1)} className={classes}></div>;
				});
				line = <div key={rIndex} className={styls.row}>{line}</div>
				return line;
			});

			let fontSize = '100%';
			if (shadowBoard.name.length > 8) {
				fontSize = '60%';
			}

			contentArray.push(
				<div className={styls.shadowBoard} key={sbIndex} >
					<div className={styls.board}>
						{board}
					</div>
					<div className={styls.info}>
						<div className={styls.name} style={{fontSize: fontSize}}>{decodeURIComponent(shadowBoard.name)}</div>
						<div>Score: {shadowBoard.score}</div>
					</div>
				</div>
			);
		})
	}

	return (
		<div className={styls.ShadowBoards}>
			{contentArray}
		</div>
	);
}

export default shadowBoard
