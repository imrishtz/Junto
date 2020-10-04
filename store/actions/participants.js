export const SET_PARTICIPANTS = 'SET_PARTICIPANTS';

export const setParticipants = (participants) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PARTICIPANTS,
      participants: participants
    });
  };
}