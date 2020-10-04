import { 
  SET_CONTACTS 
} from '../actions/contacts';

const initialState = {
  contacts: []
};

export default (state = initialState, action) => {  
  switch (action.type) {
    case SET_CONTACTS:
      return {
        contacts: action.contacts,
      };
  }
  return state;
};
