// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Pos.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Pos = /*#__PURE__*/function () {
  function Pos(x, y) {
    _classCallCheck(this, Pos);

    this.x = x;
    this.y = y;
  }

  _createClass(Pos, [{
    key: "copy",
    value: function copy() {
      return new Pos(this.x, this.y);
    }
  }, {
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "equalsPos",
    value: function equalsPos(pos) {
      return pos != undefined && this.equals(pos.x, pos.y);
    }
  }, {
    key: "equals",
    value: function equals(x, y) {
      return this.x == x && this.y == y;
    }
  }, {
    key: "plus",
    value: function plus(x, y) {
      return new Pos(this.x + x, this.y + y);
    }
  }], [{
    key: "copyOf",
    value: function copyOf(pos) {
      return new Pos(pos.x, pos.y);
    }
  }]);

  return Pos;
}();

exports.default = Pos;
},{}],"src/Utils.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Pos_1 = __importDefault(require("./Pos"));

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "clear",
    value: function clear(canvas, context) {
      Utils.fillRect(context, 0, 0, canvas.width, canvas.height, "white");
    }
  }, {
    key: "fillRect",
    value: function fillRect(context, x, y, width, height, color) {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    }
  }, {
    key: "circle",
    value: function circle(context, x, y, radius, color) {
      context.strokeStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.stroke();
    }
  }, {
    key: "getCursorPosition",
    value: function getCursorPosition(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return new Pos_1.default(event.clientX - rect.left, event.clientY - rect.top);
    }
  }, {
    key: "isValidPosition",
    value: function isValidPosition(x, y) {
      return x >= 0 && y >= 0 && x < 8 && y < 8;
    }
  }, {
    key: "toChessPos",
    value: function toChessPos(x, y) {
      if (Utils.isValidPosition(x, y)) {
        return String.fromCharCode("A".charCodeAt(0) + x) + (8 - y);
      } else {
        return "Invalid pos: ".concat(x, ",").concat(y);
      }
    }
  }, {
    key: "fromChessPos",
    value: function fromChessPos(chessPos) {
      var x = chessPos.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
      var y = 8 - parseInt(chessPos.charAt(1));
      return new Pos_1.default(x, y);
    }
  }]);

  return Utils;
}();

exports.default = Utils;
},{"./Pos":"src/Pos.ts"}],"src/AxisPiece.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Pos_1 = __importDefault(require("./Pos"));

var Utils_1 = __importDefault(require("./Utils"));

var AxisPiece = /*#__PURE__*/function () {
  function AxisPiece() {
    _classCallCheck(this, AxisPiece);
  }

  _createClass(AxisPiece, null, [{
    key: "getAllAxes",
    value: function getAllAxes() {
      return ["vertical", "horizontal", "diagonal_left", "diagonal_right"];
    }
  }, {
    key: "getIncrementByAxis",
    value: function getIncrementByAxis(axis) {
      var incrementX = 0,
          incrementY = 0;

      switch (axis) {
        case "vertical":
          incrementY = 1;
          break;

        case "horizontal":
          incrementX = 1;
          break;

        case "diagonal_left":
          incrementX = 1;
          incrementY = 1;
          break;

        case "diagonal_right":
          incrementX = -1;
          incrementY = 1;
          break;
      }

      return new Pos_1.default(incrementX, incrementY);
    }
  }, {
    key: "getMoves",
    value: function getMoves(chessPiece, board, axes) {
      var moves = [];
      var x = chessPiece.pos.x,
          y = chessPiece.pos.y;

      var _iterator = _createForOfIteratorHelper(axes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var axis = _step.value;
          var increment = this.getIncrementByAxis(axis);
          var movePositive = true,
              moveNegative = true;

          for (var i = 1; i < 8; i++) {
            if (movePositive) {
              var currentX = x + i * increment.x;
              var currentY = y + i * increment.y;

              if (!this.addMove(moves, chessPiece, board, currentX, currentY)) {
                movePositive = false;
              }
            }

            if (moveNegative) {
              var _currentX = x + i * -increment.x;

              var _currentY = y + i * -increment.y;

              if (!this.addMove(moves, chessPiece, board, _currentX, _currentY)) {
                moveNegative = false;
              }
            }

            if (!movePositive && !moveNegative) {
              break;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return moves;
    } //Returns boolean: should continue searching for more moves

  }, {
    key: "addMove",
    value: function addMove(moves, chessPiece, board, x, y) {
      if (Utils_1.default.isValidPosition(x, y)) {
        var sameColor = board.sameColorAs(chessPiece, board.getPiece(x, y));

        if (sameColor === true) {
          return false;
        } else if (sameColor === false) {
          moves.push(new Pos_1.default(x, y));
          return false;
        } else {
          moves.push(new Pos_1.default(x, y));
          return true;
        }
      }

      return false;
    }
  }]);

  return AxisPiece;
}();

exports.default = AxisPiece;
},{"./Pos":"src/Pos.ts","./Utils":"src/Utils.ts"}],"src/TextureHandler.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TextureHandler = /*#__PURE__*/function () {
  function TextureHandler() {
    _classCallCheck(this, TextureHandler);
  }

  _createClass(TextureHandler, null, [{
    key: "loadAll",
    value: function loadAll() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var textureList, _iterator, _step, textureComponent;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all([TextureHandler.load("pawn", "white"), TextureHandler.load("bishop", "white"), TextureHandler.load("knight", "white"), TextureHandler.load("rook", "white"), TextureHandler.load("queen", "white"), TextureHandler.load("king", "white"), TextureHandler.load("pawn", "black"), TextureHandler.load("bishop", "black"), TextureHandler.load("knight", "black"), TextureHandler.load("rook", "black"), TextureHandler.load("queen", "black"), TextureHandler.load("king", "black")]);

              case 2:
                textureList = _context.sent;
                console.log("Loaded all chess pieces");
                _iterator = _createForOfIteratorHelper(textureList);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    textureComponent = _step.value;
                    TextureHandler.textureDict[textureComponent[0]] = textureComponent[1];
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }
  }, {
    key: "load",
    value: function load(type, color) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var img;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new Promise(function (resolve) {
                  var img = new Image();
                  var colorChar = color.charAt(0);
                  var typeChar = type == "knight" ? "N" : type.toUpperCase().charAt(0);

                  if (TextureHandler.SHOULD_LOAD_FROM_GITHUB) {
                    img.src = "https://raw.githubusercontent.com/lichess-org/lila/fcfe042d774ece49e1a5d124d81af0e7996f365a/public/piece/kosal/".concat(colorChar).concat(typeChar, ".svg");
                  } else {
                    img.src = "./assets/".concat(colorChar).concat(typeChar, ".png");
                  }

                  img.onload = function () {
                    console.log("Loaded ".concat(color, " ").concat(type));
                    resolve(img);
                  };

                  img.onerror = function () {
                    console.log("error: can't load lmao");
                  };

                  img.onabort = function () {
                    console.log("saddo");
                  };

                  img.onclose = function () {
                    console.log("close :(");
                  };
                });

              case 2:
                img = _context2.sent;
                return _context2.abrupt("return", [color.toUpperCase() + "_" + type.toUpperCase(), img]);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }]);

  return TextureHandler;
}();

