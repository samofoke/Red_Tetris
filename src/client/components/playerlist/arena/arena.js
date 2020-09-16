import React from 'react';
import arena from './arena.css';

const Gamearena = (props) => {
    return (
        <div className={arena.game} onClick={props.selectGame}>
            <div>#{props.game.id}</div>
            <div className={arena.center}>name: {props.game.playerName}</div>
            <div>Players: {props.game.numberOfPlayers}</div>
        </div>
    );
}

export default Gamearena;