import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';

import ChessBoard from "../src/chess/ChessBoard"

let expect = _chai.expect;
_chai.should();

@suite class ChessTest {

  @test 'test'() {
    let chessBoard = new ChessBoard();

    describe("On depth 1 there are 20 possible games", function() {
        it("Depth 1 = 20", function() {
          expect(chessBoard.sim("white", 1)).to.equal(20);
        });

        it("Depth 2 = 400", function() {
            expect(chessBoard.sim("white", 2)).to.equal(400);
        });

        it("Depth 3 = 8,902", function() {
            expect(chessBoard.sim("white", 3)).to.equal(8902);
        });

        it("Depth 4 = 197,281", function() {
            expect(chessBoard.sim("white", 4)).to.equal(197281);
        });

        it("Depth 5 = 4,865,609", function() {
            expect(chessBoard.sim("white", 5)).to.equal(4865609);
        });
    });
  }

}