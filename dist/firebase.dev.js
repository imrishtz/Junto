"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initializeFirebase = void 0;

var firebase = _interopRequireWildcard(require("firebase"));

require("@firebase/auth");

require("@firebase/database");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Optionally import the services that you want to use
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
// Initialize Firebase
var initializeFirebase = function initializeFirebase() {
  var firebaseConfig = {
    apiKey: "AIzaSyA4cgGkV-RDaKG-2_lrnT8q0b5n2L0zNNM",
    authDomain: "junto-events.firebaseapp.com",
    databaseURL: "https://junto-events.firebaseio.com/",
    projectId: "junto-events",
    storageBucket: "junto-events.appspot.com",
    messagingSenderId: "733478651550",
    appId: "1:733478651550:web:371df95b2c32b2e8111d8f",
    measurementId: "G-B1KEBSE85M"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.log("e=" + e);
  }
};

exports.initializeFirebase = initializeFirebase;
var _default = firebase;
exports["default"] = _default;