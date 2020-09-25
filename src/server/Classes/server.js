import Game from './Game';
import Player from './Player';

class Server {

    constructor() {
        this.games = [];
        this.stanbyPlayer = new Map();
        this.sockets = new Map();

        this.games.push(
            new Game(
                new Player('one', 1)
            )
        )
        // this.games.push(
        //     new Game(
        //         new Player('two', 2)
        //     )
        // )
        // this.games.push(
        //     new Game(
        //         new Player('three', 3)
        //     )
        // )
    }

    //get Events on open connection, save the uuid and get number of rooms(state)
    forOpenConnection() {
        
        console.log("[server.js] Connection open");
        let joinGame = [];

        this.games.forEach( g => {
            if (!g.ifPlaying) {
                if (!g.ifPlaying && g.players.length < Game.mxp) {
                    joinGame.push(g.getInformation())
                }
            }
        });
        return joinGame;
    }

    //remove player from the room function.
    removePlayer(player, game) {
        console.log("[server.js] player romoved...")
        
        if (this.inGame(player, game.id)) {
            game.players = game.players.filter( p => {
                let x = (p.playerID != player.playerID)
                if (x === false) {
                    console.log("remove player ", player.playerID, " form game ", game.id);
                }
                return x;
            });
            //remove the game if the is no players
            if (game.players.length == 0) {
                console.log("checking for an empty room");
                this.games = this.games.filter(g => {
                    let x = (g.id != game.id);
                    if (x === false) {
                        console.log("romve game room: ", g.id);
                    }
                    return x;
                });
                console.log(this.games);
            }
        }
    }

    
    GamebyID(gid) {
        return this.games.find(g => g.id == gid);
    }

    //function checks if you in the game.
    inGame(p, gid) {
        let g = this.GamebyID(gid);

        let x = false;

        if (g) {
            x = g.players.map((p) => p.playerID).includes(p.playerID);
            console.log("player is: ", x);
            //console.log("player is: ", g);
        }
        return x;
    }


    forSelectingGame(p, gid) {
        console.log("[server.js] Select Game");

        let x = this.GamebyID(gid);

        if (!x) {
            this.games.push(new Game(p));
        }else {
            if (!this.inGame(p, gid)) {
                this.games.forEach(gm => this.removePlayer(p, gm));
                x.players.push(p);        
            }
        }
        //console.log("Number of players in the game", gid, ": ", this.games[gid].players.length);
    }

    //the function to create a new game.
    createNewGame(p) {
        console.log("[server.js] Create new game");
        //remove player from other games.
        this.games.forEach(gm => this.removePlayer(p, gm));
        //this.games.push(new Game(p));
        let g = new Game(p);
        this.games.push(g);
        g.Launch();
        return g;
    }
}

export default Server;