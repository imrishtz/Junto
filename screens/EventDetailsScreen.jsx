import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet, 
  ScrollView, 
  Linking,
  TouchableOpacity,
  Alert, TouchableNativeFeedback
} from 'react-native';
import BodyText from '../components/BodyText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Layout, Typography } from '../styles/index';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import { FontAwesome, Fontisto, MaterialIcons } from '@expo/vector-icons';
import RenderDate from '../components/RenderDate';
import DateText from '../components/DateText';
import { dateToStrDate, dateToStrHour } from '../helpers/dateToStringConverter';
import PollButton from '../components/PollButton';
import Poll from '../components/Poll';
import RenderText from '../components/RenderText';
import { useDispatch, useSelector } from 'react-redux';
import * as eventsActions from '../store/actions/events';
import { LOCATION_POLL } from '../models/event';
import ShowParticipants from '../components/ShowParticipants';
import { getContactByPhoneNumber } from '../helpers/contactByPhoneNumber';

const FIELD_HEIGHT = hp("15%");

const EventDetailsScreen = props => {

  const [showLocationPollModal, setShowLocationPollModal] = useState(false);
  
  const eventId = props.navigation.getParam('event').id;
  const user = useSelector(state => state.user.user);
  const event = useSelector(state => state.events.availableEvents.find((event) => event.id === eventId));
  const [locationPollAnswers, setLocationPollAnswers] = useState(event && event.locationPoll && event.locationPoll.pollAnswers);
  const [participants, setParticipants] = useState([]);

  if (event === null) {
    return;
  }
  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  
  useEffect(()=> {
    setLocationPollAnswers(event && event.locationPoll && event.locationPoll.pollAnswers);
    // for () {}
    let tempParticipants = [];
    const participantsEventData = event && event.participants;
    for (const key in participantsEventData) {
      for (const phoneKey in participantsEventData[key].phoneNumbers) {
        let participant = getContactByPhoneNumber(participantsEventData[key].phoneNumbers[phoneKey]);
        if (typeof participant === 'string') {
          participant = {phoneNumbers: [participant]};
        }
        participant.isOrganizer = participantsEventData[key].isOrganizer;
        console.log('tempParticipants participant=' + JSON.stringify(participant));
        tempParticipants.push(participant);
      }
    }
    tempParticipants.sort((a, b) => {
      if (a.phoneNumbers[0] === user.phoneNumber) {
        return -1;
      } else if (b.phoneNumbers[0] === user.phoneNumber) {
        return 1;
      }
      if(a.firstName < b.firstName) { 
        return -1; 
      }
      if(a.firstName > b.firstName) { 
        return 1; 
      }
      return 0;
    });
    setParticipants(tempParticipants);
  }, [event, user])
  const dispatch = useDispatch();
  // TODO copy event
  const locationPressedHandler = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const label = event.location;
    const url = Platform.select({
      ios: `${scheme}${label}@`,
      android: `${scheme}${label}`
    });

    Linking.openURL(url);
  }

  const showLocationPollHandler = () => {
    // TODO select answer
  }

  const approveAnswers = async () => {
    try {
      await dispatch(eventsActions.updateEventField(event, locationPollAnswers, LOCATION_POLL));
    } catch (err) {
      console.log("ERROR " + err);
    }
    setShowLocationPollModal(false);
  }

  const selectAnswerHandler = useCallback((answer, index) => {
    if (answer.participantsSelected === undefined) {
      answer.participantsSelected = [];
    } else {
      let participantIndex = 0;
      for (const participant of answer.participantsSelected) {
        if (user.phoneNumber === participant) {
          // user wants to un-select
          setLocationPollAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            newAnswers[index].participantsSelected.splice(participantIndex, 1);
            return newAnswers;
          })
          return;
        }
        participantIndex++;
      }
    }
    setLocationPollAnswers((prevAnswers) => {
      let newAnswers = [...prevAnswers];
      newAnswers[index].participantsSelected.push(user.phoneNumber);
      return newAnswers;
    })
  }, [user]);
  const isMarked = useCallback((answer) => {
    if (answer.participantsSelected !== undefined) {
      for (const participant of answer.participantsSelected) {
        if (user.phoneNumber === participant) {
          return true;
        }
      }
    }
    return false;
  }, []);
  const strStartTime = dateToStrHour(event && event.date && event.date.start && event.date.start.time);
  const strStartDate = dateToStrDate(event && event.date && event.date.start && event.date.start.date);
  const strEndTime = dateToStrHour(event && event.date && event.date.end && event.date.end.time);
  const strEndDate = dateToStrDate(event && event.date && event.date.end && event.date.end.date);
  const fullDateStr = {
    start: {time: strStartTime, date: strStartDate},
    end: {time: strEndTime, date: strEndDate}
  };

  const deleteEvent = useCallback( ()=> {
    Alert.alert('Are you sure?', 'Do you really want to delete this event?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          await dispatch(eventsActions.deleteEvent(eventId));
          props.navigation.popToTop();
        }
      }
    ]);
  }, []);

  return (
    <ScrollView 
    contentContainerStyle={styles.container}
    nestedScrollEnabled={true}
    >
      <View style={{...styles.field, height: FIELD_HEIGHT * 3/4}}>
        <View style={styles.iconHolder}>
          <MaterialIcons
            name='copyright'
            size={35} 
            color={Colors.primary}
          />
        </View>
        <View style={styles.contentHolder}>
          <BodyText style={styles.mainText}>
            {event && event.name}
          </BodyText>
        </View>
      </View>
      <View style={{...styles.field, height: FIELD_HEIGHT * 3/4}}>
        <View style={styles.iconHolder}>
          <MaterialIcons
            name='location-on'
            size={35} 
            color={Colors.primary}
          />
        </View>
        <View style={styles.contentHolder}>
          <TouchableOpacity onPress={locationPressedHandler}>
            <BodyText style={styles.contentText}>
              {event && event.location}
            </BodyText>
          </TouchableOpacity>
        </View>
        {(locationPollAnswers || (event && event.isOrganizer)) && 
        <View style={styles.pollHolder}>
          <PollButton isOrganizer={isOrganizer} create={false} onPress={() => setShowLocationPollModal(true)}/>
        </View> }
        {locationPollAnswers && <Poll
            type='Location'
            isMarked={isMarked}
            selectAnswerHandler={selectAnswerHandler}
            PollRender={RenderText}
            approveAnswers={approveAnswers}
            pollAnswers={locationPollAnswers}
            showPoll={showLocationPollModal}
            onDismiss={() => setShowLocationPollModal(false)}
           />}
        </View>
      <View style={styles.field}>
        <View style={styles.iconHolder}>
          <Fontisto
            name='date'
            size={30} 
            color={Colors.primary}
          />
        </View>
        <View style={styles.contentHolder}>
          <View style={styles.date}>
            <DateText date={fullDateStr} size={Typography.medium}/>
          </View>
        </View>
      </View>
      <View style={styles.field}>
        <View style={styles.iconHolder}>
          <FontAwesome
            name='group'
            size={30} 
            color={Colors.primary}
          />
          <BodyText style={styles.participantsCountText}>
            {event && event.participants.length}
          </BodyText>
        </View>
        <View style={styles.contentHolder}>
          <ShowParticipants participants={participants} width={wp("75%")}/>
        </View>
      </View>
      <View style={styles.field}>
        <TouchableCmp
          onPress={deleteEvent}
          activeOpacity={0.6}
        >
              <View style={styles.delete}>
            <MaterialIcons 
              name='delete'
              size={20} 
            />
            <BodyText style={styles.deleteText}>
              Delete event
            </BodyText>
          </View>
        </TouchableCmp>
      </View>
    </ScrollView>
  );
};

EventDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Event Details',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center' 
  },
  field: {
    ...Layout.field,
    width: wp("100%"),
    height: FIELD_HEIGHT,
  },
  iconHolder: {
    flex: 1,
    ...Layout.centered,
    paddingLeft: wp("3%"),
  },
  contentHolder: {
    flex: 7,
    marginHorizontal: wp("2%"),
    ...Layout.centered,
  },
  mainText: {
    fontSize: Typography.large,
    textAlign: 'center',
  },
  contentText: {
    ...Layout.centered,
    fontSize: Typography.medium,
  },
  deleteText: {
    fontSize: Typography.xsmall,
    textAlign: 'center',
    fontFamily: 'jaldi-bold',
  },
  participantsCountText: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontFamily: 'jaldi-bold',
  },
  delete: {
    ...Layout.shadow,
    ...Layout.centered,
    backgroundColor: Colors.grayish,
    borderRadius: 15,
    borderWidth: 0.5,
    padding: wp("1.5%"),
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
});

export default EventDetailsScreen;