import { 
  SET_PARTICIPANTS 
} from '../actions/participants';

const initialState = {
  participants: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTICIPANTS:
      return {
        participants: action.participants,
      };
  }
  return state;
};
