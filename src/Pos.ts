export default class Pos{
  x: number;
  y: number;
    
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  static copyOf(pos: Pos){
    return new Pos(pos.x, pos.y);
  }
  
  set(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  equalsPos(pos: Pos | undefined): boolean{
    return pos != undefined && this.equals(pos.x, pos.y);
  }
  
  equals(x: number, y: number): boolean{
    return this.x == x && this.y == y;
  }
  
  plus(x: number, y: number){
    return new Pos(this.x + x, this.y + y);
  }
}