class Queen {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.moves = [];
        this.char = "♕";
    }

    getMoves() { // combine the moves of a rook and bishop
        this.moves = []
        let bishop = new Bishop(this.color, this.square);
        let rook = new Rook(this.color, this.square);
        bishop.getMoves();
        rook.getMoves();
        this.moves = rook.moves.concat(bishop.moves);
    }
}