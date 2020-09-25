import io from 'socket.io-client';
import params from '../../params';
import store from './index';
import { alert, updatePlayerList, updateJoinGame, updateState } from './actions/client.server';
import * as ActionNames from '../server/ActionsOntherServer';

const socket = io.connect(params.server.getUrl());

socket.on('action', (action) => {
    console.log(action);
    console.log(action.type);

    if (action.type == 'pong') {
        console.log("it's working fine.");
        console.log(store);

        store.dispatch(alert("Hi there."))
    }
})

socket.on(ActionNames.SERVER_INFORMATION, (playerHost) => {
    console.log("[socket.js] recieved by the client side: ", playerHost);

    //sending to the redux action.
    store.dispatch(updatePlayerList(playerHost));
})

//the socket to get data about the joined player.
socket.on(ActionNames.GAME_JOINED, (inGame) => {
    store.dispatch(updateJoinGame(inGame))
})

socket.on(ActionNames.UPDATE_STATE, (blks) => {
    console.log("[socket.js] update the state: ", blks);
    store.dispatch(updateJoinGame(blks))
})

module.exports = socket;

//socket.emit(ActionNames.NEW_PLAYER, "Sabata");