exports.default = TextureHandler;
TextureHandler.SHOULD_LOAD_FROM_GITHUB = true;
TextureHandler.textureDict = {};
},{}],"src/Move.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Pos_1 = __importDefault(require("./Pos"));

var Move = /*#__PURE__*/function (_Pos_1$default) {
  _inherits(Move, _Pos_1$default);

  var _super = _createSuper(Move);

  function Move(x, y) {
    var _this;

    _classCallCheck(this, Move);

    _this = _super.call(this, x, y);

    _this.onPieceMove = function () {};

    return _this;
  }

  _createClass(Move, [{
    key: "addAfterMath",
    value: function addAfterMath(onPieceMove) {
      this.onPieceMove = onPieceMove;
      return this;
    }
  }]);

  return Move;
}(Pos_1.default);

exports.default = Move;
},{"./Pos":"src/Pos.ts"}],"src/ChessPiece.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AxisPiece_1 = __importDefault(require("./AxisPiece"));

var Pos_1 = __importDefault(require("./Pos"));

var TextureHandler_1 = __importDefault(require("./TextureHandler"));

var Move_1 = __importDefault(require("./Move"));

var Utils_1 = __importDefault(require("./Utils"));

var ChessPiece = /*#__PURE__*/function () {
  function ChessPiece(type, color) {
    _classCallCheck(this, ChessPiece);

    this.pos = new Pos_1.default(0, 0);
    this.type = type;
    this.color = color;
    this.texture = TextureHandler_1.default.textureDict[color.toUpperCase() + "_" + type.toUpperCase()];
    this.moves = 0;
  }

  _createClass(ChessPiece, [{
    key: "toString",
    value: function toString() {
      return "ChessPiece {".concat(this.color, " ").concat(this.type, "}");
    }
  }, {
    key: "move",
    value: function move(x, y) {
      this.pos.set(x, y);
    }
  }, {
    key: "getMoves",
    value: function getMoves(board) {
      var _this = this;

      var checkForChecks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var moves = [];
      var x = this.pos.x,
          y = this.pos.y;

      if (this.type == "pawn") {
        var mul = this.color == "white" ? -1 : 1;
        var pawnCanPromote = this.color == "white" && y == 1 || this.color == "black" && y == 6;

        if (board.getPiece(x, y + mul) == undefined) {
          var move = new Move_1.default(x, y + mul);

          if (pawnCanPromote) {
            move.addAfterMath(function () {
              board.setPiece(new ChessPiece("queen", _this.color), x, y + mul);
            });
          }

          moves.push(move);
          var pawnCanMoveForwardTwoSpaces = this.color == "white" && y == 6 || this.color == "black" && y == 1;

          if (pawnCanMoveForwardTwoSpaces && !board.pieceExistsOn(x, y + mul * 2)) {
            moves.push(new Move_1.default(x, y + mul * 2).addAfterMath(function () {
              board.enPassantPosition = new Pos_1.default(x, y + mul * 2);
            }));
          }
        }

        var xRight = x + 1;

        if (xRight < 8) {
          var opponentPieceExists = board.sameColorAs(this, board.getPiece(xRight, y + mul)) === false;

          if (opponentPieceExists) {
            var rightPawnPos = new Move_1.default(xRight, y + mul);

            if (pawnCanPromote) {
              rightPawnPos.addAfterMath(function () {
                board.setPiece(new ChessPiece("queen", _this.color), xRight, y + mul);
              });
            }

            moves.push(rightPawnPos);
          } else if (board.enPassantPosition && board.enPassantPosition.equals(xRight, y) && board.sameColorAs(this, board.getPiece(xRight, y)) === false) {
            moves.push(new Move_1.default(xRight, y + mul).addAfterMath(function () {
              board.setPiece(undefined, xRight, y);
            }));
          }
        }

        var xLeft = x - 1;

        if (xLeft >= 0) {
          var _opponentPieceExists = board.sameColorAs(this, board.getPiece(xLeft, y + mul)) === false;

          if (_opponentPieceExists) {
            var leftPawnPos = new Move_1.default(xLeft, y + mul);

            if (pawnCanPromote) {
              leftPawnPos.addAfterMath(function () {
                board.setPiece(new ChessPiece("queen", _this.color), xLeft, y + mul);
              });
            }

            moves.push(leftPawnPos);
          } else if (board.enPassantPosition && board.enPassantPosition.equals(xLeft, y) && board.sameColorAs(this, board.getPiece(xLeft, y)) === false) {
            moves.push(new Move_1.default(xLeft, y + mul).addAfterMath(function () {
              board.setPiece(undefined, xLeft, y);
            }));
          }
        }
      } else if (this.type == "knight") {
        moves = ChessPiece.fromOffsets(this, board, [new Pos_1.default(1, 2), new Pos_1.default(-1, 2), new Pos_1.default(1, -2), new Pos_1.default(-1, -2), new Pos_1.default(2, 1), new Pos_1.default(-2, 1), new Pos_1.default(2, -1), new Pos_1.default(-2, -1)]);
      } else if (this.type == "bishop") {
        moves = AxisPiece_1.default.getMoves(this, board, ["diagonal_left", "diagonal_right"]);
      } else if (this.type == "queen") {
        moves = AxisPiece_1.default.getMoves(this, board, AxisPiece_1.default.getAllAxes());
      } else if (this.type == "rook") {
        moves = AxisPiece_1.default.getMoves(this, board, ["vertical", "horizontal"]);
      } else if (this.type == "king") {
        moves = ChessPiece.fromOffsets(this, board, [new Pos_1.default(0, 1), new Pos_1.default(1, 0), new Pos_1.default(1, 1), new Pos_1.default(-1, -1), new Pos_1.default(-1, 1), new Pos_1.default(1, -1), new Pos_1.default(0, -1), new Pos_1.default(-1, 0)]);

        if (this.moves == 0 && !board.currentColorInCheck) {
          var backrankYPosition = this.color == "white" ? 7 : 0;
          var leftRook = board.getPiece(0, backrankYPosition);
          var rightRook = board.getPiece(7, backrankYPosition);

          if (leftRook && leftRook.type == "rook" && leftRook.moves == 0) {
            if (!board.pieceExistsOn(x - 1, backrankYPosition) && !board.pieceExistsOn(x - 2, backrankYPosition) && !board.pieceExistsOn(x - 3, backrankYPosition)) {
              moves.push(new Move_1.default(x - 2, backrankYPosition).addAfterMath(function () {
                return board.movePiece(leftRook, x - 1, y);
              }));
            }
          }

          if (rightRook && rightRook.type == "rook" && rightRook.moves == 0) {
            if (!board.pieceExistsOn(x + 1, backrankYPosition) && !board.pieceExistsOn(x + 2, backrankYPosition)) {
              moves.push(new Move_1.default(x + 2, backrankYPosition).addAfterMath(function () {
                return board.movePiece(rightRook, x + 1, y);
              }));
            }
          }
        }
      } // Will my move put my king in check or make it so my king is still in check?


      if (checkForChecks) {
        var king = board.getKing(this.color);

        if (!king) {
          console.log("Warning: King not present on board!");
        } else {
          var prevX = this.pos.x;
          var prevY = this.pos.y;
          var legalMoves = [];

          var _iterator = _createForOfIteratorHelper(moves),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _move = _step.value;
              var pieceAtPos = board.getPiece(_move.x, _move.y);
              board.movePiece(this, _move.x, _move.y, false);
              var legalMove = true;

              var _iterator2 = _createForOfIteratorHelper(board.getOppositeColoredPieces(this.color).values()),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var piece = _step2.value;
                  if (!legalMove) break;

                  var _iterator3 = _createForOfIteratorHelper(piece.getMoves(board, false)),
                      _step3;

                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      var _move2 = _step3.value;

                      if (_move2.equalsPos(king.pos)) {
                        legalMove = false;
                        break;
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              if (legalMove) legalMoves.push(_move); //End simulation

              board.movePiece(this, prevX, prevY, false);
              if (pieceAtPos) board.setPiece(new ChessPiece(pieceAtPos.type, pieceAtPos.color), _move.x, _move.y);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          moves = legalMoves;
        }
      }

      return moves;
    }
  }], [{
    key: "matches",
    value: function matches(chessPiece, color, type, moves) {
      if (!chessPiece) return false;
      var matches = true;
      if (color) matches = matches && chessPiece.color == color;
      if (type) matches = matches && chessPiece.type == type;
      if (moves) matches = matches && chessPiece.moves == moves;
      return matches;
    }
  }, {
    key: "getTypeByLetter",
    value: function getTypeByLetter(letter) {
      switch (letter.toLowerCase()) {
        case 'p':
          return "pawn";

        case 'n':
          return "knight";

        case 'b':
          return "bishop";

        case 'r':
          return "rook";

        case 'q':
          return "queen";

        case 'k':
          return "king";

        default:
          throw "Invalid char!";
      }
    }
  }, {
    key: "getLetterByType",
    value: function getLetterByType(pieceType) {
      switch (pieceType) {
        case 'knight':
          return "n";

        default:
          return pieceType.toLowerCase().charAt(0);
      }
    }
  }, {
    key: "fromOffsets",
    value: function fromOffsets(chessPiece, board, offsets) {
      var moves = [];
      var initPos = new Pos_1.default(chessPiece.pos.x, chessPiece.pos.y);

      var _iterator4 = _createForOfIteratorHelper(offsets),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var offset = _step4.value;
          var realPos = initPos.plus(offset.x, offset.y);

          if (Utils_1.default.isValidPosition(realPos.x, realPos.y)) {
            var piece = board.getPiece(realPos.x, realPos.y);

            if (!ChessPiece.matches(piece, chessPiece.color)) {
              moves.push(realPos);
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return moves;
    }
  }]);

  return ChessPiece;
}();

exports.default = ChessPiece;
},{"./AxisPiece":"src/AxisPiece.ts","./Pos":"src/Pos.ts","./TextureHandler":"src/TextureHandler.ts","./Move":"src/Move.ts","./Utils":"src/Utils.ts"}],"src/ChessBoard.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = void 0;

var ChessPiece_1 = __importDefault(require("./ChessPiece"));

var Move_1 = __importDefault(require("./Move"));

var Utils_1 = __importDefault(require("./Utils"));

var GameState;

(function (GameState) {
  GameState[GameState["IN_PROGRESS"] = 0] = "IN_PROGRESS";
  GameState[GameState["WHITE_WIN"] = 1] = "WHITE_WIN";
  GameState[GameState["BLACK_WIN"] = 2] = "BLACK_WIN";
  GameState[GameState["STALEMATE_NO_MOVES"] = 3] = "STALEMATE_NO_MOVES";
  GameState[GameState["STALEMATE_REPITION"] = 4] = "STALEMATE_REPITION";
  GameState[GameState["STALEMATE_ENDLESS"] = 5] = "STALEMATE_ENDLESS";
  GameState[GameState["STALEMATE_DEAD_POSITION"] = 6] = "STALEMATE_DEAD_POSITION";
})(GameState = exports.GameState || (exports.GameState = {}));
/* A class representing a chess board, with chess pieces that may move on said board. */


var ChessBoard = /*#__PURE__*/function () {
  function ChessBoard() {
    var fenString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChessBoard.STARTING_FEN;

    _classCallCheck(this, ChessBoard);

    /* In which state the game currently is; defines if the game is on going, or finished, and how it was finished if applicable. */
    this.gameState = GameState.IN_PROGRESS;
    /* A dictionary of chess pieces for each color with a key denotating a position.*/

    this.whitePieces = new Map();
    this.blackPieces = new Map();
    this.currentColorInCheck = false;
    this.currentColorToMove = "white";
    /* The one-move position of a pawn if said pawn moved two spaces forward; enabled en-passant capture.*/

    this.enPassantPosition = undefined;
    /* Half and full move counters*/

    this.halfMoves = 0; // Half-moves are incremented every turn and reset to 0 if a pawn move or a capture is made. A stalemate occurs at 50 half moves. 

    this.fullMoves = 1; // Full-moves are incremented after black's turn

    /* A dictionary containing the textures of each of the pieces */

    this.textureDict = {};
    this.parseFen(fenString);
  }

  _createClass(ChessBoard, [{
    key: "sim",
    value: function sim(color, depth) {
      var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var moves = 0;
      currentDepth++;

      for (var _i = 0, _arr = _toConsumableArray(this.getPiecesOfColor(color).values()); _i < _arr.length; _i++) {
        var piece = _arr[_i];

        if (currentDepth == depth) {
          moves += piece.getMoves(this).length;
        } else {
          var _iterator = _createForOfIteratorHelper(piece.getMoves(this)),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var move = _step.value;
              var prevX = piece.pos.x;
              var prevY = piece.pos.y;
              var pieceAtPos = this.getPiece(move.x, move.y);
              this.movePiece(piece, move.x, move.y);
              moves += this.sim(this.getOpposingColor(color), depth, currentDepth);
              this.movePiece(piece, prevX, prevY);
              if (pieceAtPos) this.setPiece(new ChessPiece_1.default(pieceAtPos.type, pieceAtPos.color), move.x, move.y);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      return moves;
    }
    /* Attempts to move a chess piece to a new position, checking if said piece may legally do said move, and executing any other checks, such as if the game is over or drawn. */

  }, {
    key: "attemptToMove",
    value: function attemptToMove(chessPiecePos, newPos) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.gameState != GameState.IN_PROGRESS) return;
      var chessPiece = this.getPiece(chessPiecePos.x, chessPiecePos.y);

      if (chessPiece) {
        var moves = chessPiece.getMoves(this);
        var moveToMake;

        if (moves) {
          var _iterator2 = _createForOfIteratorHelper(moves),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var move = _step2.value;

              if (newPos.equalsPos(move)) {
                moveToMake = move;
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        if (moveToMake || force) {
          this.movePiece(chessPiece, newPos.x, newPos.y);
          this.enPassantPosition = undefined;

          if (!force && moveToMake instanceof Move_1.default) {
            moveToMake.onPieceMove();
          }

          this.incrementMoves(chessPiece, newPos);
          this.updateGameState(chessPiece.color);
          this.currentColorToMove = this.getOpposingColor(this.currentColorToMove);
        }
      }
    }
  }, {
    key: "incrementMoves",
    value: function incrementMoves(chessPiece, newPiecePos) {
      if (this.currentColorToMove == "black") {
        this.fullMoves++;
      }

      if (chessPiece.type == "pawn" || this.getPiece(newPiecePos.x, newPiecePos.y)) {
        this.halfMoves = 0;
      } else {
        this.halfMoves++;
      }
    }
  }, {
    key: "updateGameState",
    value: function updateGameState(currentColor) {
      var opposingKing = this.getKing(this.getOpposingColor(currentColor));
      var enemyKingInCheck = false;

      var _iterator3 = _createForOfIteratorHelper(this.getPiecesOfColor(currentColor).values()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _piece = _step3.value;
          if (enemyKingInCheck) break;

          var _iterator4 = _createForOfIteratorHelper(_piece.getMoves(this, false)),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var move = _step4.value;

              if (move.equalsPos(opposingKing.pos)) {
                enemyKingInCheck = true;
                break;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var enemyTeamHasAnyMoves = false; // Copy list so the 'simulations' don't interfer with the list order

      for (var _i2 = 0, _arr2 = _toConsumableArray(this.getPiecesOfColor(this.getOpposingColor(currentColor)).values()); _i2 < _arr2.length; _i2++) {
        var piece = _arr2[_i2];
        var moves = piece.getMoves(this).length;

        if (moves != 0) {
          enemyTeamHasAnyMoves = true;
          break;
        }
      }

      var isCheckmate = !enemyTeamHasAnyMoves && enemyKingInCheck;
      var isStalemate = !enemyTeamHasAnyMoves && !enemyKingInCheck;
      this.currentColorInCheck = enemyKingInCheck;

      if (isCheckmate) {
        this.gameState = this.currentColorToMove == "white" ? GameState.WHITE_WIN : GameState.BLACK_WIN;
      } else if (isStalemate) {
        this.gameState = GameState.STALEMATE_NO_MOVES;
      } else if (this.halfMoves == 50) {
        this.gameState = GameState.STALEMATE_ENDLESS;
      }

      return enemyKingInCheck ? "check" : "normal";
    }
  }, {
    key: "sameColorAs",
    value: function sameColorAs(chessPiece1, chessPiece2) {
      if (chessPiece1 == undefined || chessPiece2 == undefined) {
        return 'undefined';
      }

      return chessPiece1.color == chessPiece2.color;
    }
  }, {
    key: "parseFen",
    value: function parseFen(fenString) {
      var fenComponents = fenString.split(" ");

      for (var i = 0; i < fenComponents.length; i++) {
        var fenComponent = fenComponents[i];

        switch (i) {
          case 0:
            this.parsePiecePositions(fenComponent);

          case 1:
            this.currentColorToMove = fenComponent == "w" ? "white" : "black";

          case 2:
            this.enPassantPosition = Utils_1.default.fromChessPos(fenComponent);

          case 3:
            /* TODO */
            ;

          case 4:
            this.halfMoves = parseInt(fenComponent);

          case 4:
            this.fullMoves = parseInt(fenComponent);
        }
      }
    }
  }, {
    key: "parsePiecePositions",
    value: function parsePiecePositions(piecePosString) {
      var currentX = 0,
          currentY = 0;

      for (var i = 0; i < piecePosString.length; i++) {
        var char = piecePosString.charAt(i);

        if (char == "/") {
          currentY += 1;
          currentX = 0;
        } else if (char >= '0' && char <= '9') {
          currentX += parseInt(char);
        } else {
          var pieceType = ChessPiece_1.default.getTypeByLetter(char);
          var pieceColor = char.toUpperCase() == char ? "white" : "black";
          this.setPiece(new ChessPiece_1.default(pieceType, pieceColor), currentX, currentY);
          currentX += 1;
        }
      }
    }
  }, {
    key: "getFen",
    value: function getFen() {
      var currentBlanks = 0;
      var fenString = "";

      for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
          var chessPiece = this.getPiece(x, y);

          if (chessPiece) {
            if (currentBlanks != 0) {
              fenString += currentBlanks;
              currentBlanks = 0;
            }

            var letter = ChessPiece_1.default.getLetterByType(chessPiece.type);
            if (chessPiece.color == "white") letter = letter.toUpperCase();
            fenString += letter;
          } else {
            currentBlanks++;
          }
        }

        if (currentBlanks != 0) {
          fenString += currentBlanks;
          currentBlanks = 0;
        }

        if (y != 7) fenString += "/";
      }

      return fenString;
    }
  }, {
    key: "isDarkSquare",
    value: function isDarkSquare(x, y) {
      return y % 2 == 0 ? x % 2 != 0 : x % 2 == 0;
    }
  }, {
    key: "getLocator",
    value: function getLocator(x, y) {
      return "".concat(x, ",").concat(y);
    }
  }, {
    key: "getPiece",
    value: function getPiece(x, y) {
      if (this.isValidPosition(x, y)) {
        var stringLocator = this.getLocator(x, y);
        return this.whitePieces.get(stringLocator) || this.blackPieces.get(stringLocator);
      } else {
        return undefined;
      }
    }
  }, {
    key: "pieceExistsOn",
    value: function pieceExistsOn(x, y) {
      return this.getPiece(x, y) != undefined;
    }
  }, {
    key: "setPiece",
    value: function setPiece(chessPiece, x, y) {
      var stringLocator = this.getLocator(x, y);

      if (!chessPiece) {
        this.removePiece(x, y);
      } else {
        this.removePiece(x, y);

        if (chessPiece.color == "white") {
          this.whitePieces.set(stringLocator, chessPiece);
        } else {
          this.blackPieces.set(stringLocator, chessPiece);
        }

        chessPiece.pos.set(x, y);
      }
    }
  }, {
    key: "getKing",
    value: function getKing(string) {
      var pieces = this.getOppositeColoredPieces(string == "white" ? "black" : "white");

      var _iterator5 = _createForOfIteratorHelper(pieces.values()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var piece = _step5.value;

          //console.log(`Grabbing king: ${piece}`)
          if (piece.type == "king") {
            return piece;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "getPiecesOfColor",
    value: function getPiecesOfColor(color) {
      return color == "white" ? this.whitePieces : this.blackPieces;
    }
  }, {
    key: "getOpposingColor",
    value: function getOpposingColor(color) {
      return color == "white" ? "black" : "white";
    }
  }, {
    key: "getOppositeColoredPieces",
    value: function getOppositeColoredPieces(string) {
      if (string == "white") {
        return this.blackPieces;
      } else {
        return this.whitePieces;
      }
    }
  }, {
    key: "removePiece",
    value: function removePiece(x, y) {
      var stringLocator = this.getLocator(x, y);

      if (this.whitePieces.get(stringLocator)) {
        this.whitePieces.delete(stringLocator);
      } else if (this.blackPieces.get(stringLocator)) {
        this.blackPieces.delete(stringLocator);
      }
    }
  }, {
    key: "movePiece",
    value: function movePiece(chessPiece, newX, newY) {
      var incrementMoves = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (this.getPiece(chessPiece.pos.x, chessPiece.pos.y)) {
        this.setPiece(undefined, chessPiece.pos.x, chessPiece.pos.y);
        this.setPiece(chessPiece, newX, newY);
        chessPiece.move(newX, newY);
        if (incrementMoves) chessPiece.moves += 1;
      }
    }
  }, {
    key: "isValidPosition",
    value: function isValidPosition(x, y) {
      return x >= 0 && y >= 0 && x < 8 && y < 8;
    }
  }, {
    key: "canPieceBePlayed",
    value: function canPieceBePlayed(chessPiece) {
      return this.currentColorToMove == chessPiece.color;
    }
  }]);

  return ChessBoard;
}();

exports.default = ChessBoard;
ChessBoard.STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - KQkq - 0 1";
ChessBoard.PIECE_ORDER = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
},{"./ChessPiece":"src/ChessPiece.ts","./Move":"src/Move.ts","./Utils":"src/Utils.ts"}],"src/ChessBoardRenderer.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ChessBoard_1 = __importStar(require("./ChessBoard"));

var Pos_1 = __importDefault(require("./Pos"));

var Utils_1 = __importDefault(require("./Utils"));

var BoardRenderer = /*#__PURE__*/function () {
  function BoardRenderer(canvas, context, chessBoard, tileSize) {
    var _this = this;

    _classCallCheck(this, BoardRenderer);

    this.colors = {
      light: "#ffc973",
      dark: "#915900"
    };
    this.pickedUpPiece = undefined;
    this.pickedUpPiecePos = undefined;
    this.selectedSquare = undefined;
    this.highlightedSquares = [];
    this.validMoves = [];
    this.freeMove = false;
    this.canvas = canvas;
    this.context = context;
    this.statusElement = document.getElementById("status");
    this.chessBoard = chessBoard;
    this.tileSize = tileSize;
    var renderer = this;
    this.canvas.addEventListener('keydown', function (e) {
      if (e.code == "KeyR") {
        renderer.reset();
      } else if (e.code == "KeyF") {
        renderer.freeMove = !renderer.freeMove;
      } else if (e.code == "KeyC") {
        console.log(renderer.chessBoard.getFen());
      }
    });

    this.canvas.oncontextmenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    this.canvas.addEventListener('mousedown', function (event) {
      return _this.onMouseDown(_this.canvas, event);
    });
    this.canvas.addEventListener('mouseup', function (event) {
      return _this.onMouseUp(_this.canvas, event);
    });
    this.canvas.addEventListener('mousemove', function (event) {
      return _this.onMouseMove(_this.canvas, event);
    });
    this.updateStatusText();
  }

  _createClass(BoardRenderer, [{
    key: "render",
    value: function render() {
      Utils_1.default.clear(this.canvas, this.context);
      this.context.font = "bold 8pt Arial";
      var isDark = false;

      for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
          Utils_1.default.fillRect(this.context, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, isDark ? this.colors.dark : this.colors.light);
          var piece = this.chessBoard.getPiece(x, y);

          if (piece) {
            if (!this.pickedUpPiecePos || this.pickedUpPiece && !this.pickedUpPiece.pos.equals(x, y)) {
              this.context.drawImage(piece.texture, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
          }

          if (y == 7) {
            this.context.fillStyle = "black";
            this.context.fillText(String.fromCharCode("A".charCodeAt(0) + x), this.tileSize + (x * this.tileSize - 9), 8 * this.tileSize - 2);
          }

          if (x != 7) {
            isDark = !isDark;
          }
        }

        this.context.fillStyle = "black";
        this.context.fillText((8 - y).toString(), 2, y * this.tileSize + 10);
      }

      var _iterator = _createForOfIteratorHelper(this.highlightedSquares),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var hightlightedSquare = _step.value;
          Utils_1.default.circle(this.context, hightlightedSquare.x * this.tileSize + this.tileSize / 2, hightlightedSquare.y * this.tileSize + this.tileSize / 2, this.tileSize / 2, "blue");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.selectedSquare) {
        Utils_1.default.circle(this.context, this.selectedSquare.x * this.tileSize + this.tileSize / 2, this.selectedSquare.y * this.tileSize + this.tileSize / 2, this.tileSize / 2, "red");
      }

      if (this.validMoves) {
        var _iterator2 = _createForOfIteratorHelper(this.validMoves),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var move = _step2.value;
            var color = this.chessBoard.isDarkSquare(move.x, move.y) ? "#ebebeb" : "#4a4a4a";
            Utils_1.default.circle(this.context, move.x * this.tileSize + this.tileSize / 2, move.y * this.tileSize + this.tileSize / 2, this.tileSize / 2, color);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      if (this.pickedUpPiece && this.pickedUpPiecePos) {
        this.context.drawImage(this.pickedUpPiece.texture, this.pickedUpPiecePos.x, this.pickedUpPiecePos.y, this.tileSize, this.tileSize);
      }
    }
  }, {
    key: "updateStatusText",
    value: function updateStatusText() {
      var infoText = "";

      switch (this.chessBoard.gameState) {
        case ChessBoard_1.GameState.IN_PROGRESS:
          infoText = "It is ".concat(this.chessBoard.currentColorToMove, "'s turn.");

          if (this.chessBoard.currentColorInCheck) {
            infoText += " They are currently in check.";
          }

          break;

        case ChessBoard_1.GameState.WHITE_WIN:
          infoText = "White has won by checkmate.";
          break;

        case ChessBoard_1.GameState.BLACK_WIN:
          infoText = "Black has won by checkmate.";
          break;

        case ChessBoard_1.GameState.STALEMATE_NO_MOVES:
          infoText = "Stalemate by ";
          break;

        case ChessBoard_1.GameState.STALEMATE_REPITION:
          infoText = "Stalemate by threefold repition.";
          break;

        case ChessBoard_1.GameState.STALEMATE_ENDLESS:
          infoText = "Stalemate by fifty-move rule.";
          break;

        case ChessBoard_1.GameState.STALEMATE_DEAD_POSITION:
          infoText = "Stalemate by insufficient material.";
          break;
      }

      if (this.chessBoard.gameState != ChessBoard_1.GameState.IN_PROGRESS) {
        infoText += " (Press 'R' to reset board)";
      }

      this.statusElement.innerHTML = infoText;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(canvas, event) {
      var pos = Utils_1.default.getCursorPosition(canvas, event);
      var tilePos = new Pos_1.default(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));

      if (event.button == 0) {
        this.highlightedSquares = [];
        var chessPiece = this.chessBoard.getPiece(tilePos.x, tilePos.y);

        if (chessPiece && (this.chessBoard.canPieceBePlayed(chessPiece) || this.freeMove)) {
          if (!this.selectedSquare || this.selectedSquare && this.selectedSquare.equals(tilePos.x, tilePos.y)) {
            this.selectedSquare = Pos_1.default.copyOf(tilePos);

            if (!this.freeMove) {
              this.validMoves = chessPiece.getMoves(this.chessBoard);
            }

            this.pickedUpPiece = chessPiece;
            this.pickedUpPiecePos = new Pos_1.default(pos.x - this.tileSize / 2, pos.y - this.tileSize / 2);
          }
        }
      } else if (event.button == 2) {
        var existingIndex = -1;

        for (var i = 0; i < this.highlightedSquares.length; i++) {
          var _pos = this.highlightedSquares[i];

          if (_pos.equalsPos(tilePos)) {
            existingIndex = i;
            break;
          }
        }

        if (existingIndex != -1) {
          this.highlightedSquares.splice(existingIndex, 1);
        } else {
          this.highlightedSquares.push(tilePos);
        }
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(canvas, event) {
      var _a;

      var pos = Utils_1.default.getCursorPosition(canvas, event);
      var tilePos = new Pos_1.default(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));
      var oldPos = (_a = this.pickedUpPiece) === null || _a === void 0 ? void 0 : _a.pos;

      if (tilePos.equalsPos(oldPos)) {
        this.selectedSquare = Pos_1.default.copyOf(tilePos);
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
  }, {
    key: "onMouseMove",
    value: function onMouseMove(canvas, event) {
      if (this.pickedUpPiece) {
        var pos = Utils_1.default.getCursorPosition(canvas, event);
        this.pickedUpPiecePos = new Pos_1.default(pos.x - this.tileSize / 2, pos.y - this.tileSize / 2);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.chessBoard = new ChessBoard_1.default();
      this.resetPickedUpPiece();
      this.selectedSquare = undefined;
      this.validMoves = [];
      this.updateStatusText();
    }
  }, {
    key: "resetPickedUpPiece",
    value: function resetPickedUpPiece() {
      this.pickedUpPiece = undefined;
      this.pickedUpPiecePos = undefined;
    }
  }]);

  return BoardRenderer;
}();

exports.default = BoardRenderer;
},{"./ChessBoard":"src/ChessBoard.ts","./Pos":"src/Pos.ts","./Utils":"src/Utils.ts"}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ChessBoard_1 = __importDefault(require("./ChessBoard"));

var ChessBoardRenderer_1 = __importDefault(require("./ChessBoardRenderer"));

var TextureHandler_1 = __importDefault(require("./TextureHandler"));

require("regenerator-runtime/runtime");

window.onload = startGame;
var tileSize = 60;
var fps = 60;

function startGame() {
  var canvasRes = document.getElementById("canvas");
  var contextRes = canvasRes.getContext("2d");

  if (canvasRes && contextRes) {
    var canvas = canvasRes;
    var context = contextRes;

    (function () {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var chessBoard, chessBoardRenderer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return TextureHandler_1.default.loadAll();

              case 2:
                chessBoard = new ChessBoard_1.default();
                chessBoardRenderer = new ChessBoardRenderer_1.default(canvas, context, chessBoard, tileSize);
                setInterval(function () {
                  return chessBoardRenderer.render();
                }, 1000 / fps);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    })();
  }
}
},{"./ChessBoard":"src/ChessBoard.ts","./ChessBoardRenderer":"src/ChessBoardRenderer.ts","./TextureHandler":"src/TextureHandler.ts","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53050" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map