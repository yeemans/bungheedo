class Pawn {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♟︎";
    }

    getWhiteCaptures() { 
        let column = getColumn(this.square);
        // diagonal left capture
        if ( this.square >= 9 && hitPiece(this.square - 9) && column > 0) { 
            handleHitPiece(this, this.square - 9);
        }
        // diagonal right capture 
        if (this.square >= 7 && hitPiece(this.square - 7) && column < 7) { 
            handleHitPiece(this, this.square - 7);
        }
    }

    getWhiteEnPassant() { 
        let column = getColumn(this.square);
        let row = getRow(this.square); 
        if (row != 3) return; 
        let lastMove = moveHistory[moveHistory.length - 1]; 
        // conditions for en passant
        if (lastMove.pieceType != "♟︎") return;
        if (lastMove.end != lastMove.start + 16) return;  
        // pawns must be in touching columns
        if (getColumn(lastMove.end) == column - 1) this.moves.push(this.square - 9); 
        if (getColumn(lastMove.end) == column + 1) this.moves.push(this.square - 7);
    }

    getWhiteMoves() { 
        let row = getRow(this.square);
        if (!hitPiece(this.square - 8)) { 
            this.moves.push(this.square - 8)
        }
        // double move for starting pawns
        if ( row == 6 && !hitPiece(this.square - 16) && 
        !hitPiece(this.square - 8) ) { 
            this.moves.push(this.square - 16);
        }
        this.getWhiteCaptures();
        this.getWhiteEnPassant();
    }

    getBlackCaptures() { 
        let column = getColumn(this.square);
        // diagonal right capture
        if (this.square <= 54 && hitPiece(this.square + 9) && column < 7) { 
            handleHitPiece(this, this.square + 9);
        }
        // diagonal left capture 
        if (this.square <= 56 && hitPiece(this.square + 7) && column > 0) { 
            handleHitPiece(this, this.square + 7);
        }
    }

    getBlackEnPassant() { 
        let column = getColumn(this.square);
        let row = getRow(this.square); 
        if (row != 4) return; 
        let lastMove = moveHistory[moveHistory.length - 1]; 
        // conditions for en passant
        if (lastMove.pieceType != "♟︎") return;
        if (lastMove.end != lastMove.start - 16) return;  
        // pawns must be in touching columns
        if (getColumn(lastMove.end) == column - 1) this.moves.push(this.square + 7); 
        if (getColumn(lastMove.end) == column + 1) this.moves.push(this.square + 9);
    }

    getBlackMoves() { 
        let row = getRow(this.square);
        if (!hitPiece(this.square + 8)) { 
            this.moves.push(this.square + 8)
        }
        // double move for starting pawns
        if ( row == 1 && !hitPiece(this.square + 16) && 
        !hitPiece(this.square + 8) ) { 
            this.moves.push(this.square + 16);
        }
        this.getBlackCaptures();
        this.getBlackEnPassant();
    }

    getMoves() { 
        this.moves = [];
        if (this.color == "white") this.getWhiteMoves(); 
        if (this.color == "black") this.getBlackMoves();
    }
}