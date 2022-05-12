import ChessBoard from "./ChessBoard"
import ChessPiece from "./ChessPiece"
import Pos from "./Pos"
import Utils from "./Utils"

export default class BoardRenderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  chessBoard: ChessBoard
  tileSize: number
  colors = { light: "#ffc973", dark: "#915900" }

  validMoves: Pos[] | undefined = undefined
  

  pickedUpPiece: ChessPiece | undefined = undefined
  pickedUpPiecePos: Pos | undefined = undefined
  selectedSquare: Pos | undefined = undefined

  freeMove = false

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, chessBoard: ChessBoard, tileSize: number) {
    this.canvas = canvas;
    this.context = context;

    this.chessBoard = chessBoard;
    this.tileSize = tileSize;

    let renderer = this;
    this.canvas.addEventListener('keydown', function(e) {
      if(e.code == "KeyR"){
        renderer.reset();
      }
    });
    
    this.canvas.addEventListener('mouseup', function(e) {
      let pos = Utils.getCursorPosition(renderer.canvas, e);
      let tilePos = new Pos(Math.floor(pos.x / renderer.tileSize), Math.floor(pos.y / renderer.tileSize))


      let oldPos = renderer.pickedUpPiece?.pos;
      if (tilePos.equalsPos(oldPos)) {

        renderer.selectedSquare = Pos.copyOf(tilePos);
        renderer.resetPickedUpPiece();
      } else {
        if (!renderer.chessBoard.isValidPosition(tilePos.x, tilePos.y)) {
          renderer.selectedSquare = undefined;
          renderer.resetPickedUpPiece();

        } else if (renderer.selectedSquare) {
          renderer.chessBoard.move(renderer.selectedSquare.x, renderer.selectedSquare.y, tilePos.x, tilePos.y, renderer.freeMove)

          renderer.selectedSquare = undefined;
          renderer.validMoves = undefined
          renderer.resetPickedUpPiece();
        }
      }

    });

    this.canvas.addEventListener('mousemove', function(e) {
      let pos = Utils.getCursorPosition(renderer.canvas, e);

      if (renderer.pickedUpPiece) {
        renderer.pickedUpPiecePos = new Pos(pos.x - (renderer.tileSize / 2), pos.y - (renderer.tileSize / 2));
      }

    });

    this.canvas.addEventListener('mousedown', function(e) {
      let pos = Utils.getCursorPosition(renderer.canvas, e);
      let tilePos = new Pos(Math.floor(pos.x / renderer.tileSize), Math.floor(pos.y / renderer.tileSize))


      let chessPiece = renderer.chessBoard.getPiece(tilePos.x, tilePos.y)
      if (chessPiece && (renderer.chessBoard.canPieceBePlayed(chessPiece) || renderer.freeMove)) {
        if (!renderer.selectedSquare || (renderer.selectedSquare && renderer.selectedSquare.equals(tilePos.x, tilePos.y))) {

          renderer.selectedSquare = Pos.copyOf(tilePos);

          if (!renderer.freeMove){
            renderer.validMoves = chessPiece.getMoves(renderer.chessBoard);
          }

          renderer.pickedUpPiece = chessPiece;
          renderer.pickedUpPiecePos = new Pos(pos.x - (renderer.tileSize / 2), pos.y - (renderer.tileSize / 2));
        }
      }
    });
  }

  render() {
    Utils.clear(this.canvas, this.context);
    this.context.font = "bold 8pt Arial"

    let isDark = false;
    for (let y = 0; y < 8; y++) {

      for (let x = 0; x < 8; x++) {
        Utils.fillRect(this.context, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, isDark ? this.colors.dark : this.colors.light);


        let piece = this.chessBoard.getPiece(x, y);
        if (piece) {
          if (!this.pickedUpPiecePos || (this.pickedUpPiece && !this.pickedUpPiece.pos.equals(x, y))){
            this.context.drawImage(piece.texture, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
          }
        }

        if (y == 7) {
          this.context.fillStyle = "black";
          this.context.fillText(String.fromCharCode("A".charCodeAt(0) + x), this.tileSize + (x * this.tileSize - 9), (8 * this.tileSize) - 2)
        }

        if (x != 7) {
          isDark = !isDark;
        }
      }
      this.context.fillStyle = "black";
      this.context.fillText("" + (8 - y), 2, y * (this.tileSize) + 10);
    }

    if (this.selectedSquare) {
      Utils.circle(this.context, (this.selectedSquare.x * this.tileSize) + (this.tileSize / 2), (this.selectedSquare.y * this.tileSize) + (this.tileSize / 2), this.tileSize / 2, "red")
    }

    if (this.validMoves){
      for (let move of this.validMoves){
        let color = this.chessBoard.isDarkSquare(move.x, move.y) ? "#ebebeb" : "#4a4a4a"
        Utils.circle(this.context, (move.x * this.tileSize) + (this.tileSize / 2), ((move.y) * this.tileSize) + (this.tileSize / 2), this.tileSize / 2, color)
      }
    }
   

    if (this.pickedUpPiece && this.pickedUpPiecePos) {
      this.context.drawImage(this.pickedUpPiece.texture, this.pickedUpPiecePos.x, this.pickedUpPiecePos.y, this.tileSize, this.tileSize)
    }
  }

  reset(){
    this.chessBoard.init()
    this.resetPickedUpPiece();

    this.selectedSquare = undefined;
    this.validMoves = undefined;
  }

  resetPickedUpPiece() {
    this.pickedUpPiece = undefined;
    this.pickedUpPiecePos = undefined;
  }
}