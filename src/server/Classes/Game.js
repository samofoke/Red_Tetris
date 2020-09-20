class Game {
    static gcnt = 0;
    static mxp = 4;

    constructor(p) {
        this.id = Game.gcnt++;
        this.g = p;
        this.ifPlayer = false;
        this.players = [p];
    }

    getInformation() {
        return {
            id: this.id,
            playerName: this.g.name,
            plcnt: this.players.length
        };
    }
}

export default Game;