// import alert from './alert'
// export default alert
import { ALERT_POP, HOST, UPDATE_PLAYER, UPDATE_GAME_SELECTED, UPDATE_JOINED_GAME } from '../actions/client.server';
import { P_SERVER } from '../actions/server';
import socket from '../socket';
import *as NameActions from '../../server/ActionsOntherServer';

const alertsmg = (state, action) => {
    console.log("arlet send.!!!");
    return {
        ...state,
        message: action.message
    }
}

const accessServer = (state, action) => {
    console.log("are you running");
    return dispatch => {
        setTimeout(() => {
            console.log("ran successfully");
            dispatch("pinned perfectly");
        }, 1000);
    };
}

const updateplayerlist = (state, action) => {
    console.log("update player list.");
    return {
        ...state,
        playerlist: action.playerlist
    }
}

const updateName = (state, action) => {
    let n = document.getElementById('inputName').value;
    console.log("Player Name: ", n);

    if (n != undefined && n.length > 0) {
        console.log("try another new player");
        socket.emit(NameActions.NEW_PLAYER, n);
    }else {
        //give an error
    }return {
        ...state,
        pName: n

    }
}

const selectUpdatedGame = (state, action) => {
    return {
        ...state,
        selectedGame: action.playerID == state.selectedGame ? null : action.playerID

    }
}

const updatedJoinedGame = (state, action) => {
    return {
        ...state,
        joinedGame: action.joinedGame

    }
}

const reducer = (state = {}, action) => {
    switch(action.type) {
        case ALERT_POP: return alertsmg(state, action);
        case P_SERVER: return accessServer(state, action);
        //default: return state;
        case HOST: return updateplayerlist(state, action);
        case UPDATE_PLAYER: return updateName(state, action);
        case UPDATE_GAME_SELECTED: return selectUpdatedGame(state, action);
        case UPDATE_JOINED_GAME: return updatedJoinedGame(state, action);
        default: console.log("didn't work as expected"); return state;
    }
}

export default reducer;

