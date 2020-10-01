import React from 'react';
import arena from './arena.css';

const host = ( props ) => {
	if (!props.host || props.host.id == undefined || props.host.hostName == undefined || props.host.playerCount == undefined) return null;

	let classes = [];
	classes.push(arena.host);

	if (props.isSelected) {
		classes.push(arena.activeHost);
	}

	classes = classes.join(' ');
	return (
		<div className={classes} onClick={props.selectGame}>
			<div className={arena.hostID} >#{props.host.id}</div>
			<div className={arena.name}>Name: {decodeURIComponent(props.host.hostName)}</div>
			<div className={arena.players}>Players: {props.host.playerCount} to 4</div>
		</div>
	);
}

export default host
