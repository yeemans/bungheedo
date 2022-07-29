class King {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♔";
        this.hasMoved = false; // used to check if king can castle
    }

    inBounds(square) { 
        return (square >= 0 && square <= 63);
    }

    whiteKingSideCastling() { 
        // piece on bottom right corner
        let shouldBeRook = getPieceOnSquare(63);
        // if squares 61 and 62 are occupied, we cannot castle 
        // if square 63 is not a piece, then it can't be the rook.
        if (squaresOccupied([61, 62]) || !hitPiece(63)) return; 
        if (shouldBeRook.char != "♖" || shouldBeRook.color != "white") return; 
        // cannot castle if in check or through check 
        if (isInCheck(this)) return false; 
        if (opponentCanCaptureSquares(this, [61, 62])) return;
        if (shouldBeRook.hasMoved) return;
        this.moves.push(62);
    }

    whiteQueenSideCastling() { 
        // piece on bottom left corner
        let shouldBeRook = getPieceOnSquare(56);

        if (squaresOccupied([57, 58, 59]) || !hitPiece(56)) return; 
        if (shouldBeRook.char != "♖" || shouldBeRook.color != "white") return; 
        // cannot castle if in check or through check 
        if (isInCheck(this)) return false; 
        if (opponentCanCaptureSquares(this, [58, 59])) return;
        if (shouldBeRook.hasMoved) return;
        this.moves.push(58);
    }

    blackKingSideCastling() { 
        // piece on top right corner
        let shouldBeRook = getPieceOnSquare(7);
        // if squares 5 or 6 are occupied, we cannot castle 
        // if square 7 is not a piece, then it can't be the rook.
        if (squaresOccupied([5, 6]) || !hitPiece(7)) return; 
        if (shouldBeRook.char != "♖" || shouldBeRook.color != "black") return; 
        // cannot castle if in check or through check 
        if (isInCheck(this)) return false; 
        if (opponentCanCaptureSquares(this, [5, 6])) return;
        if (shouldBeRook.hasMoved) return;
        this.moves.push(6);
    }

    blackQueenSideCastling() { 
        // piece on top left corner
        let shouldBeRook = getPieceOnSquare(0);

        if (squaresOccupied([1, 2, 3]) || !hitPiece(0)) return; 
        if (shouldBeRook.char != "♖" || shouldBeRook.color != "black") return; 
        // cannot castle if in check or through check 
        if (isInCheck(this)) return false; 
        if (opponentCanCaptureSquares(this, [2, 3])) return;
        if (shouldBeRook.hasMoved) return;
        this.moves.push(2);
    }

    whiteCastling() {  
        this.whiteKingSideCastling()
        this.whiteQueenSideCastling();
    }

    blackCastling() { 
        this.blackKingSideCastling(); 
        this.blackQueenSideCastling();
    }

    castling() { // add the castling move
        if (this.hasMoved) return;
        if (this.color == "white") this.whiteCastling(); 
        if (this.color == "black") this.blackCastling();
    }

    getMoves() { 
        this.moves = [];
        let column = getColumn(this.square);
        let squares = [-9, -8, -7, -1, 1, 7, 8, 9];
        if (column == 0) { 
            let forbidden = [-1, 7, -9]
            squares = squares.filter(function(e) { return !forbidden.includes(e) });
        }
        if (column == 7) { 
            let forbidden = [1, -7, 9]
            squares = squares.filter(function(e) { return !forbidden.includes(e) });
        }
        
        for (let s of squares) {
            let potentialMove = this.square + s;
            if ( !this.inBounds(potentialMove) ) continue;

            if ( hitPiece(potentialMove) ) { 
                handleHitPiece(this, potentialMove); 
                continue;
            } 
            this.moves.push(potentialMove);
        }
        this.castling();
    }
}