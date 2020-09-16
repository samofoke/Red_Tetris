import React from 'react';
import list from './listofplayers.style.css';
import Arena from './arena/arena';
import socket from '../../socket';

const playerlist = (props) => {

    let info = <div></div>;

    const selectGame = (playerID) => {
        console.log("select_game: ", playerID);

        socket.emit('selectGame', {
            playerID: playerID - 1,
            Name: 'Name'
        });
    }

    if (props.playerlist) {
        info = props.playerlist.map( player => {
            return <Arena 
                key={player.id} 
                player={player} 
                selectGame={() => selectGame(player.id)}
            />;
        });
    }

    return (
        <div className={list.plist}>
            {info}
            <input type='button'/>
        </div>
    );
}

export default playerlist; 