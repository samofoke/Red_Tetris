import io from 'socket.io-client';
import params from '../../params';
import store from './index';
import { alert, updatePlayerList } from './actions/client.server';

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

socket.on('serverInformation', (serverInformation) => {
    console.log("recieved by the client side", serverInformation);

    //sending tto the redux action.
    store.dispatch(updatePlayerList(serverInformation));
})

module.exports = socket;