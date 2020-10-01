import io from 'socket.io-client';
import params from '../../params';
import reducer from './reducers';
import initialState from './initialState';
import { createStore, applyMiddleware, compose } from 'redux';
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare';


const socket = io.connect(params.server.getUrl())

let composeEnhancers = compose;
if (process.env.NODE_ENV != 'production') {
 	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducer, initialState, composeEnhancers(
	applyMiddleware(
		storeStateMiddleWare(socket)
	)
))

export default store