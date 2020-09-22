import React from 'react';
import list from './listofplayers.style.css';
import Arena from './arena/arena';
import socket from '../../socket';
import * as ActionNames from '../../../server/ActionsOntherServer';

const playerlist = (props) => {

    let info = <div></div>;

    const joinGame = () => {
        console.log("join Game: ");

        // socket.emit('selectGame', {
        //     playerID: playerID,
        //     pName: 'pName'
        // });
        socket.emit(ActionNames.JOIN_GAME, props)
    }

    const createGame = () => {
        console.log("game created");
        socket.emit(ActionNames.CREATE_GAME);
    }

    if (props.playerlist) {
        info = props.playerlist.map( p => {
            return <Arena
                key={p.id}
                p={p}
                selectGame={() => props.onSelectingGame(p.id)}
                ifSelecteed={p.id == props.selectedGame}
                // key={player.id} 
                // player={player} 
                // selectGame={() => selectGame(player.id)}
            />;
        });
    }

    return (
        <div className={list.plist}>
            {info}
            <input onClick={() => props.selectedGame != null ? joinGame({/*create a new game*/}) : createGame()} type='button'
            value={props.selectedGame != null ? "JOIN GAME #" + props.selectedGame : "CREATE GAME" }
            />
            
        </div>
    );
}

export default playerlist;

