import React from 'react'
import ReactDom from 'react-dom'
//import createLogger from 'redux-logger'
//import thunk from 'redux-thunk'
import { createStore } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
//import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import reducers from './reducers/tetro.component'
import App from './containers/app'
import { tetroIntState } from './actions/pieces.actions.component'
//import {alert} from './actions/alert'

// const initialState = {}
const store = createStore(reducers);

// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(thunk, createLogger())
// )

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))


store.dispatch(tetroIntState());
//ReactDom.render(<App/>, document.getElementById('tetris'))
//store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
