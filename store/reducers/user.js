import { 
  SET_USER,
  LOGOUT
} from '../actions/user';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {  
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
  }
  return state;
};
