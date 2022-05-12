import ChessBoard from "./ChessBoard"
import AxisPiece from "./AxisPiece"
import Pos from "./Pos"
import TextureHandler from "./TextureHandler";

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

  static async load(type: PieceType, color: PieceColor){
    let img = await new Promise((resolve) => {
      let img = new Image();

      let colorChar = color.charAt(0);
      let typeChar = type == "knight" ? "N" : type.toUpperCase().charAt(0);
      
      img.src = `https://raw.githubusercontent.com/lichess-org/lila/fcfe042d774ece49e1a5d124d81af0e7996f365a/public/piece/kosal/${colorChar}${typeChar}.svg`;

      img.onload = function(){
        resolve(img);
      }
    });
    return [img, (color.toUpperCase() + "_" + type.toUpperCase())];
  }

  toString(){
    return `ChessPiece {${this.color} ${this.type}}`
  }

  move(x: number, y: number){
    this.pos.set(x, y);
    this.moves += 1;
  }
  

  getMoves(board: ChessBoard): Pos[]{

    let moves: Pos[] = [];
    let x = this.pos.x, y = this.pos.y;
    
    if (this.type == "pawn"){
      let mul = this.color == "white" ? -1 : 1;

      if (board.getPiece(x, y + mul) == undefined){
        moves.push(new Pos(x, y + mul));
        if(this.moves == 0 && board.getPiece(x, y + mul * 2) == undefined){
          moves.push(new Pos(x, y + mul * 2));
        }
      }
      
      let xRight = x + 1;
      if (xRight < 8 && !board.sameColorAs(this, board.getPiece(xRight, y + mul))){
        moves.push(new Pos(xRight, y + mul));
      }

      let xLeft = x - 1;
      if(xLeft >= 0 && !board.sameColorAs(this, board.getPiece(xLeft, y + mul))){
        moves.push(new Pos(xLeft, y + mul));
      }
    }else if (this.type == "knight"){
      return ChessPiece.fromOffsets(this, board, [new Pos(1, 2), new Pos(-1, 2),
                     new Pos(1, -2), new Pos(-1, -2),
                     new Pos(2, 1), new Pos(-2, 1),
                     new Pos(2, -1), new Pos(-2, -1)]);

    }else if(this.type == "bishop"){
      return AxisPiece.getMoves(this, board, ["diagonal_left", "diagonal_right"]);
      
    }else if(this.type == "queen"){
      return AxisPiece.getMoves(this, board, AxisPiece.getAllAxes());
      
    }else if(this.type == "rook"){
      return AxisPiece.getMoves(this, board, ["vertical", "horizontal"]);
      
    }else if(this.type == "king"){
      moves = ChessPiece.fromOffsets(this, board, 
                    [new Pos(0, 1), new Pos(1, 0),
                     new Pos(1, 1), new Pos(-1, -1),
                     new Pos(-1, 1), new Pos(1, -1),
                     new Pos(0, -1), new Pos(-1, 0)]);

      let yLoc = this.color == "white" ? 7 : 0

      // Castling
      let leftRook = board.getPiece(7, yLoc);
      if (this.moves == 0 && leftRook != undefined && leftRook.type == "rook" && leftRook.moves == 0){
        if (board.getPiece(x + 1, yLoc) == undefined && board.getPiece(x + 2, yLoc) == undefined){
          moves.push(new Pos(x + 2, yLoc));
        }
      }

      let rightRook = board.getPiece(0, yLoc);
      if (this.moves == 0 && rightRook != undefined && rightRook.type == "rook" && rightRook.moves == 0){
        if (board.getPiece(x - 1, yLoc) == undefined && board.getPiece(x - 2, yLoc) == undefined && board.getPiece(x - 3, yLoc) == undefined){
          moves.push(new Pos(x - 2, yLoc));
        }
      }
      // End Castling
    }
    return moves;
  }

  static fromOffsets(chessPiece: ChessPiece, board: ChessBoard, offsets: Pos[]): Pos[]{
    let moves: Pos[] = [];

    let initPos = new Pos(chessPiece.pos.x, chessPiece.pos.y);
    for (let offset of offsets){
      let realPos = initPos.plus(offset.x, offset.y);

      let chessPiece = board.getPiece(realPos.x, realPos.y)
      let canMove = ((chessPiece == undefined) || (chessPiece != undefined && chessPiece.color != chessPiece.color))
      if (board.isValidPosition(realPos.x, realPos.y) && canMove){
        moves.push(realPos)
      }
    }
    return moves;
  }
}