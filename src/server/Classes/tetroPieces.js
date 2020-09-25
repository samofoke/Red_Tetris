//the pieces of tetrominos.

class Piece {


	/*
	the function generates a new piece if not found it will generate again
	*/

	static randomPiece(last) {
		let newpiece = Math.floor(Math.random() * (Piece.differentShapes));
		if (newpiece === last) {
			newpiece = Math.floor(Math.random() * (Piece.differentShapes))
		}
		return new Piece({shapenbr: newpiece});
	}

	/*
	the function generates and reaturns a number of pieces
	*/
	static randomNumberPieces(nbr) {
		if (!nbr) {
			nbr = 1;
		}
		let pcs = [];
		for (let index = 0; index < nbr; index++) {
			let lst = null;
			if (pcs.length > 0) {
				lst = pcs[pcs.length - 1].shapenbr;
			}
			pcs.push(Piece.randomPiece(lst));
		}
		return pcs;
	}

	constructor(len) {
		if (len instanceof Piece) {
			console.log("[tetroPieces.js] piece constructor copy");
			console.log("old: ", len);
			len = {
				shapenbr: len.shapenbr,
				act: len.act,
				crd: {...len.crd}
			};
		}
		//constructor with len
		console.log("[tetroPieces.js] piece constructor with len");
		let defaultLen = {
			shapenbr: 0,
			act: 0,
			crd: {x: 3, y: 0}
		};
		len = {...defaultLen, ...len, crd: {...(len.crd ? len.crd : defaultLen.crd)}};

		if (len.shapenbr < 0 || len.shapenbr >= Piece.differentShapes) {
			console.log("[tetroPieces.js] invalid piece len");
			return null;
		}
		this.shapenbr = len.shapenbr;
		this.act = len.act;
		this.cs = Piece.sevenShapes[this.shapenbr][this.act];
		this.crd = len.crd;
	}

	rotate() {
		this.act = (this.act + 1) % 4;
		console.log("[tetroPieces.js] new action: ", this.act);
		this.cs = Piece.sevenShapes[this.shapenbr][this.act]
	}

	updateCordinates(v) {
		console.log("[tetroPieces.js] move. v: ", v);
		if (!Number.isInteger(v.x) || !Number.isInteger(v.y)) {
			console.log(" invalid move");
			return;
		}
		this.crd.x += v.x;
		this.crd.x += v.x;
		console.log("piece moved: ", this.crd);
	}


}

Piece.differentShapes = 7;
Piece.sevenShapes = [
	// cyan line
	[
		[
			[0x0,		0x0,		0x0,		0x0],
			["l1",	   "l1",		"l1",      "l1"],
			[0x0,		0x0,		0x0,		0x0],
			[0x0,		0x0,		0x0,		0x0],
		],
		[
			[0x0,		0x0,		"l1",	0x0],
			[0x0,		0x0,		"l1",	0x0],
			[0x0,		0x0,		"l1",	0x0],
			[0x0,		0x0,		"l1",	0x0],
		],
		[
			[0x0,		0x0,		0x0,	0x0],
			[0x0,		0x0,		0x0,	0x0],
			["l1",		"l1",	   "l1",   "l1"],
			[0x0,		0x0,		0x0,	0x0],
		],
		[
			[0x0,		"l1",	0x0,		0x0],
			[0x0,		"l1",	0x0,		0x0],
			[0x0,		"l1",	0x0,		0x0],
			[0x0,		"l1",	0x0,		0x0],
		]
	],
	// blue L
	[
		[
			["l2",	    0x0,	    0x0,        0x0],
			["l2",	   "l2",       "l2",        0x0],
			[0x0,		0x0,		0x0,		0x0],
			[0x0,		0x0,		0x0,		0x0],
		],
		[
			[0x0,		"l2",	"l2",	    0x0],
			[0x0,		"l2",	0x0,		0x0],
			[0x0,		"l2",	0x0,		0x0],
			[0x0,		0x0,	0x0,		0x0],
		],
		[
			[0x0,		0x0,		0x0,	 0x0],
			["l2",	    "l2",	    "l2",	 0x0],
			[0x0,		0x0,		"l2",	 0x0],
			[0x0,		0x0,		0x0,	 0x0],
		],
		[
			[0x0,		"l2",	0x0,		0x0],
			[0x0,		"l2",	0x0,		0x0],
			["l2",	    "l2",	0x0,		0x0],
			[0x0,		0x0,	0x0,		0x0],
		]
	],
	// orange L
	[
		[
			[0x0,		0x0,		"l3",	0x0],
			["l3",	    "l3",	    "l3",   0x0],
			[0x0,		0x0,		0x0,	0x0],
			[0x0,		0x0,		0x0,	0x0],
		],
		[
			[0x0,		"l3",	0x0,		0x0],
			[0x0,		"l3",	0x0,		0x0],
			[0x0,		"l3",	"l3",		0x0],
			[0x0,		0x0,	0x0,    	0x0],
		],
		[
			[0x0,		0x0,		0x0,		0x0],
			["l3",	    "l3",   	"l3",	    0x0],
			["l3",	    0x0,		0x0,		0x0],
			[0x0,		0x0,		0x0,		0x0],
		],
		[
			["l3",	    "l3",	0x0,		0x0],
			[0x0,		"l3",	0x0,		0x0],
			[0x0,		"l3",	0x0,		0x0],
			[0x0,		0x0,		0x0,	0x0],
		]
	],
	// yellow square
	[
		[
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		"l4",	"l4",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		]
	],
	// green capital S
	[
		[
			[0x0,		"l5",	"l5",	0x0],
			["l5",	    "l5",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l5",	0x0,	0x0],
			[0x0,		"l5",	"l5",	0x0],
			[0x0,		0x0,	"l5",	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		"l5",	"l5",	0x0],
			["l5",	    "l5",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			["l5",	     0x0,	0x0,	0x0],
			["l5",	    "l5",	0x0,	0x0],
			[0x0,		"l5",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		]
	],
	// purple T
	[
		[
			[0x0,		"l6",	0x0,	0x0],
			["l6",		"l6",	"l6",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l6",	0x0,	0x0],
			[0x0,		"l6",	"l6",	0x0],
			[0x0,		"l6",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	0x0,	0x0],
			["l6",	    "l6",	"l6",	0x0],
			[0x0,		"l6",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l6",	0x0,	0x0],
			["l6",		"l6",	0x0,	0x0],
			[0x0,		"l6",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		]
	],
	// red capital Z
	[
		[
			["l7",	    "l7",	0x0,	0x0],
			[0x0,		"l7",	"l7",	0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	"l7",	0x0],
			[0x0,		"l7",	"l7",	0x0],
			[0x0,		"l7",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	0x0,	0x0],
			["l7",		"l7",	0x0,	0x0],
			[0x0,		"l7",	"l7",	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l7",	0x0,	0x0],
			["l7",		"l7",	0x0,	0x0],
			["l7",		0x0,	0x0,	0x0],
		]
			[0x0,		0x0,	0x0,	0x0],
	],
];

// module.exports = {
// 	Piece: Piece
// }

export default Piece;