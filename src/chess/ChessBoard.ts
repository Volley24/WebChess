import ChessPiece, { PieceColor, PieceType } from "./ChessPiece"
import Move from "./Move";
import Pos from "./Pos";
import Utils from "./Utils";

export enum GameState{
  IN_PROGRESS,
  WHITE_WIN,
  BLACK_WIN,
  STALEMATE_NO_MOVES,
  STALEMATE_REPITION,
  STALEMATE_ENDLESS,
  STALEMATE_DEAD_POSITION
}

/* A class representing a chess board, with chess pieces that may move on said board. */
export default class ChessBoard{
  static STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - KQkq - 0 1";
  static PIECE_ORDER: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]

  /* In which state the game currently is; defines if the game is on going, or finished, and how it was finished if applicable. */
  gameState: GameState = GameState.IN_PROGRESS;

  /* A dictionary of chess pieces for each color with a key denotating a position.*/
  whitePieces: Map<string, ChessPiece> = new Map();
  blackPieces: Map<string, ChessPiece> = new Map();

  currentColorInCheck: boolean = false;
  currentColorToMove: PieceColor = "white";

  /* The one-move position of a pawn if said pawn moved two spaces forward; enabled en-passant capture.*/
  enPassantPosition: Pos | undefined = undefined;

  /* Half and full move counters*/
  halfMoves: number = 0; // Half-moves are incremented every turn and reset to 0 if a pawn move or a capture is made. A stalemate occurs at 50 half moves. 
  fullMoves: number = 1; // Full-moves are incremented after black's turn

  /* A dictionary containing the textures of each of the pieces */
  textureDict: {[key: string]: HTMLImageElement} = {}
  
  constructor(fenString = ChessBoard.STARTING_FEN){
    this.parseFen(fenString);
  }

  sim(color: PieceColor, depth: number, currentDepth = 0): number{
    let moves = 0;
    currentDepth ++;

    for (let piece of [...this.getPiecesOfColor(color).values()]){

      if (currentDepth == depth){
        moves += piece.getMoves(this).length;
      }else{
        for (let move of piece.getMoves(this)){
          let prevX = piece.pos.x;
          let prevY = piece.pos.y;

          let pieceAtPos = this.getPiece(move.x, move.y);
          this.movePiece(piece, move.x, move.y)

          moves += this.sim(this.getOpposingColor(color), depth, currentDepth)

          this.movePiece(piece, prevX, prevY)
          if (pieceAtPos)
            this.setPiece(new ChessPiece(pieceAtPos.type, pieceAtPos.color), move.x, move.y)
        }
      }
    }
    return moves;
  }

  /* Attempts to move a chess piece to a new position, checking if said piece may legally do said move, and executing any other checks, such as if the game is over or drawn. */
  attemptToMove(chessPiecePos: Pos, newPos: Pos, force = false){
    if (this.gameState != GameState.IN_PROGRESS)
      return;

    let chessPiece = this.getPiece(chessPiecePos.x, chessPiecePos.y);
    if (chessPiece){
      let moves = chessPiece.getMoves(this);
    
      let moveToMake;
      if (moves){
        for(let move of moves){
          if(newPos.equalsPos(move)){
            moveToMake = move;
            break;
          }
        }
      }

      if (moveToMake || force){
        this.movePiece(chessPiece, newPos.x, newPos.y)
        this.enPassantPosition = undefined;

        if (!force && moveToMake instanceof Move){
          moveToMake.onPieceMove();
        }

        this.incrementMoves(chessPiece, newPos);
        this.updateGameState(chessPiece.color);

        this.currentColorToMove = this.getOpposingColor(this.currentColorToMove);
      }
    }
  }

  private incrementMoves(chessPiece: ChessPiece, newPiecePos: Pos){
    if (this.currentColorToMove == "black"){
      this.fullMoves ++;
    }

    if (chessPiece.type == "pawn" || this.getPiece(newPiecePos.x, newPiecePos.y)){
      this.halfMoves = 0;
    }else{
      this.halfMoves ++;
    }
  }

  private updateGameState(currentColor: PieceColor){
    let opposingKing = this.getKing(this.getOpposingColor(currentColor))!;


    let enemyKingInCheck = false;
    for (let piece of this.getPiecesOfColor(currentColor).values()){
      if (enemyKingInCheck)
        break;

      for (let move of piece.getMoves(this, false)){
        if (move.equalsPos(opposingKing.pos)){
          enemyKingInCheck = true;
          break;
        }
      }
    }


    let enemyTeamHasAnyMoves = false;
    // Copy list so the 'simulations' don't interfer with the list order
    for (let piece of [...this.getPiecesOfColor(this.getOpposingColor(currentColor)).values()]){
      let moves = piece.getMoves(this).length;

      if (moves != 0){
        enemyTeamHasAnyMoves = true;
        break;
      }
    }

    let isCheckmate = !enemyTeamHasAnyMoves && enemyKingInCheck;
    let isStalemate = !enemyTeamHasAnyMoves && !enemyKingInCheck;

    this.currentColorInCheck = enemyKingInCheck;

    if (isCheckmate){
      this.gameState = this.currentColorToMove == "white" ? GameState.WHITE_WIN : GameState.BLACK_WIN;
    }else if(isStalemate){
      this.gameState = GameState.STALEMATE_NO_MOVES;
    }else if (this.halfMoves == 50){
      this.gameState = GameState.STALEMATE_ENDLESS;
    }
    
    return enemyKingInCheck ? "check" : "normal";
  }


  sameColorAs(chessPiece1: ChessPiece | undefined, chessPiece2: ChessPiece| undefined){
    if(chessPiece1 == undefined || chessPiece2 == undefined){
      return 'undefined';
    }

    return chessPiece1.color == chessPiece2.color;
  }
  

  parseFen(fenString: string){
    let fenComponents = fenString.split(" ");

    for(let i = 0; i < fenComponents.length; i++){
      let fenComponent = fenComponents[i];

      switch (i){
        case 0: this.parsePiecePositions(fenComponent);
        case 1: this.currentColorToMove = fenComponent == "w" ? "white" : "black";
        case 2: this.enPassantPosition = Utils.fromChessPos(fenComponent);
        case 3: /* TODO */;
        case 4: this.halfMoves = parseInt(fenComponent);
        case 4: this.fullMoves = parseInt(fenComponent);
      }

    }
  }

  parsePiecePositions(piecePosString: string){
    let currentX = 0, currentY = 0
    for(let i = 0; i < piecePosString.length; i++){
      let char = piecePosString.charAt(i);

      if (char == "/"){
        currentY += 1
        currentX = 0;

      }else if(char >= '0' && char <= '9'){
        currentX += parseInt(char)

      }else{

        let pieceType: PieceType = ChessPiece.getTypeByLetter(char);
        let pieceColor: PieceColor = char.toUpperCase() == char ? "white" : "black";

        this.setPiece(new ChessPiece(pieceType, pieceColor), currentX, currentY);
        currentX += 1;
      }
    }
  }

  getFen(): string{
    let currentBlanks = 0
    let fenString = "";
    for (let y = 0; y < 8; y++){
      for(let x = 0; x < 8; x++){
        let chessPiece = this.getPiece(x, y);
        if(chessPiece){
          if (currentBlanks != 0){
            fenString += currentBlanks;
            currentBlanks = 0
          }

          let letter = ChessPiece.getLetterByType(chessPiece.type);

          if (chessPiece.color == "white")
            letter = letter.toUpperCase();

          fenString += letter
        }else{
          currentBlanks ++;
        }
      }
      if (currentBlanks != 0){
        fenString += currentBlanks;
        currentBlanks = 0
      }
      if (y != 7)
        fenString += "/";
    }
    return fenString;
  }

  isDarkSquare(x: number, y: number): boolean{
    return y % 2 == 0 ? x % 2 != 0 : x % 2 == 0;
  }

  getLocator(x: number, y: number): string{
    return `${x},${y}`
  }

  getPiece(x: number, y: number): ChessPiece | undefined{
    if (this.isValidPosition(x, y)){
      let stringLocator = this.getLocator(x,y);
      return this.whitePieces.get(stringLocator) || this.blackPieces.get(stringLocator);
    }else{
      return undefined
    }
  }

  pieceExistsOn(x: number, y: number): boolean{
    return this.getPiece(x, y) != undefined;
  }

  setPiece(chessPiece: ChessPiece | undefined, x: number, y: number){
    let stringLocator = this.getLocator(x,y);

    if (!chessPiece){
      this.removePiece(x, y);
    }else{
      this.removePiece(x, y);
      if (chessPiece.color == "white"){
        this.whitePieces.set(stringLocator, chessPiece);
      }else{
        this.blackPieces.set(stringLocator, chessPiece);
      }
      chessPiece.pos.set(x, y);
    }
  }

  getKing(string: PieceColor){
    let pieces = this.getOppositeColoredPieces(string == "white" ? "black" : "white");

    for (let piece of pieces.values()){
      //console.log(`Grabbing king: ${piece}`)
      if (piece.type == "king"){
        return piece;
      }
    }
  }

  getPiecesOfColor(color: PieceColor){
    return color == "white" ? this.whitePieces : this.blackPieces;
  }

  getOpposingColor(color: PieceColor){
    return color == "white" ? "black" : "white";
  }

  getOppositeColoredPieces(string: PieceColor){
    if (string == "white"){
      return this.blackPieces
    }else{
      return this.whitePieces;
    }
  }

  removePiece(x: number, y: number){
    let stringLocator = this.getLocator(x,y);

    if (this.whitePieces.get(stringLocator)){
      this.whitePieces.delete(stringLocator);

    }else if (this.blackPieces.get(stringLocator)){
      this.blackPieces.delete(stringLocator);
    }
  }

  movePiece(chessPiece: ChessPiece, newX: number, newY: number, incrementMoves = true){
    if (this.getPiece(chessPiece.pos.x, chessPiece.pos.y)){
      this.setPiece(undefined, chessPiece.pos.x, chessPiece.pos.y);
      this.setPiece(chessPiece, newX, newY);
      chessPiece.move(newX, newY);

      if (incrementMoves)
        chessPiece.moves += 1;
    }
  }

  isValidPosition(x: number, y: number): boolean{
    return x >= 0 && y >= 0 && x < 8 && y < 8;
  }
  
  canPieceBePlayed(chessPiece: ChessPiece): boolean{
    return this.currentColorToMove == chessPiece.color;
  }
}