"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToStrHour = dateToStrHour;
exports.dateToStrDate = dateToStrDate;
exports.maybeGetFullStrDate = maybeGetFullStrDate;

function maybeAddStartingZero(obj) {
  var str = obj.toString();

  if (str.length === 1) {
    return '0' + str;
  }

  return str;
}

function dateToStrHour(date) {
  var fullDate = new Date(date);
  var hours = fullDate.getHours();
  var minutes = fullDate.getMinutes();
  return hours.toString() + ':' + maybeAddStartingZero(minutes);
}

;

function dateToStrDate(date) {
  var fullDate = new Date(date);
  var day = maybeAddStartingZero(fullDate.getDate());
  var month = maybeAddStartingZero(fullDate.getMonth() + 1);
  var year = fullDate.getFullYear().toString();
  return day + '/' + month + '/' + year.slice(0, 2).toString();
}

;

function maybeGetFullStrDate(rawDate) {
  var time = rawDate.time.isSet ? dateToStrHour(rawDate.time.value) : null;
  var date = rawDate.date.isSet ? dateToStrDate(rawDate.date.value) : null;
  return {
    eventTime: time,
    eventDate: date
  };
}