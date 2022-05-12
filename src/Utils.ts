import Pos from "./Pos"

export default class Utils{
  static clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D){
    Utils.fillRect(context, 0, 0, canvas.width, canvas.height, "white");
  }
  
  static fillRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  }
  
  static circle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string){
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
  }

  static getCursorPosition(canvas: HTMLCanvasElement, event: any): Pos {
    const rect = canvas.getBoundingClientRect()
    return new Pos(event.clientX - rect.left, event.clientY - rect.top)
  }

  static isValidPosition(x: number, y: number): boolean{
    return x >= 0 && y >= 0 && x < 8 && y < 8
  }

  static toChessPos(x: number, y: number){
    if (Utils.isValidPosition(x, y)){
      return String.fromCharCode("A".charCodeAt(0) + x) + (8 - y);
    }else{
      return `Invalid pos: ${x},${y}`;
    }
  }
}