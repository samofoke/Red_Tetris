class Game {
    static gcnt = 0;

    constructor(p) {
        this.g = p;
        this.id = ++Game.gcnt;
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