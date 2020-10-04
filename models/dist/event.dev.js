"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyEvent = copyEvent;
exports["default"] = exports.COMING = exports.ICON = exports.RESPONSIBILITIES = exports.EQUIP_PERSONAL = exports.EQUIP_GROUP = exports.PARTICIPANTS = exports.TYPE = exports.LOCATION_POLL = exports.LOCATION = exports.DATE = exports.NAME = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NAME = 'name';
exports.NAME = NAME;
var DATE = 'date';
exports.DATE = DATE;
var LOCATION = 'location';
exports.LOCATION = LOCATION;
var LOCATION_POLL = 'locationPoll';
exports.LOCATION_POLL = LOCATION_POLL;
var TYPE = 'type';
exports.TYPE = TYPE;
var PARTICIPANTS = 'participants';
exports.PARTICIPANTS = PARTICIPANTS;
var EQUIP_GROUP = 'equipGroup';
exports.EQUIP_GROUP = EQUIP_GROUP;
var EQUIP_PERSONAL = 'equipPersonal';
exports.EQUIP_PERSONAL = EQUIP_PERSONAL;
var RESPONSIBILITIES = 'responsibilities';
exports.RESPONSIBILITIES = RESPONSIBILITIES;
var ICON = 'icon';
exports.ICON = ICON;
var COMING = 'coming';
exports.COMING = COMING;

var Event = function Event(id, ownerId, name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) {
  _classCallCheck(this, Event);

  this.id = id;
  this.ownerId = ownerId;
  this.name = name;
  this.date = date; // {from = x, to = y}

  this.location = location;
  this.locationPoll = locationPoll;
  this.type = type; // {name = typeName, icon = icon}

  this.participants = participants; // array

  this.equipGroup = equipGroup;
  this.equipPersonal = equipPersonal;
  this.responsibilities = responsibilities;
  this.icon = icon;
};

;

function copyEvent(otherEvent) {
  return new Event(otherEvent.id, otherEvent.ownerId, otherEvent.name, otherEvent.date, // {from = x, to = y}
  otherEvent.location, otherEvent.locationPoll, otherEvent.type, // {name = typeName, icon = icon}
  otherEvent.participants, // array
  otherEvent.equipGroup, otherEvent.equipPersonal, otherEvent.responsibilities, otherEvent.icon);
}

var _default = Event;
exports["default"] = _default;