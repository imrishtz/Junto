"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PollAnswer = function PollAnswer(id, content) {
  _classCallCheck(this, PollAnswer);

  this.id = id;
  this.content = content;
  this.participantsSelected = [];
};

;
var _default = PollAnswer;
exports["default"] = _default;