class Knight {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♘";
    }

    getOctagon() { 
        let column = getColumn(this.square); 
        let row = getRow(this.square);
        // 2 left, 1 up
        if (column > 1 && row > 0) this.moves.push(this.square - 10); 
        // 1 left, 2 up
        if (column > 0 && row > 1) this.moves.push(this.square - 17); 
        // 1 right, 2 up
        if (column < 7 && row > 1) this.moves.push(this.square - 15); 
        // 2 right, 1 up
        if (column < 6 && row > 0) this.moves.push(this.square - 6); 
        // 2 right, 1 down 
        if (column < 6 && row < 7) this.moves.push(this.square + 10); 
        // 1 right, 2 down 
        if (column < 7 && row < 6) this.moves.push(this.square + 17);
        // 1 left, 2 down 
        if (column > 0 && row < 6) this.moves.push(this.square + 15); 
        // 2 left, 1 down 
        if (column > 1 && row < 7) this.moves.push(this.square + 6);
    }

    handleJumpOnPiece(moveList, square) { 
        let hitPiece = document.querySelector(`#square-${square}`).childNodes[0];
        if (hitPiece.style.color != this.color) moveList.push(square);
    }

    getMoves() { 
        this.moves = [];
        this.getOctagon(); 
        let finalMoves = [];

        for (let i = 0; i < this.moves.length; i++) { 
            if (hitPiece(this.moves[i]) ) { 
                this.handleJumpOnPiece(finalMoves, this.moves[i]);
            } else { 
                finalMoves.push(this.moves[i])
            }
        }
        this.moves = finalMoves;
    }
}