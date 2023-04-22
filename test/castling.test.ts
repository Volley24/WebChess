import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';

import ChessBoard from "../src/chess/ChessBoard"
import Utils from '../src/chess/Utils';

var expect  = require("chai").expect;

_chai.should();
/*
Series of tests based off fen and moving sequences to check if a castle is possible and was done, or if it is not possible.
*/
@suite class CastlingTest {

  @test 'castling right'() {
    let chessBoard = new ChessBoard();

    describe("Castling Test", function() {
      describe("Short Castling for both colors without any pieces in-between", function() {
        it("Castling is valid on short-side", function() {
          chessBoard = new ChessBoard("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R")

          let white = chessBoard.attemptToMove(Utils.fromChessPos("E1"), Utils.fromChessPos("G1"));
          let black = chessBoard.attemptToMove(Utils.fromChessPos("E8"), Utils.fromChessPos("G8"));

          expect(white).to.equal(true);
          expect(black).to.equal(true);

          expect(chessBoard.getFen()).to.equal("r4rk1/pppppppp/8/8/8/8/PPPPPPPP/R4RK1");
        });
      });

      describe("Long Castling for both colors without any pieces in-between", function() {
        it("Castling is valid on long-side", function() {
          chessBoard = new ChessBoard("r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R")

          chessBoard.attemptToMove(Utils.fromChessPos("E1"), Utils.fromChessPos("C1"));
          chessBoard.attemptToMove(Utils.fromChessPos("E8"), Utils.fromChessPos("C8"));

          expect(chessBoard.getFen()).to.equal("2kr3r/pppppppp/8/8/8/8/PPPPPPPP/2KR3R");
        });
      });
    });
  }

}