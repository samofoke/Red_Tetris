import fs  from 'fs';
import debug from 'debug';
import Server from './Classes/server';
import Player from './Classes/Player';
//import { server } from '../../params';


const server = new Server();

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = io => {
  io.on('connection', function(socket){

    socket.join('lobby');

    loginfo("Socket connected: " + socket.id)
    //setting up server connections for the player.
    let serverInformation = server.forOpenConnection();
    console.log("Server Information: ");
    console.dir(serverInformation);
    //socket.emit('serverInformation', serverInformation);
    io.to('lobby').emit('serverInformation', serverInformation);
    
    socket.on('selectGame', (action) => {
      let p = new Player(action.pName, socket.id);
      //server.forSelectingGame(p, action.playerID);
      if (action.playerID != undefined) {
        server.forSelectingGame(p, action.playerID);
      }else {
        server.createNewGame(p);
      }

      let serverInformation = server.forOpenConnection();
      io.to('lobby').emit('serverInformation', serverInformation);
    })

    socket.on('action', (action) => {

      console.log(action);
      console.log(action.type);
      if(action.type === 'server/ping'){
        socket.emit('action', {type: 'pong'})
      }
    })
    socket.on('disconnect', function() {
      console.log(socket.id);
      let i = {};
      server.games.find(g => {
        let ply = g.players.find(p => p.playerID === socket.id);
        if (ply !== undefined) {
          i = {ply, g};
          return true;
        }
      })
      console.log(i);
      if (i.ply !== undefined) {
        server.removePlayer(i.ply, i.g);
        let serverInformation = server.forOpenConnection();
        io.to('lobby').emit('serverInformation', serverInformation);
      }
    })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
