import React from 'react';
import arena from './arena.css';

const Gamearena = (props) => {
    return (
        <div className={arena.g} onClick={props.selectGame}>
            <div>#{props.g.id}</div>
            <div className={arena.center}>name: {props.g.playerName}</div>
            <div>Players: {props.g.numberOfPlayers}</div>
        </div>
    );
}

export default Gamearena;