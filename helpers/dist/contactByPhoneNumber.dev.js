"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContactByPhoneNumber = exports.createContactsByPhoneNumberTable = void 0;
var contactsByPhoneNumber;

var createContactsByPhoneNumberTable = function createContactsByPhoneNumberTable(contacts) {
  contactsByPhoneNumber = {};
  var countContacts = 0;
  var countPhones = 0;

  for (var contactKey in contacts) {
    countContacts++;

    for (var phoneKey in contacts[contactKey].phoneNumbers) {
      countPhones++; // inside contact phone numbers array

      contactsByPhoneNumber[contacts[contactKey].phoneNumbers[phoneKey]] = contacts[contactKey];
    }
  }
}; // returns undefiend on unwanted phoneNumbers


exports.createContactsByPhoneNumberTable = createContactsByPhoneNumberTable;

var getContactByPhoneNumber = function getContactByPhoneNumber(phoneNumber) {
  return contactsByPhoneNumber[phoneNumber] || phoneNumber;
};

exports.getContactByPhoneNumber = getContactByPhoneNumber;