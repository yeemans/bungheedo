class Bishop {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♗";
    }

    getUpLeftMoves() { 
        if (getRow(this.square) == 0 || getColumn(this.square) == 0) return;
        for (let i = this.square - 9; i >= 0; i -= 9) { 
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            this.moves.push(i);
            if (getRow(i) == 0 || getColumn(i) == 0) return;
        }
    }

    getUpRightMoves() { 
        if (getRow(this.square) == 0 || getColumn(this.square) == 7) return;
        for (let i = this.square - 7; i >= 0; i -= 7) { 
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            this.moves.push(i);
            if (getRow(i) == 0 || getColumn(i) == 7) return;
        }
    }

    getDownRightMoves() { 
        if (getRow(this.square) == 7 || getColumn(this.square) == 7) return;
        for (let i = this.square + 9; i <= 63; i += 9) { 
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            this.moves.push(i);
            if (getRow(i) == 7 || getColumn(i) == 7) return;
        }
    }

    getDownLeftMoves() { 
        if (getRow(this.square) == 7 || getColumn(this.square) == 0) return;
        for (let i = this.square + 7; i <= 63; i += 7) {  
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            this.moves.push(i);
            if (getRow(i) == 7 || getColumn(i) == 0) return;
        }
    }

    getMoves() { 
        this.getUpLeftMoves(); 
        this.getUpRightMoves(); 
        this.getDownRightMoves(); 
        this.getDownLeftMoves();
    }
}