import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';

import ChessBoard from "../src/chess/ChessBoard"
import ChessPiece from '../src/chess/ChessPiece';
import Pos from '../src/chess/Pos';

let expect = _chai.expect;
_chai.should();
/*
Series of tests based off fen and moving sequences to check if a castle is possible and was done, or if it is not possible.
*/
@suite class MovingTest {

  @test 'moving test'() {
    let chessBoard = new ChessBoard();

    describe("Starting position piece moving test", function() {
      it("Pawn can move forwards two steps or one step on first turn", function() {
        chessBoard = new ChessBoard();

        for(let x = 0; x < 7; x++){
          let pawn = chessBoard.getPiece(x, 6);

          let expectedOffsets = [new Pos(0, -1), new Pos(0, -2)]
          expect(MovingTest.containsAllOffsets(chessBoard, pawn, expectedOffsets)).to.equal(true);
        }
        expect(chessBoard.getFen()).to.equal(ChessBoard.STARTING_FEN);
      });


      describe("Offset-based pieces do not contain invalid moves", function() {
        it("Knights only have two moves on initial position", function() {
          chessBoard = new ChessBoard();

          let knight = chessBoard.getPiece(6, 7);
          let expectedOffsets = [new Pos(-1, -2), new Pos(1, -2)];

          expect(MovingTest.containsAllOffsets(chessBoard, knight, expectedOffsets)).to.equal(true);
          expect(chessBoard.getFen()).to.equal(ChessBoard.STARTING_FEN);
        });

        it("Kings can't move anywhere on initial position", function() {
          chessBoard = new ChessBoard();

          let king = chessBoard.getPiece(4, 7);
          let expectedOffsets = [];

          expect(MovingTest.containsAllOffsets(chessBoard, king, expectedOffsets)).to.equal(true);
          expect(chessBoard.getFen()).to.equal(ChessBoard.STARTING_FEN);
        });
    
      });

    });
  }

  static containsAllOffsets(board: ChessBoard, chessPiece: ChessPiece, expectedOffsets: Pos[]){
    let moves = chessPiece.getMoves(board);

    if(moves.length != expectedOffsets.length){
      
      return `too many moves: ${moves.length}`;
    }

    for (let offset of expectedOffsets){
      if (!moves.some(move => move.x == offset.x + chessPiece.pos.x && move.y == offset.y + chessPiece.pos.y)){
        console.log(moves)
        return `${offset.x},${offset.y} not found`;
      }
    }
    return true;
  }

}