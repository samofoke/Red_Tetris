//import the tetro pieces
var Piece = require('./tetroPieces').Piece;

class BoardGame {

    constructor(res) {
        let defaultBoard = {
            size: {x: 10, y : 20},
            plst: [],
            pcp: 0,
            gcallback: () => {console.log("no call back yet...")}
        }
        res = {...defaultBoard, ...res};
        this.size = res.size;
        this.cs = new Array(this.size.y);
        //looping through the cordinates
        for (let index = 0; index < this.size.y; index++) {
            this.cs[index] = new Array(this.size.x).fill(0x0);
        }
        this.actps = null;
        this.plst = res.plst;
        this.gcallback = res.gcallback;
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
        }else {
            this.gcallback(this);
        }
    }

    

    //the tries to check rotate the piece
    checkrotate(ps) {
        console.log("[board.js] checks for rotate");
        if (!ps) {
            console.log("\t to piece");
            return;
        }
        //checks collision on the board and tries to rotate
        //let rot = new Piece(ps);
        ps.rotate();
        console.log("the piece rotates", ps);
        // let place = this.overlap(rot);
        // console.log("can place a piece");
        // if (place) {
        //     this.actps = rot;
        //     return rot;
        // }else {
        //     rot = this.checksmoves(rot);
        // }
        // return ps;
        return this.overlap(ps);
    }

    //the checks for moves and moves a piece and active pieces

    checksmoves(pms, v) {
        console.log("[board.js] moves a piece, v", v);
        if (!pms) {
            console.log("\t to piece");
            return;
        }
        if (!v || v.x == undefined || v.y == undefined) {
            console.log("\t invalid move");
            return pms;
        }
        //let m = new Piece(pms);
        pms.updateCordinates(v);
        // let place = this.overlap(m);
        // console.log("can move a piece", place);
        // if (place) {
        //     if (this.actps == pms) {
        //         this.actps = m;
        //     }
        // }
        return this.overlap(pms); 
    }

    //the function for valid pieces on the board

    overlap(psx = this.actps) {
        console.log("[board.js] overlaping pieces");
        if (!psx) {
            return false;
        }
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (psx.cs[y][x] != 0x0) {
                    //if the piece is null outside the board
                    if (psx.crd.x + x >= this.size.x || psx.crd.x + x < 0 || psx.coords.y + y >= this.size.y || psx.crd.y + y < 0) {
						console.log("[board.js] piece out of scope. crd: ", {x: psx.crd.x + x, y: psx.crd.y + y});
                        return false;
                    }
                    //if non-null piece is on a null board
                    else if (this.cs[psx.crd.y + y][psx.crd.x + x] != 0x0 && psx.cs[y][x] != 0x0) {
                        console.log("[board.js] a piece overlaps at: ", {x: psx.crd.x + x, y: psx.crd.y + y}, ", piece", psx.cs[y][x], "board: ", this.cs[psx.crd.y + y][psx.crd.x + x]);
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
        for (let y = 0; y < 4; y++){
            for (let x = 0; x < 4; x++) {
                if (p.cs[y][x] != 0x0) {
                    this.cs[y][x] = p.cs[y][x];
                }
            }
        }
    }

    printcs() {
        console.log("[board.js] print piece cells");
        for (let y = 0; y < this.size.y; y++) {
            let l = "";
            for (let x = 0; x < this.size.x; x++) {
                l += (this.cs[y][x] ? "1" : "0") + " ";
            }
            console.log(l);
        }
    }

    moveRight() {
        if (!this.actps) {
            return ;
        }
        let mv = new Piece(this.actps);
        let cm = this.checksmoves(mv, {x: 1, y: 0});
        if (cm) {
            this.actps = mv;
        }
    }
    moveLeft() {
        if (!this.actps) {
            return ;
        }
        let mv = new Piece(this.actps);
        let cm = this.checksmoves(mv, {x: -1, y: 0});
        if (cm) {
            this.actps = mv;
        }

    }
    moveDown() {
        if (!this.actps) {
            return ;
        }
        let mv = new Piece(this.actps);
        let cm = this.checksmoves(mv, {x: 0, y: 1});
        if (cm) {
            this.actps = mv;
        }

    }
    rotate() {
        console.log("[board.js] rotate piece");
        if (!this.actps) {
            return ;
        }
        let rotps = new Piece(this.actps);
        let cpls = this.checkrotate(rotps);
        if (!cpls) {
            console.log("\t move left 1");
            cpls = this.checksmoves(rotps, {x: -1, y: 0});
        }
        if (!cpls) {
            console.log("\t move left 2");
            cpls = this.checksmoves(rotps, {x: -1, y: 0});
        }
        if (!cpls) {
            console.log("\t move right 1");
            cpls = this.checksmoves(rotps, {x: 3, y: 0});
        }
        if (!cpls) {
            console.log("\t move right 2");
            cpls = this.checksmoves(rotps, {x: 1, y: 0});
        }
        if (!cpls) {
            console.log("\t move up 1");
            cpls = this.checksmoves(rotps, {x: -2, y: 0});
        }
        if (!cpls) {
            console.log("\t move up 2");
            cpls = this.checksmoves(rotps, {x: 0, y: 1});
        }
        if (cpls) {
            console.log("\t The rotate");
            this.actps = rotps;
        }
    }

    getblocks() {
        let cs = JSON.parse(JSON.stringify(cs));
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.actps.cs[y][x] != 0x0) {
                    cs[this.actps.crd.y + y][this.actps.crd.x + x] = this.actps.cs[y][x];
                }
            }
        }
        return cs;
    }
}





let bord = new BoardGame(
    {
        size: {x: 10, y : 20},
        plst: [new Piece(0)]
    }
);

bord.nextPiece();
console.log(bord.getblocks());
//console.log("bord: ", bord);

// let ps = new Piece(1);
// bord.addpiece(ps);
// console.log("bord: ", bord);

//export default BoardGame;