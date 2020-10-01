import React from 'react';
import ply from './listofplayers.style.css';
import Arena from './arena/arena';
//import socket from '../../socket';
import Button from '../button.component/button.component';
import * as ActionNames from '../../../server/ActionsOntherServer';

const hostList = ( props ) => {

	let content = null;
	console.log("its running...");

	let button = null;
		if (props.gameSelected != null && props.hostList.find(el => el.id == props.gameSelected )) {
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


	if (props.hostList) {
		content = props.hostList.map( host => {
			return <Arena
				key={host.id}
				host={host}
				selectGame={() => props.onSelectGame(host.id)}
				isSelected={host.id == props.gameSelected}
			/>;
		});
	}

	return (
		<div className={ply.hostList}>
			<div className={ply.list}>
				{content}
			</div>
			{button}
		</div>
	)
}

export default hostList;

