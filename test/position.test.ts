import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { mock, instance } from 'ts-mockito';
import Pos from '../src/Pos';

import Utils from '../src/Utils';

var expect  = require("chai").expect;

_chai.should();
/*
Series of tests based off fen and moving sequences to check if a castle is possible and was done, or if it is not possible.
*/
@suite class PositionTest {

  @test 'pos test'() {
    describe("Position Testing", function() {
      describe("Convert board position to human readable format", function() {
        it("Board positions can be converted to human-readable chess positions", function() {
          expect(Utils.toChessPos(0, 0)).to.equal("A8");
          expect(Utils.toChessPos(2, 3)).to.equal("C5");
          expect(Utils.toChessPos(2, 6)).to.equal("C2");
          expect(Utils.toChessPos(7, 7)).to.equal("H1");

          expect(Utils.toChessPos(5, 0)).to.equal("F8");
          expect(Utils.toChessPos(0, 4)).to.equal("A4");

          expect(Utils.toChessPos(8, 0)).to.equal("Invalid pos: 8,0");
          expect(Utils.toChessPos(0, 8)).to.equal("Invalid pos: 0,8");
          expect(Utils.toChessPos(-2, 4)).to.equal("Invalid pos: -2,4");
        });
      });

      describe("Convert human readable to board position", function() {
        it("Human-readable chess positions can be converted to board positions", function() {
          expect(Utils.fromChessPos("A8")).to.deep.equal(new Pos(0, 0));
          expect(Utils.fromChessPos("C5")).to.deep.equal(new Pos(2, 3));
          expect(Utils.fromChessPos("C2")).to.deep.equal(new Pos(2, 6));
          expect(Utils.fromChessPos("H1")).to.deep.equal(new Pos(7, 7));

          expect(Utils.fromChessPos("F8")).to.deep.equal(new Pos(5, 0));
          expect(Utils.fromChessPos("A4")).to.deep.equal(new Pos(0, 4));
        });
      });
    });
  }

}