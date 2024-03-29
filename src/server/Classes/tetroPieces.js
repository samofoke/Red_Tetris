//the pieces of tetrominos.

class Piece {

	/*
	*	Generates a new piece. Rolls once for type. If same as lastPieceType,
	*	rolls again.
	*/
	static generateRandomPiece(lastPieceType) {
		let newType = Math.floor(Math.random() * (Piece.typeCount));
		if (newType === lastPieceType) {
			newType = Math.floor(Math.random() * (Piece.typeCount));
		}
		return new Piece({type: newType});
	}

	/*
	*	Generates and returns a list of num pieces.
	*/
	static generateRandomPieces(num) {
		if (!num) num = 1;
		let pieces = [];
		for (let i = 0; i < num; i++) {
			let lastPieceType = null;
			if (pieces.length > 0)
				lastPieceType = pieces[pieces.length - 1].type;
			pieces.push( Piece.generateRandomPiece(lastPieceType) );
		}
		return pieces;
	}

	/*
	*	param is either an instance of Piece or an Integer between 0 and 7
	*/
	constructor( params ) {
		if (params instanceof Piece) {
			// Copy constructor
			params = {
				type: params.type,
				orientation: params.orientation,
				coords: { ...params.coords }
			};
		}
		// Constructor with params
		let defaultParams = {
			type: 0,
			orientation: 0,
			coords: {x: 3, y: 0}
		};
		params = {...defaultParams, ...params, coords: {...(params && params.coords ? params.coords : defaultParams.coords)}};

	 	if (params.type < 0 || params.type >= Piece.typeCount) {
			return null;
		}
		this.type = params.type;
		this.orientation = params.orientation;
		this.cells = Piece.types[this.type][this.orientation];
		this.coords = params.coords;
	}

	/*
	*	Tetris rotation rules:
	*/

	rotate() {
		this.orientation = (this.orientation + 1) % 4;
		this.cells = Piece.types[this.type][this.orientation];
	}

	move( vector = {x: 0, y : 1} ) {
		if (!Number.isInteger(vector.x) || !Number.isInteger(vector.y)){
			return ;
		}
		this.coords.x += vector.x;
		this.coords.y += vector.y;
	}
}

Piece.typeCount = 7;
Piece.types = [
	// cyan line
	[
		[
			[0x0,		0x0,	0x0,	0x0],
			["l1",	   "l1",	"l1",  "l1"],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	"l1",	0x0],
			[0x0,		0x0,	"l1",	0x0],
			[0x0,		0x0,	"l1",	0x0],
			[0x0,		0x0,	"l1",	0x0],
		],
		[
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
			["l1",		"l1",   "l1",   "l1"],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l1",	0x0,	0x0],
			[0x0,		"l1",	0x0,	0x0],
			[0x0,		"l1",	0x0,	0x0],
			[0x0,		"l1",	0x0,	0x0],
		]
	],
	// blue L
	[
		[
			["l2",	    0x0,    0x0,    0x0],
			["l2",	   "l2",    "l2",   0x0],
			[0x0,		0x0,	0x0,    0x0],
			[0x0,		0x0,	0x0,    0x0],
		],
		[
			[0x0,		"l2",	"l2",	0x0],
			[0x0,		"l2",	0x0,	0x0],
			[0x0,		"l2",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		0x0,	0x0,	 0x0],
			["l2",	    "l2",	"l2",	 0x0],
			[0x0,		0x0,	"l2",	 0x0],
			[0x0,		0x0,	0x0,	 0x0],
		],
		[
			[0x0,		"l2",	0x0,	0x0],
			[0x0,		"l2",	0x0,	0x0],
			["l2",	    "l2",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		]
	],
	// orange L
	[
		[
			[0x0,		0x0,	"l3",	0x0],
			["l3",	    "l3",	"l3",   0x0],
			[0x0,		0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			[0x0,		"l3",	0x0,	0x0],
			[0x0,		"l3",	0x0,	0x0],
			[0x0,		"l3",	"l3",	0x0],
			[0x0,		0x0,	0x0,    0x0],
		],
		[
			[0x0,		0x0,	0x0,	0x0],
			["l3",	    "l3",   "l3",	0x0],
			["l3",	    0x0,	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
		],
		[
			["l3",	    "l3",	0x0,	0x0],
			[0x0,		"l3",	0x0,	0x0],
			[0x0,		"l3",	0x0,	0x0],
			[0x0,		0x0,	0x0,	0x0],
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
			[0x0,		0x0,	0x0,	0x0],
		]
			
	],
];

// module.exports = {
// 	Piece: Piece
// }

export default Piece;