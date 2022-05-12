import ChessPiece, { PieceType } from "./ChessPiece"
import Utils from "./Utils"

export default class ChessBoard{

  whitePieces: {[key: string]: ChessPiece} = {}
  blackPieces: {[key: string]: ChessPiece} = {}

  isInCheck = false
  whiteToMove = true
  moves = 0

  textureDict: {[key: string]: HTMLImageElement} = {}

  /* FORMAT:
    getPiece(x, y): Get piece by x and y
    setPiece(piece, x, y): Set a position to a piece

    move(piece, newX, newY): Move a piece to a position, if the piece exists on the board.

    getWhitePieces(): Get all white pieces
    getBlackPieces(): Get all black pieces

  */

  move(x: number, y: number, x1: number, y1: number, force = false){
    let chessPiece = this.getPiece(x, y);
    if (chessPiece){
      let moves = chessPiece.getMoves(this);
    
      let canMove;
      if (moves){
        canMove = false;
        for(let pos of moves){
          if(pos.x == x1 && pos.y == y1){
            canMove = true;
            break;
          }
        }
      }else{
        canMove = true;
      }

      if (canMove || force){
        this.movePiece(chessPiece, x1, y1)

        if (chessPiece.type == "pawn"){
          //Promotion
          if (chessPiece.color == "white" && y1 == 0){
            this.setPiece(new ChessPiece("queen", "white"), x1, y1)
          }else if (chessPiece.color == "black" && y1 == 7){
            this.setPiece(new ChessPiece("queen", "black"), x1, y1)
          }
        }else if(chessPiece.type == "king" && y == y1){
          //Castling
          let diffX = x - x1;

          let rightRook = this.getPiece(7, y);
          let leftRook = this.getPiece(0, y);

          if (diffX == -2 && rightRook){
            this.movePiece(rightRook, x1 - 1, y)
          }else if (diffX == 2 && leftRook){
            this.movePiece(leftRook, x1 + 1, y);
          }
        }

        this.whiteToMove = !this.whiteToMove
      }
    }

  }


  sameColorAs(chessPiece1: ChessPiece | undefined, chessPiece2: ChessPiece| undefined){
    if(chessPiece1 == undefined || chessPiece2 == undefined){
      return 'undefined';
    }
    
    return chessPiece1.color == chessPiece2.color;
  }
  
 
  init(){
    this.whitePieces = {};
    this.blackPieces = {};

    this.whiteToMove = true;
    this.moves = 0;


    let order: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
    for(let x = 0; x < 8; x++){
      this.setPiece(new ChessPiece(order[x], "black"), x, 0);
      this.setPiece(new ChessPiece("pawn", "black"), x, 1);

      this.setPiece(new ChessPiece("pawn", "white"), x, 6);
      this.setPiece(new ChessPiece(order[x], "white"), x, 7);
    }
  }

  isDarkSquare(x: number, y: number): boolean{
    return y % 2 == 0 ? x % 2 != 0 : x % 2 == 0;
  }

  getLocator(x: number, y: number): string{
    return `${x},${y}`
  }

  getPiece(x: number, y: number): ChessPiece | undefined{
    let stringLocator = this.getLocator(x,y);
    return this.whitePieces[stringLocator] || this.blackPieces[stringLocator];
  }

  setPiece(chessPiece: ChessPiece | undefined, x: number, y: number){
    let stringLocator = this.getLocator(x,y);

    if (!chessPiece){
      this.removePiece(x, y);
    }else{
      this.removePiece(x, y);
      if (chessPiece.color == "white"){
        this.whitePieces[stringLocator] = chessPiece;
        console.log(`Added white piece at pos ${Utils.toChessPos(x, y)}`);
      }else{
        this.blackPieces[stringLocator] = chessPiece;
        console.log(`Added black piece at pos ${Utils.toChessPos(x, y)}`);
      }
      chessPiece.pos.set(x, y);
    }
  }

  removePiece(x: number, y: number){
    let stringLocator = this.getLocator(x,y);

    if (this.whitePieces[stringLocator] != undefined){
      delete this.whitePieces[stringLocator];
      console.log(`Removed white piece at pos ${Utils.toChessPos(x, y)}`);
    }else if (this.blackPieces[stringLocator] != undefined){
      delete this.blackPieces[stringLocator];
      console.log(`Removed black piece at pos ${Utils.toChessPos(x, y)}`);
    }
  }

  movePiece(chessPiece: ChessPiece, newX: number, newY: number){
    if (this.getPiece(chessPiece.pos.x, chessPiece.pos.y)){
      console.log("\n");
      this.setPiece(undefined, chessPiece.pos.x, chessPiece.pos.y);
      this.setPiece(chessPiece, newX, newY);

      chessPiece.move(newX, newY);
    }
  }


  

  isValidPosition(x: number, y: number): boolean{
    return x >= 0 && y >= 0 && x < 8 && y < 8
  }
  
  canPieceBePlayed(chessPiece: ChessPiece): boolean{
    return (this.whiteToMove && chessPiece.color == "white") || (!this.whiteToMove && chessPiece.color == "black")
  }
}