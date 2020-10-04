"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.setUser = exports.LOGOUT = exports.SET_USER = void 0;

var firebase = _interopRequireWildcard(require("firebase"));

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SET_USER = 'SET_USER';
exports.SET_USER = SET_USER;
var LOGOUT = 'LOGOUT';
exports.LOGOUT = LOGOUT;

var setUser = function setUser(user) {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (user) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            //check if exists
            firebase.database().ref('/users/').once('value', function (snapshot) {
              var users = snapshot.val();
              var isExists = false;
              var refKey;

              for (var key in users) {
                if (user.phoneNumber === users[key].phoneNumber) {
                  isExists = true;
                  refKey = key;
                  break;
                }
              }

              if (isExists) {
                var oldUser = new _user["default"](user.phoneNumber, refKey);
                dispatch({
                  type: SET_USER,
                  user: oldUser
                });
              } else {
                // new user
                var ref = firebase.database().ref('/users/').push({
                  phoneNumber: user.phoneNumber
                }) // .(user.phoneNumber)
                .then(function () {
                  console.log("\nuser then=");
                  console.log("\nuser then ref =" + JSON.stringify(ref));
                  var newUser = new _user["default"](user.phoneNumber, ref);
                  dispatch({
                    type: SET_USER,
                    user: newUser
                  });
                })["catch"](function (err) {
                  console.log('err=' + err.message);
                });
              }
            })["catch"](function (err) {
              console.log('err=' + err.message);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.setUser = setUser;

var logout = function logout() {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            firebase.auth().signOut();
            dispatch({
              type: LOGOUT
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.logout = logout;