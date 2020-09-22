import io from 'socket.io-client';
import params from '../../params';
import store from './index';
import { alert, updatePlayerList } from './actions/client.server';
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

socket.on(ActionNames.SERVER_INFORMATION, (serverInformation) => {
    console.log("recieved by the client side", serverInformation);

    //sending tto the redux action.
    store.dispatch(updatePlayerList(serverInformation));
})

module.exports = socket;

socket.emit(ActionNames.NEW_PLAYER, "Sabata");