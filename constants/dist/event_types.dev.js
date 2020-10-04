"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypes = getTypes;
exports.addType = addType;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = ['Pubing', 'Baring', 'Partying', 'Picnincing', 'Bacheloretting', 'Beaching', 'Pooling', 'BBQing', 'Skiing', 'Snowboarding', 'Running', 'Sporting', 'Walking', 'Tripping', 'Trekking', 'Celebrating', 'Birthdaying', 'Restauranting', 'Meeting', 'Mealing', 'Laking', 'Baking', 'Movie-watching', 'Serie-watching', 'Show-watching', 'Camping', 'Abroading', 'Flying', 'Pizzaing', 'Newborning', 'Bar-Mitzvaing', 'Bat-Mitzvaing', 'Jeeping', 'Pijamaing', 'Biking', 'Cycling', 'Quading', 'Trancing', 'Technoing', 'Dancing', 'Gyming', 'Balling', 'Hiking', 'Rivering', 'Drinking', 'Binging', 'Road-Tirpping', 'Bowling', 'Swimming', 'Riding', 'Learning', 'Painting', 'Gaming'];

var Types = function Types() {
  _classCallCheck(this, Types);

  this.types = types.sort();
};

var typeInstance = new Types();

function getTypes() {
  return typeInstance.types;
}

function addType(type) {
  if (types.indexOf(type) > -1) {
    types = [].concat(_toConsumableArray(type), [type]);
    typeInstance.types = types.sort;
  }
}