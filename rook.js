class Rook {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♖";
        this.hasMoved = false;
    }

    getRightMoves() { 
        if ( getColumn(this.square) == 7 ) return
        for (let i = this.square + 1; i <= 63; i++) {
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            let column = getColumn(i);
            this.moves.push(i);
            if (column == 7) return;
        }
    }

    getLeftMoves() { 
        if ( getColumn(this.square) == 0 ) return; 
        for (let i = this.square - 1; i >= 0; i--) {
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            let column = getColumn(i);
            this.moves.push(i);
            if (column == 0) return;
        }
    }

    getUpMoves() { 
        if ( getRow(this.square) == 0 ) return; 
        for (let i = this.square - 8; i >= 0; i -= 8) {
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            let row = getRow(i);
            this.moves.push(i);
            if (row == 0) return;
        }
    }

    getDownMoves() { 
        if ( getRow(this.square) == 7 ) return; 
        for (let i = this.square + 8; i <= 63; i += 8) {
            if ( hitPiece(i) ) {
                handleHitPiece(this, i);
                return;
            }
            let row = getRow(i);
            this.moves.push(i);
            if (row == 7) return;
        }
    }

    getHorizontalMoves() { 
        this.getRightMoves(); 
        this.getLeftMoves();
    }

    getVerticalMoves() { 
        this.getUpMoves(); 
        this.getDownMoves();
    }

    getMoves() { 
        this.moves = [];
        this.getHorizontalMoves(); 
        this.getVerticalMoves(); 
    }
}