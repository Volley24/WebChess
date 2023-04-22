import ChessBoard from "./ChessBoard";
import BoardRenderer from "./ChessBoardRenderer"
import TextureHandler from "./TextureHandler";
import 'regenerator-runtime/runtime'

window.onload = startGame;

const tileSize = 60;
const fps = 60;

function startGame(){
  let canvasRes: any = document.getElementById("canvas");
  let contextRes: any = canvasRes.getContext("2d");

  if (canvasRes && contextRes){
    let canvas: HTMLCanvasElement = canvasRes;
    let context: CanvasRenderingContext2D = contextRes;
    
    (async function (){
      await TextureHandler.loadAll();

      const chessBoard = new ChessBoard();

      const chessBoardRenderer = new BoardRenderer(canvas, context, chessBoard, tileSize);

      setInterval(() => chessBoardRenderer.render(), 1000 / fps)
    })();
  }
}
