import React from 'react'
import styles from './gameData.css'
import NextPieces from '../nexttetro.component/nexttetro.component';

const gameData = ( props ) => {
	let cellClasses = [];
	cellClasses.push(styles.cell);

	let content = null;

	if (props.gameData) {
		return (
			<div className={styles.GameData}>
				<NextPieces pieces={props.gameData.nextPieces} />
				<div className={styles.score}>Score: {props.gameData.score}</div>
				<div className={styles.removedLines}>Lines: {props.gameData.removedLines}</div>
			</div>
		)
	}
	return null;
}

export default gameData