import Game from './Game';
import Player from './Player';

class Server {

    constructor() {
        this.games = [];

        this.games.push(
            new Game(
                new Player('one', 1)
            )
        )
        this.games.push(
            new Game(
                new Player('two', 2)
            )
        )
        this.games.push(
            new Game(
                new Player('three', 3)
            )
        )
    }

    //get Events on open connection, save the uuid and get number of rooms(state)
    forOpenConnection() {
        
        console.log("Connection open");
        let joinGame = [];

        this.games.forEach( g => {
            if (!g.ifPlaying) {
                joinGame.push(g.getInformation())
            }
        });
        return joinGame;
    }

    forSelectingGame(p, gid) {
        
        if (!this.games[gid]) {
            this.games[gid] = new Game(p);
        }else {
            this.games[gid].players.push(p);
        }
        console.log("Number of players in the game", gid, ": ", this.games[gid].players.length);
    }
}

export default Server;