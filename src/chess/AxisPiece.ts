import ChessBoard from "./ChessBoard"
import ChessPiece from "./ChessPiece"
import Pos from "./Pos"
import Utils from "./Utils";

type Axis = "vertical" | "horizontal" | "diagonal_left" | "diagonal_right";
export default class AxisPiece{

  static getAllAxes(): Axis[]{
    return ["vertical", "horizontal", "diagonal_left", "diagonal_right"]
  }

  static getIncrementByAxis(axis: Axis): Pos{
    let incrementX = 0, incrementY = 0;

    switch (axis){
      case "vertical":
        incrementY = 1
        break;
      case "horizontal":
        incrementX = 1;
        break
      case "diagonal_left":
        incrementX = 1;
        incrementY = 1;
        break
      case "diagonal_right":
        incrementX = -1;
        incrementY = 1;
        break
    }
    return new Pos(incrementX, incrementY);
  }
  
  static getMoves(chessPiece: ChessPiece, board: ChessBoard, axes: Axis[]): Pos[]{
    let moves: Pos[] = [];
    let x = chessPiece.pos.x, y = chessPiece.pos.y;
    
    for (let axis of axes){
      let increment = this.getIncrementByAxis(axis);

      let movePositive = true, moveNegative = true;
      for (let i = 1; i < 8; i++){
        if(movePositive){
          let currentX = x + (i * increment.x);
          let currentY = y + (i * increment.y);
  
          if (!this.addMove(moves, chessPiece, board, currentX, currentY)){
            movePositive = false;
          }
        }

        if(moveNegative){
          let currentX = x + (i * -increment.x);
          let currentY = y + (i * -increment.y);
  
          if (!this.addMove(moves, chessPiece, board, currentX, currentY)){
            moveNegative = false;
          }
        }

        if (!movePositive && !moveNegative){
          break
        }
      }

      
    }
    return moves
  } 

  //Returns boolean: should continue searching for more moves
  static addMove(moves: Pos[], chessPiece: ChessPiece, board: ChessBoard, x: number, y: number): boolean{
    if (Utils.isValidPosition(x, y)){
      let sameColor = board.sameColorAs(chessPiece, board.getPiece(x, y));

      if (sameColor === true){
        return false;
      }else if (sameColor === false){
        moves.push(new Pos(x, y));
        return false;
      }else{
        moves.push(new Pos(x, y));
        return true;
      }
    }
    return false;
  }
  
}