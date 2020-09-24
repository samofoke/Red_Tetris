import Piece from './tetroPieces';

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

    TheGame() {
        Piece
        this.addpiece();
        //create a board for each player
        this.players.forEach(ps => {
            ps.bord = new BoardGame({
                gcallback: (bord) => {
                    if (bord.pcp - this.plist.length < 5) {
                        this.plist.push(Piece.randomNumberPieces, bord.pcp + 5).map(ps => {
                            return new Piece(ps);
                        });
                    };
                    bord.pcp += 5;
                }
            });
        });
    }

    startGame() {

    }

    addpiece() {
        this.plist.push(Piece.randomNumberPieces(Game.npcnt));
    }
}

export default Game;