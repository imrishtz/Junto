"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(id, ownerId, name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) {
  _classCallCheck(this, Event);

  this.id = id;
  this.ownerId = ownerId;
  this.name = name;
  this.date = date; // {from: x, to: y}

  this.location = location;
  this.locationPoll = locationPoll;
  this.type = type; // {name: typeName, icon: icon}

  this.participants = participants; // array

  this.equipGroup = equipGroup;
  this.equipPersonal = equipPersonal;
  this.responsibilities = responsibilities;
  this.icon = icon;
};

;
var _default = Event;
exports["default"] = _default;