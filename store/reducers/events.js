import Event, { copyEvent } from '../../models/event';
import {
  CREATE_EVENT,
  SET_EVENTS,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCHING
} from '../actions/events';

const initialState = {
  availableEvents: [],
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetching: true,
      }
    case SET_EVENTS:
      return {
        ...state,
        availableEvents: action.events,
        fetching: false,
      };
    case CREATE_EVENT:
      const newEvent = new Event(
        action.eventData.id,
        action.eventData.ownerId,
        action.eventData.name,
        action.eventData.date,
        action.eventData.location,
        action.eventData.locationPoll,
        action.eventData.type,
        action.eventData.participants,
        action.eventData.equipGroup,
        action.eventData.equipPersonal,
        action.eventData.responsibilities,
        action.eventData.icon,
      );
      return {
        ...state,
        availableEvents: state.availableEvents.concat(newEvent),
      };
    case UPDATE_EVENT: 
      const updatedEvent = copyEvent(action.event);
      for (const key in state.availableEvents) {
        if (state.availableEvents[key].id === updatedEvent.id) {
          const updatedAvailableEvents = [...state.availableEvents];
          updatedAvailableEvents[key] = updatedEvent;
          Object.assign(state.availableEvents, updatedAvailableEvents);
          return {
            ...state,
            availableEvents: updatedAvailableEvents
          }
        }
      }
      break;
    case DELETE_EVENT:
      return {
        ...state,
        availableEvents: state.availableEvents.filter(
          event => event.id !== action.id
        )
      }
  }
  return state;
};
