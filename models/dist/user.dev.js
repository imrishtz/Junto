"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(userId, email, userName, phone) {
  _classCallCheck(this, User);

  this.userID = userId;
  this.userName = userName;
  this.email = email;
  this.phone = phone;
};

;
var _default = User;
exports["default"] = _default;