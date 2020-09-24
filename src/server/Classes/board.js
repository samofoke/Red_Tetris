//import the tetro pieces
var Piece = require('./tetroPieces').Piece;

class BoardGame {

    constructor(res) {
        let defaultBoard = {
            size: {x: 10, y : 20},
            plst: []
        }
        res = {...defaultBoard, ...res};
        this.size = res.size;
        this.cs = new Array(this.size.x);
        //looping through the cordinates
        for (let index = 0; index < this.size.x; index++) {
            this.cs[index] = new Array(this.size.y).fill(0x0);
        }
        this.actps = null;
        this.plst = res.plst;
    }

    //function to add pieces
    addpiece(p) {
        console.log("[board.js] added pieces");
        if (!p || p.constructor !== Array || !(p[0] instanceof Piece)) {
            return;
        }
        this.plst.push(p);
    }

    //sets the next peice from the list of pieces

    nextPiece() {
        console.log("[board.js] set the next piece");
        this.actps = this.plst.shift();
        if (!this.actps){
            console.log("[board.js] error: no next piece");
        }
    }

    

    //the tries to check rotate the piece
    checkrotate(ps = this.actps) {
        console.log("[board.js] checks for rotate");
        if (!ps) {
            console.log("\t to piece");
            return;
        }
        //checks collision on the board and tries to rotate
        let rot = new Piece(ps);
        rot.rotate();
        console.log("the piece rotates", rot);
        let place = this.overlap(rot);
        console.log("can place a piece");
        if (place) {
            this.actps = rot;
            return rot;
        }else {
            rot = this.checksmoves(rot);
        }
        return ps;
    }

    //the checks for moves and moves a piece and active pieces

    checksmoves(v, pms = this.actps) {
        console.log("[board.js] moves a piece, v", v);
        if (!pms) {
            console.log("\t to piece");
            return;
        }
        if (!v || v.x == undefined || v.y == undefined) {
            console.log("\t invalid move");
            return pms;
        }
        let m = new Piece(pms);
        m.updateCordinates(v);
        let place = this.overlap(m);
        console.log("can move a piece", place);
        if (place) {
            if (this.actps == pms) {
                this.actps = m;
            }
        } 
    }

    //the function for valid pieces on the board

    overlap(psx = this.actps) {
        console.log("[board.js] overlaping pieces");
        if (!psx) {
            return false;
        }
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (psx.cs[x][y] != 0x0) {
                    //if the piece is null outside the board
                    if (psx.crd.x + x >= this.size.x || psx.crd.x + x < 0 || psx.crd.y + y >= this.size.y || psx.crd.y + y < 0) {
                        console.log("[board.js] a piece overlaps at: ", {x: psx.crd.x + x, y: psx.crd.y + y}, ", piece", psx.cs[x][y], "board: ", this.cs[psx.crd.x + x][psx.crd.y + y]);
                        return false;
                    }
                }
            }
        }
        return true;
    }


    //the functions calls a new piece once a piece gets to the floor
    putinPlace(p = this.actps) {
        console.log("[board.js] put a piece in place");
        if (!p) {
            return;
        }
        for (let x = 0; x < 4; x++){
            for (let y = 0; y < 4; y++) {
                if (p.cs[x][y] != 0x0) {
                    this.cs[x][y] = p.cs[x][y];
                }
            }
        }
    }

    printcs() {
        console.log("[board.js] print piece cells");
        for (let y = 0; y < this.size.y; y++) {
            let l = "";
            for (let x = 0; x < this.size.x; x++) {
                l += (this.cs[x][y] ? "1" : "0") + " ";
            }
            console.log(l);
        }
    }

    moveRight() {

    }
    moveLeft() {

    }
    moveDown() {

    }
    rotate() {

    }
}





let bord = new BoardGame(
    {
        size: {x: 10, y : 20},
        plst: [new Piece(0)]
    }
);

//console.log("bord: ", bord);

// let ps = new Piece(1);
// bord.addpiece(ps);
// console.log("bord: ", bord);

//export default BoardGame;