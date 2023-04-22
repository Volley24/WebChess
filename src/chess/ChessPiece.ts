import ChessBoard from "./ChessBoard"
import AxisPiece from "./AxisPiece"
import Pos from "./Pos"
import TextureHandler from "./TextureHandler";
import Move from "./Move";
import Utils from "./Utils";

export type PieceType = 'pawn' | 'bishop' | 'knight' | 'rook' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export default class ChessPiece{
  type: PieceType
  color: PieceColor;
  texture: HTMLImageElement;

  pos: Pos = new Pos(0,0);
  moves: number;
  
  constructor(type: PieceType, color: PieceColor){
    this.type = type
    this.color = color
    this.texture = TextureHandler.textureDict[color.toUpperCase() + "_" + type.toUpperCase()];
    
    this.moves = 0;
  }

  static matches(chessPiece: ChessPiece | undefined, color?: PieceColor, type?: PieceType, moves?: number){
    if (!chessPiece)
      return false;

    let matches = true;
    if (color) matches = matches && chessPiece.color == color
    if (type) matches = matches && chessPiece.type == type
    if (moves) matches = matches && chessPiece.moves == moves

    return matches;
  }


  static getTypeByLetter(letter: string): PieceType{
    switch(letter.toLowerCase()){
      case 'p': return "pawn";
      case 'n': return "knight";
      case 'b': return "bishop";
      case 'r': return "rook";
      case 'q': return "queen";
      case 'k': return "king";
      default: throw "Invalid char!";
    }
  }

  static getLetterByType(pieceType: PieceType): string{
    switch(pieceType){
      case 'knight': return "n";
      default: return pieceType.toLowerCase().charAt(0);
    }
  }


  toString(){
    return `ChessPiece {${this.color} ${this.type}}`
  }

  move(x: number, y: number){
    this.pos.set(x, y);
  }
  

  getMoves(board: ChessBoard, checkForChecks = true): Pos[]{
    let moves: Pos[] = [];
    let x = this.pos.x, y = this.pos.y;
    
    if (this.type == "pawn"){
      let mul = this.color == "white" ? -1 : 1;

      let pawnCanPromote = (this.color == "white" && y == 1) || (this.color == "black" && y == 6);
      if (board.getPiece(x, y + mul) == undefined){
        let move = new Move(x, y + mul);

        if (pawnCanPromote){
          move.addAfterMath(() => {
            board.setPiece(new ChessPiece("queen", this.color), x, y + mul);
          });
        }
        moves.push(move);

        let pawnCanMoveForwardTwoSpaces = (this.color == "white" && y == 6) || (this.color == "black" && y == 1);

        if(pawnCanMoveForwardTwoSpaces && !board.pieceExistsOn(x, y + mul * 2)){
          moves.push(new Move(x, y + mul * 2).addAfterMath(() => {
            board.enPassantPosition = new Pos(x, y + mul * 2);
          }));
        }
      }
      
      let xRight = x + 1;
      if (xRight < 8){
        let opponentPieceExists = board.sameColorAs(this, board.getPiece(xRight, y + mul)) === false
        if (opponentPieceExists){
          let rightPawnPos = new Move(xRight, y + mul);

          if (pawnCanPromote){
            rightPawnPos.addAfterMath(() => {
              board.setPiece(new ChessPiece("queen", this.color), xRight, y + mul)
            });
          }
          moves.push(rightPawnPos);
        }else if(board.enPassantPosition && board.enPassantPosition.equals(xRight, y) && board.sameColorAs(this, board.getPiece(xRight, y)) === false){
          moves.push(new Move(xRight, y + mul).addAfterMath(() => {
            board.setPiece(undefined, xRight, y);
          }));
        }
      }

      let xLeft = x - 1;
      if(xLeft >= 0){
        let opponentPieceExists = board.sameColorAs(this, board.getPiece(xLeft, y + mul)) === false
        if (opponentPieceExists){
          let leftPawnPos = new Move(xLeft, y + mul);

          if (pawnCanPromote){
            leftPawnPos.addAfterMath(() => {
              board.setPiece(new ChessPiece("queen", this.color), xLeft, y + mul)
            });
          }
          moves.push(leftPawnPos);
        }else if(board.enPassantPosition && board.enPassantPosition.equals(xLeft, y) && board.sameColorAs(this, board.getPiece(xLeft, y)) === false){
          moves.push(new Move(xLeft, y + mul).addAfterMath(() => {
            board.setPiece(undefined, xLeft, y);
          }));
        }
      }
    }else if (this.type == "knight"){
      moves = ChessPiece.fromOffsets(this, board, [new Pos(1, 2), new Pos(-1, 2),
                     new Pos(1, -2), new Pos(-1, -2),
                     new Pos(2, 1), new Pos(-2, 1),
                     new Pos(2, -1), new Pos(-2, -1)]);

    }else if(this.type == "bishop"){
      moves = AxisPiece.getMoves(this, board, ["diagonal_left", "diagonal_right"]);
      
    }else if(this.type == "queen"){
      moves = AxisPiece.getMoves(this, board, AxisPiece.getAllAxes());
      
    }else if(this.type == "rook"){
      moves = AxisPiece.getMoves(this, board, ["vertical", "horizontal"]);
      
    }else if(this.type == "king"){
      moves = ChessPiece.fromOffsets(this, board, 
                    [new Pos(0, 1), new Pos(1, 0),
                     new Pos(1, 1), new Pos(-1, -1),
                     new Pos(-1, 1), new Pos(1, -1),
                     new Pos(0, -1), new Pos(-1, 0)]);


      if (this.moves == 0 && !board.currentColorInCheck){
        let backrankYPosition = this.color == "white" ? 7 : 0
 
        let leftRook = board.getPiece(0, backrankYPosition);
        let rightRook = board.getPiece(7, backrankYPosition);
  
        if (leftRook && leftRook.type == "rook" && leftRook.moves == 0){
          if (!board.pieceExistsOn(x - 1, backrankYPosition) && !board.pieceExistsOn(x - 2, backrankYPosition) && !board.pieceExistsOn(x - 3, backrankYPosition)){
            moves.push(new Move(x - 2, backrankYPosition).addAfterMath(() => board.movePiece(leftRook!, x - 1, y)));
          }
        }
      
        if (rightRook && rightRook.type == "rook" && rightRook.moves == 0){
          if (!board.pieceExistsOn(x + 1, backrankYPosition) && !board.pieceExistsOn(x + 2, backrankYPosition) ){
            moves.push(new Move(x + 2, backrankYPosition).addAfterMath(() => board.movePiece(rightRook!, x + 1, y)));
          }
        }
      }
    }

    // Will my move put my king in check or make it so my king is still in check?
    if (checkForChecks){
      let king = board.getKing(this.color);

      if (!king){
        console.log("Warning: King not present on board!");

      }else{
        let prevX = this.pos.x;
        let prevY = this.pos.y;

        let legalMoves = [];
        for (let move of moves){
          let pieceAtPos = board.getPiece(move.x, move.y);
          board.movePiece(this, move.x, move.y, false)
          
          let legalMove = true;
          for (let piece of board.getOppositeColoredPieces(this.color).values()){
            if (!legalMove)
              break;

            for(let move of piece.getMoves(board, false)){
              if (move.equalsPos(king.pos)){
                legalMove = false;
                break;
              }
            }
          }
    
          if (legalMove)
            legalMoves.push(move)
    
          //End simulation
          board.movePiece(this, prevX, prevY, false);
          if (pieceAtPos)
            board.setPiece(new ChessPiece(pieceAtPos.type, pieceAtPos.color), move.x, move.y);
        }
        moves = legalMoves;
      }
      
    }

    return moves;
  }

  static fromOffsets(chessPiece: ChessPiece, board: ChessBoard, offsets: Pos[]): Pos[]{
    let moves: Pos[] = [];

    let initPos = new Pos(chessPiece.pos.x, chessPiece.pos.y);
    for (let offset of offsets){
      let realPos = initPos.plus(offset.x, offset.y);

      if (Utils.isValidPosition(realPos.x, realPos.y)){
        let piece = board.getPiece(realPos.x, realPos.y);
        
        if (!ChessPiece.matches(piece, chessPiece.color)){
          moves.push(realPos)
        }
      }
    }
    return moves;
  }
}