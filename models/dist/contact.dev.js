"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function Contact(localId, firstName, lastName, phoneNumbers) {
  _classCallCheck(this, Contact);

  this.localId = localId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumbers = phoneNumbers;
};

;
var _default = Contact;
exports["default"] = _default;