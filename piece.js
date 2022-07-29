function getColumn(square) { 
    let column = square % 8; 
    return column;
}

function getRow(square) { 
    let row = parseInt(square / 8);
    return row;
}

function hitPiece(square) { 
    square = document.querySelector(`#square-${square}`); 
    return square.innerHTML != "";
}

function handleHitPiece(piece, square) { 
    let hitPiece = document.querySelector(`#square-${square}`).childNodes[0];
    if (hitPiece.style.color != piece.color) piece.moves.push(square);
}

function putPiece(piece, square) { 
    square = document.querySelector(`#square-${square}`);
    square.innerHTML = getPieceHTML(piece);
}

function getPieceHTML(piece) { 
    return `<p class='piece' style='color: ${piece.color}'>${piece.char}</p>`;
}

function getWhitePieces() { 
    return allPieces.filter((p) => p.color == "white");
}

function getBlackPieces() { 
    return allPieces.filter(function (p) {
        return p.color == "black";
    });
}

function handleCastling(piece, move) { 
    if (piece.hasMoved) return;
    // white castles kingside 
    if (move == 62) { 
        let rook = getPieceOnSquare(63);
        if (rook.hasMoved) return;
        testMove(rook, 61);
    }
    // black castles kingside 
    if (move == 6) { 
        let rook = getPieceOnSquare(7); 
        if (rook.hasMoved) return;
        testMove(rook, 5);
    }
    // white castles queenside 
    if (move == 58) { 
        let rook = getPieceOnSquare(56); 
        if (rook.hasMoved) return;
        testMove(rook, 59);
    }
    // black castles queenside
    if (move == 2) { 
        let rook = getPieceOnSquare(0); 
        if (rook.hasMoved) return;
        testMove(rook, 3);
    }
}

function handleEnPassant(pawn, move) { 
    // white enPassant 
    if (move == pawn.square - 7 || move == pawn.square - 9) { 
        // check if this is enpassant, the enpassant doesnt capture on move square
        if (hitPiece(move)) return;
        console.log(`move: ${move}`);
        
        if (hitPiece(move + 8)) { 
            // capture piece directly below the pawn;
            allPieces = allPieces.filter((p) => p.square != move + 8);
            document.querySelector(`#square-${move+8}`).innerHTML = "";
        }
    } 
    // black enPassant
    if (move == pawn.square + 7 || move == pawn.square + 9) { 
        // check if this is enpassant 
        if (hitPiece(move)) return;
        console.log(`move: ${move}`);
        
        if (hitPiece(move - 8)) { 
            // capture piece directly below the pawn;
            allPieces = allPieces.filter((p) => p.square != move - 8);
            document.querySelector(`#square-${move-8}`).innerHTML = "";
        }
    }
}

function handlePromotion(pawn) { 
    if (pawn.char != "♟︎") return; 
    // pawn must be on the top or bottom row to promote
    if (getRow(pawn.square) != 0 && getRow(pawn.square) != 7) return; 
    let promotionChoice = prompt("Queen, Rook, Bishop, or Knight?").toLowerCase();
    if (!(["queen", "rook", "bishop", "knight"].includes(promotionChoice))) { 
        promotionChoice = "queen";
    }
    promotePiece(pawn, promotionChoice)
}

function promotePiece(pawn, choice) { 
    let originalColor = pawn.color; 
    let originalSquare = pawn.square
    
    let pieceNames = ["queen", "rook", "bishop", "knight"];
    let pieces = [new Queen(), new Rook(), new Bishop(), new Knight()]; 
    let promoted = pieces[pieceNames.indexOf(choice)]; 

    promoted.square = originalSquare; 
    promoted.color = originalColor;

    document.querySelector(`#square-${promoted.square}`).innerHTML = getPieceHTML(promoted);
    // remove pawn from allPieces 
    allPieces.push(promoted);
    allPieces = allPieces.filter( (p) => p != pawn);
}

function movePiece(piece, move) { 
    let oldSquare = piece.square; 
    // make the old square blank
    document.querySelector(`#square-${oldSquare}`).innerHTML = ""; 
    if (piece.char == "♟︎") handleEnPassant(piece, move);
    // check if piece is capturing 
    if (hitPiece(move)) { 
        // take the captured piece out of allPieces array
        allPieces = allPieces.filter((p) => p.square != move)
    }
    
    moveHistory.push( {
        pieceType: piece.char, 
        start: piece.square, 
        end: move
    } );
    piece.square = move; // move the piece
    document.querySelector(`#square-${move}`).innerHTML = getPieceHTML(piece);
    if (piece.char == "♔") handleCastling(piece, move);
    if (piece.char == "♔" || piece.char == "♖") piece.hasMoved = true;
    handlePromotion(piece);
    setUpNextMove();
}

function getPieceOnSquare(chosenSquare) {
    let piece = allPieces.filter(function (piece) {return piece.square == chosenSquare});
    if (piece[0]) return piece[0];
    return false;
}

function getSameColorPieces(piece) { 
    let sameColorPieces = allPieces.filter(function (p) {
        return p.color == piece.color;
    });
    return sameColorPieces;
}

function getOtherColorPieces(piece) { 
    let otherColorPieces = allPieces.filter(function (p) {
        return p.color != piece.color;
    });
    return otherColorPieces;
}

function squaresOccupied(squares) { 
    for (let square of squares) { 
        if (hitPiece(square)) return true;
    }
    return false;
}

function opponentCanCaptureSquares(piece, squares) { 
    // get opposing pieces of piece 
    let otherColorPieces = getOtherColorPieces(piece); 
    for (let piece of otherColorPieces) { 
        for (let square of squares) { 
            if (piece.moves.includes(square)) return true;
        }
    }
    return false;
}