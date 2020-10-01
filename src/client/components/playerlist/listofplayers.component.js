import React from 'react';
import ply from './listofplayers.style.css';
import Arena from './arena/arena';
//import socket from '../../socket';
import Button from '../button.component/button.component';
import * as ActionNames from '../../../server/ActionsOntherServer';

const playList = ( props ) => {

	let content = null;

	let button = null;
		if (props.gameSelected != null && props.playList.find(el => el.id == props.gameSelected )) {
			button = (
				<Button onClick={ () => props.joinGame(props.gameSelected)} type='button'
					value={"JOIN GAME #" + props.gameSelected}
				/>
			)
		} else {
			button = (
				<Button onClick={props.createGame} type='button'
					value={"CREATE GAME"}
				/>
			)
		}


	if (props.playList) {
		content = props.playList.map( host => {
			return <Arena
				key={host.id}
				host={host}
				selectGame={() => props.onSelectGame(host.id)}
				isSelected={host.id == props.gameSelected}
			/>;
		});
	}

	return (
		<div className={ply.playList}>
			<div className={ply.list}>
				{content}
			</div>
			{button}
		</div>
	)
}

export default playList;

