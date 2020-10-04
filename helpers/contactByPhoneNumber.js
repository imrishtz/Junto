let contactsByPhoneNumber;

export const createContactsByPhoneNumberTable = (contacts) => {
  contactsByPhoneNumber = {};
  let countContacts = 0;
  let countPhones = 0;
  for (const contactKey in contacts) {
    countContacts++;
    for (const phoneKey in contacts[contactKey].phoneNumbers) {
      countPhones++;
      // inside contact phone numbers array
      contactsByPhoneNumber[contacts[contactKey].phoneNumbers[phoneKey]] = contacts[contactKey];
    }
  }
}

// returns undefiend on unwanted phoneNumbers
export const getContactByPhoneNumber = (phoneNumber) => {
  return contactsByPhoneNumber[phoneNumber] || phoneNumber;
}
