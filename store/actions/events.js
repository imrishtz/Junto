
import Event, { EQUIP_GROUP, EQUIP_PERSONAL, ICON, LOCATION, LOCATION_POLL, NAME, PARTICIPANTS, RESPONSIBILITIES, TYPE } from '../../models/event'
import * as firebase from "firebase";
import "@firebase/database";
import '../../polyfills';
import { DATE } from '../../components/SelectDate';

export const CREATE_EVENT = 'CREATE_EVENT';
export const SET_EVENTS = 'SET_EVENTS';
export const SET_PARTICIPANTS = 'CHANGE_PARTICIPANTS';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const FETCHING = 'FETCHING';

export const setupEventListener = (eventId) => {
  return async (dispatch, getState) => {
    try {
      firebase.database()
        .ref('/events/' + eventId + '/')
        .on('value', (snapshot) => {
          let newEvent = snapshot.val();
          // case item has been deleted
          if (newEvent === null) {
            return;
          }
          newEvent.id = eventId;
          dispatch({ 
            type: UPDATE_EVENT, 
            event: newEvent,
          });
        });
    } catch (err) {
      throw err;
    }
  }
}

export const fetchEvents = () => {
  return (dispatch, getState) => {
    const user = getState().user.user;
    // any async code you want!
    console.log('fetch events');
    console.log('user =' + user.phoneNumber);
    console.log('user =' + JSON.stringify(user));
    dispatch({ 
      type: FETCHING, 
    });
    try {
      let resData;
      let loadedEvents = [];
      firebase.database()
        .ref('/events/').once('value')
        .then(snapshot => {
          resData = snapshot.val();
          for (const key in resData) {
            const participants = resData[key].participants;
            for (const participantKey in participants) {
              for (const phoneKey in participants[participantKey].phoneNumbers) {
                if (participants[participantKey].phoneNumbers[phoneKey] === user.phoneNumber) {
                  dispatch(setupEventListener(key));
                  loadedEvents.push(
                    new Event(
                      key,
                      resData[key].ownerId,
                      resData[key].name,
                      resData[key].date,
                      resData[key].location,
                      resData[key].locationPoll,
                      resData[key].type,
                      resData[key].participants,
                      resData[key].equipGroup,
                      resData[key].equipPersonal,
                      resData[key].responsibilities,
                      resData[key].icon
                    )
                  );
                }
              } 
            }
          }
          dispatch({ 
            type: SET_EVENTS, 
            events: loadedEvents, 
          });
      });
    } catch (err) {
      throw err;
    } 
  };
};

export const createEvent = (name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) => {
  return async (dispatch, getState) => {
    const userPhone = getState().user.user.phoneNumber;

    participants = editParticipants(participants);

    const newReference = firebase.database()
      .ref('/events/')
      .push();
    newReference
      .set({
        name: name,
        date: date, 
        location: location, 
        locationPoll: locationPoll, 
        type: type, 
        participants: participants, 
        equipGroup: equipGroup, 
        equipPersonal: equipPersonal, 
        responsibilities: responsibilities, 
        icon: icon
      })
      .then(() => {
        dispatch({
          type: CREATE_EVENT,
          eventData: {
            id: newReference.key,
            name,
            date,
            location,
            locationPoll,
            type,
            participants,
            equipGroup,
            equipPersonal,
            responsibilities,
            icon,
            ownerId: userPhone
          }
        });
      });
  };
};

export const updateEventField =  (event, newField, fieldType) => {
  return async (dispatch, getState) => {
    let eventField = {};
    switch (fieldType) {
      case NAME: 
        eventField.name = newField;
        break;
      case DATE: 
        eventField.date = newField;
        break;
      case LOCATION: 
        eventField.location = newField;
        break;
      case LOCATION_POLL: 
        let locationPoll = event.locationPoll;
        locationPoll.pollAnswers = newField;
        eventField.locationPoll = locationPoll;
        break;
      case TYPE: 
        eventField.type = newField;
        break;
      case PARTICIPANTS: 
        eventField.participants = newField;
        break;
      case EQUIP_GROUP: 
        eventField.equipGroup = newField;
        break;
      case EQUIP_PERSONAL: 
        eventField.equipPersonal = newField;
        break;
      case RESPONSIBILITIES: 
        eventField.responsibilities = newField;
        break;
      case ICON: 
        eventField.icon = newField;
        break;
    }
    firebase.database()
      .ref('/events/' + event.id + '/')
      .update(eventField);
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    firebase.database()
      .ref('/events/' + id + '/')
      .set(null)
      .then(() => {
        dispatch({ type: DELETE_EVENT, eventId: id });
      });
  }
}

const editParticipants = (participants) => {
  if (participants.length > 0) {
    let participantsForUpload = participants.map((participant) => {
      return ({
        phoneNumbers: participant.phoneNumbers,
        isOrganizer: participant.isOrganizer
      });
    });

    return participantsForUpload;
  } else {
    return participants;
  }
}
