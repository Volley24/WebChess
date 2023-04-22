import ChessBoard, { GameState } from "./ChessBoard"
import ChessPiece from "./ChessPiece"
import Pos from "./Pos"
import Utils from "./Utils"

export default class BoardRenderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  statusElement: HTMLElement;

  chessBoard: ChessBoard;

  tileSize: number;
  colors = { light: "#ffc973", dark: "#915900" };

  pickedUpPiece: ChessPiece | undefined = undefined;
  pickedUpPiecePos: Pos | undefined = undefined;

  selectedSquare: Pos | undefined = undefined;
  highlightedSquares: Pos[] = [];

  validMoves: Pos[] = [];

  freeMove = false

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, chessBoard: ChessBoard, tileSize: number) {
    this.canvas = canvas;
    this.context = context;

    this.statusElement = document.getElementById("status")!;

    this.chessBoard = chessBoard;
    this.tileSize = tileSize;

    let renderer = this;
    this.canvas.addEventListener('keydown', function(e) {
      if(e.code == "KeyR"){
        renderer.reset();
      }else if(e.code == "KeyF"){
        renderer.freeMove = !renderer.freeMove;
      }else if(e.code == "KeyC"){
        console.log(renderer.chessBoard.getFen())
      }
    });

    this.canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
    
    this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(this.canvas, event));
    this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(this.canvas, event));
    this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(this.canvas, event));

    this.updateStatusText();
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
      this.context.fillText((8 - y).toString(), 2, y * (this.tileSize) + 10);
    }

    for(let hightlightedSquare of this.highlightedSquares){
      Utils.circle(this.context, (hightlightedSquare.x * this.tileSize) + (this.tileSize / 2), ((hightlightedSquare.y) * this.tileSize) + (this.tileSize / 2), this.tileSize / 2, "blue")
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

  updateStatusText(){
    let infoText = "";
    switch(this.chessBoard.gameState){
      case GameState.IN_PROGRESS:
        infoText = `It is ${this.chessBoard.currentColorToMove}'s turn.`

        if (this.chessBoard.currentColorInCheck){
          infoText += " They are currently in check."
        }
        break;
      case GameState.WHITE_WIN:
        infoText = `White has won by checkmate.`
        break;
      case GameState.BLACK_WIN:
        infoText = `Black has won by checkmate.`
        break;
      case GameState.STALEMATE_NO_MOVES:
        infoText = `Stalemate by `
        break;
      case GameState.STALEMATE_REPITION:
        infoText = `Stalemate by threefold repition.`
        break;
      case GameState.STALEMATE_ENDLESS:
        infoText = `Stalemate by fifty-move rule.`
        break;
      case GameState.STALEMATE_DEAD_POSITION:
        infoText = `Stalemate by insufficient material.`
        break;
    }

    if (this.chessBoard.gameState != GameState.IN_PROGRESS){
      infoText += " (Press 'R' to reset board)"
    }

    this.statusElement.innerHTML = infoText;
  }

  onMouseDown(canvas: HTMLCanvasElement, event: MouseEvent){
    let pos = Utils.getCursorPosition(canvas, event);
    let tilePos = new Pos(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize))


    if (event.button == 0){
      this.highlightedSquares = [];

      let chessPiece = this.chessBoard.getPiece(tilePos.x, tilePos.y)
      if (chessPiece && (this.chessBoard.canPieceBePlayed(chessPiece) || this.freeMove)) {
        if (!this.selectedSquare || (this.selectedSquare && this.selectedSquare.equals(tilePos.x, tilePos.y))) {

          this.selectedSquare = Pos.copyOf(tilePos);

          if (!this.freeMove){
            this.validMoves = chessPiece.getMoves(this.chessBoard);
          }

          this.pickedUpPiece = chessPiece;
          this.pickedUpPiecePos = new Pos(pos.x - (this.tileSize / 2), pos.y - (this.tileSize / 2));
        }
      }

    }else if(event.button == 2){
      let existingIndex = -1;

      for(let i = 0; i < this.highlightedSquares.length; i++) {
        let pos = this.highlightedSquares[i];

        if (pos.equalsPos(tilePos)){
          existingIndex = i;
          break;
        }
      }

      if (existingIndex != -1){
        this.highlightedSquares.splice(existingIndex, 1);
      }else{
        this.highlightedSquares.push(tilePos);
      }
      
    }
  }

  onMouseUp(canvas: HTMLCanvasElement, event: MouseEvent){
    let pos = Utils.getCursorPosition(canvas, event);
    let tilePos = new Pos(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));


    let oldPos = this.pickedUpPiece?.pos;
    if (tilePos.equalsPos(oldPos)) {

      this.selectedSquare = Pos.copyOf(tilePos);
      this.resetPickedUpPiece();
    } else {
      if (!this.chessBoard.isValidPosition(tilePos.x, tilePos.y)) {
        this.selectedSquare = undefined;
        this.resetPickedUpPiece();

      } else if (this.selectedSquare) {
        this.chessBoard.attemptToMove(this.selectedSquare, tilePos, this.freeMove);
        this.updateStatusText();

        this.selectedSquare = undefined;
        this.validMoves = [];
        this.resetPickedUpPiece();
      }
    }
  }

  onMouseMove(canvas: HTMLCanvasElement, event: MouseEvent){
    if (this.pickedUpPiece) {
      let pos = Utils.getCursorPosition(canvas, event);
      this.pickedUpPiecePos = new Pos(pos.x - (this.tileSize / 2), pos.y - (this.tileSize / 2));
    }
  }

  reset(){
    this.chessBoard = new ChessBoard();
    this.resetPickedUpPiece();

    this.selectedSquare = undefined;
    this.validMoves = [];
    this.updateStatusText();
  }

  resetPickedUpPiece() {
    this.pickedUpPiece = undefined;
    this.pickedUpPiecePos = undefined;
  }
}