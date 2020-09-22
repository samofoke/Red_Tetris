import React from 'react';
import arena from './arena.css';

const Gamearena = (props) => {

    let arrGame = [];
    arrGame.push(arena.g);

    if (props.ifSelected) {
        arrGame.push(arena.act);
    }

    arrGame = arrGame.join(' ');

    return (
        <div className={arrGame} onClick={props.selectGame}>
            <div>#{props.g.id}</div>
            <div className={arena.center}>name: {props.g.playerName}</div>
            <div>Players: {props.g.pcnt}</div>
        </div>
    );
}

export default Gamearena;