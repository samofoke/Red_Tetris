import React from 'react'
import ReactDom from 'react-dom'
//import createLogger from 'redux-logger'
//import thunk from 'redux-thunk'
//import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
//import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
//import reducer from './reducers'
import App from './containers/app/app'
import store from './store';
import { alert } from './actions/client.server'

// const initialState = {
//   message: 'Well everything seems to be working fine....',
//   socket: {},
//   playerlist: [],
//   pName: '',
//   selectedGame: null,
//   joinedGame: false //True or False
// }

// //an enhancer redux dev tool for middleware
// //This will make sure that if the redux extension is not present.
// //the store enhancer added will at least be a function, as opposed to undefined.
// //const anEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(thunk, createLogger())
//   //anEnhancer(applyMiddleware(thunk, createLogger()))
// )

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'));

//export default store;

//store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))