"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEvent = exports.updateEventField = exports.createEvent = exports.fetchEvents = exports.setupEventListener = exports.FETCHING = exports.DELETE_EVENT = exports.UPDATE_EVENT = exports.SET_PARTICIPANTS = exports.SET_EVENTS = exports.CREATE_EVENT = void 0;

var _event = _interopRequireWildcard(require("../../models/event"));

var firebase = _interopRequireWildcard(require("firebase"));

require("@firebase/database");

require("../../polyfills");

var _SelectDate = require("../../components/SelectDate");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CREATE_EVENT = 'CREATE_EVENT';
exports.CREATE_EVENT = CREATE_EVENT;
var SET_EVENTS = 'SET_EVENTS';
exports.SET_EVENTS = SET_EVENTS;
var SET_PARTICIPANTS = 'CHANGE_PARTICIPANTS';
exports.SET_PARTICIPANTS = SET_PARTICIPANTS;
var UPDATE_EVENT = 'UPDATE_EVENT';
exports.UPDATE_EVENT = UPDATE_EVENT;
var DELETE_EVENT = 'DELETE_EVENT';
exports.DELETE_EVENT = DELETE_EVENT;
var FETCHING = 'FETCHING';
exports.FETCHING = FETCHING;

var setupEventListener = function setupEventListener(eventId) {
  return function _callee(dispatch, getState) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            firebase.database().ref('/events/' + eventId + '/').on('value', function (snapshot) {
              var newEvent = snapshot.val(); // case item has been deleted

              if (newEvent === null) {
                return;
              }

              newEvent.id = eventId;
              dispatch({
                type: UPDATE_EVENT,
                event: newEvent
              });
            });
            _context.next = 7;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 4]]);
  };
};

exports.setupEventListener = setupEventListener;

var fetchEvents = function fetchEvents() {
  return function (dispatch, getState) {
    var user = getState().user.user; // any async code you want!

    console.log('fetch events');
    console.log('user =' + user.phoneNumber);
    console.log('user =' + JSON.stringify(user));
    dispatch({
      type: FETCHING
    });

    try {
      var resData;
      var loadedEvents = [];
      firebase.database().ref('/events/').once('value').then(function (snapshot) {
        resData = snapshot.val();

        for (var key in resData) {
          var participants = resData[key].participants;

          for (var participantKey in participants) {
            for (var phoneKey in participants[participantKey].phoneNumbers) {
              if (participants[participantKey].phoneNumbers[phoneKey] === user.phoneNumber) {
                dispatch(setupEventListener(key));
                loadedEvents.push(new _event["default"](key, resData[key].ownerId, resData[key].name, resData[key].date, resData[key].location, resData[key].locationPoll, resData[key].type, resData[key].participants, resData[key].equipGroup, resData[key].equipPersonal, resData[key].responsibilities, resData[key].icon));
              }
            }
          }
        }

        dispatch({
          type: SET_EVENTS,
          events: loadedEvents
        });
      });
    } catch (err) {
      throw err;
    }
  };
};

exports.fetchEvents = fetchEvents;

var createEvent = function createEvent(name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) {
  return function _callee2(dispatch, getState) {
    var userPhone, newReference;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userPhone = getState().user.user.phoneNumber;
            participants = editParticipants(participants);
            newReference = firebase.database().ref('/events/').push();
            newReference.set({
              name: name,
              date: date,
              location: location,
              locationPoll: locationPoll,
              type: type,
              participants: participants,
              equipGroup: equipGroup,
              equipPersonal: equipPersonal,
              responsibilities: responsibilities,
              icon: icon
            }).then(function () {
              dispatch({
                type: CREATE_EVENT,
                eventData: {
                  id: newReference.key,
                  name: name,
                  date: date,
                  location: location,
                  locationPoll: locationPoll,
                  type: type,
                  participants: participants,
                  equipGroup: equipGroup,
                  equipPersonal: equipPersonal,
                  responsibilities: responsibilities,
                  icon: icon,
                  ownerId: userPhone
                }
              });
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.createEvent = createEvent;

var updateEventField = function updateEventField(event, newField, fieldType) {
  return function _callee3(dispatch, getState) {
    var eventField, locationPoll;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            eventField = {};
            _context3.t0 = fieldType;
            _context3.next = _context3.t0 === _event.NAME ? 4 : _context3.t0 === _SelectDate.DATE ? 6 : _context3.t0 === _event.LOCATION ? 8 : _context3.t0 === _event.LOCATION_POLL ? 10 : _context3.t0 === _event.TYPE ? 14 : _context3.t0 === _event.PARTICIPANTS ? 16 : _context3.t0 === _event.EQUIP_GROUP ? 18 : _context3.t0 === _event.EQUIP_PERSONAL ? 20 : _context3.t0 === _event.RESPONSIBILITIES ? 22 : _context3.t0 === _event.ICON ? 24 : 26;
            break;

          case 4:
            eventField.name = newField;
            return _context3.abrupt("break", 26);

          case 6:
            eventField.date = newField;
            return _context3.abrupt("break", 26);

          case 8:
            eventField.location = newField;
            return _context3.abrupt("break", 26);

          case 10:
            locationPoll = event.locationPoll;
            locationPoll.pollAnswers = newField;
            eventField.locationPoll = locationPoll;
            return _context3.abrupt("break", 26);

          case 14:
            eventField.type = newField;
            return _context3.abrupt("break", 26);

          case 16:
            eventField.participants = newField;
            return _context3.abrupt("break", 26);

          case 18:
            eventField.equipGroup = newField;
            return _context3.abrupt("break", 26);

          case 20:
            eventField.equipPersonal = newField;
            return _context3.abrupt("break", 26);

          case 22:
            eventField.responsibilities = newField;
            return _context3.abrupt("break", 26);

          case 24:
            eventField.icon = newField;
            return _context3.abrupt("break", 26);

          case 26:
            firebase.database().ref('/events/' + event.id + '/').update(eventField);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.updateEventField = updateEventField;

var deleteEvent = function deleteEvent(id) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            firebase.database().ref('/events/' + id + '/').set(null).then(function () {
              dispatch({
                type: DELETE_EVENT,
                eventId: id
              });
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.deleteEvent = deleteEvent;

var editParticipants = function editParticipants(participants) {
  if (participants.length > 0) {
    var participantsForUpload = participants.map(function (participant) {
      return {
        phoneNumbers: participant.phoneNumbers,
        isOrganizer: participant.isOrganizer
      };
    });
    return participantsForUpload;
  } else {
    return participants;
  }
};