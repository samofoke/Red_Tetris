import React from 'react';
import { connect } from 'react-redux';
import con from './mainControl.style.css';
import Player from '../../../components/playerlist/listofplayers.component';
import Form from '../../../components/form.component/form.component';
import BdGame from '../../../components/Board.component/Board.component';
import socket from '../../../socket';
import { updatePlayer, updateGameSelected, updateJoinGame } from '../../../actions/client.server';


const mainFunction = (props) => {

    const test = (event) => {
        console.log("==================", event);
    }

    let conn;

    if (props.pName === undefined || props.pName.length == 0) {
        conn = (<Form onUpdateName={() => props.onUpdatePlayer} ></Form>)
    }

    console.log("joinedgame", props.joinedgame);

    if (props.joinedgame) {
        conn = (
            // <div>
            //     <BdGame gameState={props.gameState}/>
            // </div>
            <BdGame gameState={props.gameState}/>
        )
    }
    else {
        conn = (
            <Player>
                playerlist={props.playerlist}
                selectedGame={props.selectedGame}
                onslecetGame={props.onselectedGame}
            </Player>
        );
    }
    return (
        <div className={con.control}>
            {conn}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        playerlist: state.playerlist,
        pName: state.pName,
        selectedGame: state.selectedGame,
        joinedgame: state.joinedgame,
        gameState: state.gameState
    }
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdatePlayer: pName => dispatch(updatePlayer(pName)),
        onSelectGame: playerID => dispatch(updateGameSelected(playerID)),
        onUpdateName: gjoined => dispatch(updateJoinGame(gjoined))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(mainFunction);