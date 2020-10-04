export const SET_CONTACTS = 'SET_CONTACTS';

export const setContacts = (contacts) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CONTACTS,
      contacts: contacts
    });
  };
}