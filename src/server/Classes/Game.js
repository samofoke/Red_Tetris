import Piece from './tetroPieces';
import BoardGame from './board';

class Game {
    static gcnt = 0;
    static mxp = 4;
    static npcnt = 10;

    constructor(p) {
        this.id = Game.gcnt++;
        this.g = p;
        this.ifPlayer = false;
        this.players = [p];
        this.plist = [];
    }

    getInformation() {
        return {
            id: this.id,
            playerName: this.g.name,
            plcnt: this.players.length
        };
    }

    Launch() {
        this.players.forEach(p => this.TheGame(p));
    }

    TheGame(ply) {
        ply.bord = new BoardGame({
            gcallback: (bord) => {
                if (bord.pcp - this.plist.length < 5) {
                    this.plist.push(Piece.randomNumberPieces(Game.npcnt)); 
                }
                if (bord.plist.length < 5) {
                    this.plist.slice(bord.pcp, bord.pcp + 5).map(ps => {
                        return new Piece(ps);
                    });
                };
                bord.pcp += 5;
            }
        });
    }
    //{

    //     this.addpiece();
    //     //create a board for each player
    //     this.players.forEach(ps => {
    //         ps.bord = new BoardGame({
    //             gcallback: (bord) => {
    //                 if (bord.pcp - this.plist.length < 5) {
    //                     this.plist.push(Piece.randomNumberPieces, bord.pcp + 5).map(ps => {
    //                         return new Piece(ps);
    //                     });
    //                 };
    //                 bord.pcp += 5;
    //             }
    //         });
    //     });
    // }

    startGame() {

    }

    addpiece() {
        this.plist.push(Piece.randomNumberPieces(Game.npcnt));
    }
}

export default Game;