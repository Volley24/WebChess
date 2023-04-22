import Pos from "./Pos";

export default class Move extends Pos{
    onPieceMove: () => void;

    constructor(x: number, y: number){
        super(x, y);
        this.onPieceMove = () => {};
    }

    addAfterMath(onPieceMove: () => void){
        this.onPieceMove = onPieceMove;
        return this;
    }
}