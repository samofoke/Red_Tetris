import params  from '../../params'
import * as server from './index'
server.create(params.server).then( () => console.log('not yet ready to play tetris with U ...port:0.0.0.0:3004') )
