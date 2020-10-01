import fs  from 'fs';
import debug from 'debug';
import Server from './Classes/server';
//import Player from './Classes/Player';
import * as ActionNames from './ActionsOntherServer';
import * as ServerActions from '../client/actions/server';
//import { updatePlayerList } from '../client/actions/client.server';
//import { server } from '../../params';


const logerror = debug('tetris:error'), loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {

	const {host, port} = params
	const handler = (req, res) => {
		let file = '';
		switch (req.url) {
			case '/public/index.css':
				file = __dirname + '/../../public/index.css';
				break;
			default:
				file = __dirname + (req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html');
		}
		fs.readFile(file, (err, data) => {
			if (err) {
				logerror(err)
				res.writeHead(500)
				return res.end('Error loading resource')
			}
			res.writeHead(200)
			res.end(data)
		})
	}

	app.on('request', handler)

	app.listen({host, port}, () => {
		loginfo(`tetris listen on ${params.url}`)
		cb()
	})
}

export const server = new Server();

const initEngine = io => {
	server.io = io;
	io.on(ActionNames.CONNECTION, function(socket) {
		server.sendBestScore(socket);

		socket.on(ServerActions.SERVER_UPDATE_REQUEST_URL, (data) => {
			server.onURLJoin(socket, data);
		})

		/*
		*	Emitted when client updates name in GUI
		*/
		socket.on(ServerActions.SERVER_ADD_NEW_PLAYER_TO_LOBBY, (playerName) => {
			server.addNewPlayerToLobby(socket, playerName);
		})

		socket.on(ServerActions.SERVER_JOIN_GAME, (gameID) => {
			server.joinGame(socket, gameID);
		})

		socket.on(ServerActions.SERVER_CREATE_GAME, () => {
			server.createGame(socket);
		})

		socket.on(ServerActions.SERVER_START_GAME, () => {
			server.startGame(socket);
		})

		socket.on(ServerActions.SERVER_GAME_ACTION, (action) => {
			server.playerAction(socket, action);
		})

		socket.on(ActionNames.DISCONNECT, () => {
			server.playerDisconnect(socket);
		})

		socket.on(ServerActions.SERVER_QUIT_GAME, () => {
			let playerName = server.players.get(socket.id).name;
			server.playerDisconnect(socket)
				.then(() => server.addNewPlayerToLobby(socket, playerName));
		})

	})
}

export function create(params) {
	const promise = new Promise( (resolve, reject) => {
		const app = require('http').createServer();
		initApp(app, params, () => {
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
