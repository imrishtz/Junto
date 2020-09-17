import React, { useState, useCallback, useEffect, useRef, seReducer } from 'react';
import {
  Button,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  AsyncStorage,
  TextInput,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as eventsActions from '../../store/actions/events';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, MaterialIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AddText from '../../components/AddText';
import RenderText from '../../components/RenderText';
import Colors from '../../constants/Colors';
import IconSelect from '../../components/IconSelect';
import { icons } from '../../constants/CardRightIcons';
import BodyText from '../../components/BodyText';
import CustomButton from '../../components/CustomButton';
import HeaderButton from '../../components/HeaderButton';
import * as participantsActions from '../../store/actions/participants';
import PollButton from '../../components/PollButton';
import EditPoll from '../../components/EditPoll';
import DateTimePickerS from '../../components/DateTimePickerS';
import AdjustableButton from '../../components/AdjustableButton';
import SelectDate, {DATE, TIME} from '../../components/SelectDate';
import ActiveFrame from '../../components/ActiveFrame';
import AddDate from '../../components/AddDate';
import RenderDate from '../../components/RenderDate';

const FIELD_HEIGHT = hp("14%");
const LOCATION_POLL = 0;
const DATE_POLL = 1;
const currDate = new Date(Date.now());
let extraKey = 0;
let eventData;
const showSelectedParticipants = (participants, onPress) => {
  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.scrollContainer}>
    <ScrollView 
      nestedScrollEnabled={true}
      persistentScrollbar={true}
      snapToAlignment='center'
    >
      <TouchableCmp
        onPress={onPress}
        activeOpacity={0.6}
      >
        <View style={styles.participantsBoxHolder}>
          <View style={styles.selectedParticipants}>
            {participants.map((participant) => {
              return (
                <View 
                  key={participant.phoneNumbers[0] + extraKey++}
                  style={styles.selectedBoxTouchable}
                >
                  <View 
                    style={styles.selectedBox}>
                    <BodyText 
                      style={styles.selectedParticipantText}
                      numberOfLines={1}
                    >
                      {participant.firstName}
                    </BodyText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableCmp>
    </ScrollView>
  </View>
  );
}


const CreateEventScreen = props => {
  const [textInputWidth, setTextInputWidth] = useState(180);
  const [eventName, setEventName] = useState('');
  const [eventNameSet, setEventNameSet] = useState(false);
  const [location, setLocation] = useState();
  const [locationNameSet, setLocationNameSet] = useState();
  const [eventStartDate, setEventStartDate] = useState({
    time: {value: currDate, isSet: false},
    date: {value: currDate, isSet: false},
  });
  const [eventEndDate, setEventEndDate] = useState({
    time: {value: currDate, isSet: false},
    date: {value: currDate, isSet: false},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState(icons[0]);
  const [error, setError] = useState();
  const [contacts, setContacts] = useState([]);
  const [isElementsOnOneRow, setIsElementsOnOneRow] = useState(Dimensions.get('window').width > 500);
  const [locationPoll, setLocationPoll] = useState({});
  const [datePoll, setDatePoll] = useState({});
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [showLocationPollModal, setShowLocationPollModal] = useState(false);
  const [showDatePollModal, setShowDatePollModal] = useState(false);
  const dispatch = useDispatch();
  const eventRef = useRef();
  const locationRef = useRef();
  const participants = useSelector(state => state.participants.participants);
  const flexContainer = (flexSize) => {
    return (
      {flex: flexSize, padding: wp("1%")}
    ) ;
  }
  const updateLayout = () => {
    const newWidth = Dimensions.get('window').width;
    setScreenWidth(newWidth);
    setTextInputWidth(newWidth * 0.52);
    if (newWidth > 500) {
      setIsElementsOnOneRow(true);  
    } else {
      setIsElementsOnOneRow(false);
    }
  };
  const cleanup = () => {
    dispatch(participantsActions.setParticipants([]));
    Dimensions.removeEventListener('change', updateLayout);
  };
  useEffect(() => {
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return cleanup;
  }, []);
  const setLocationPollHandler = (answers) => {
    setShowLocationPollModal(false);
    setLocationPoll({pollAnswers: answers});
  }
  const showLocationPollHandler = () => {
    setShowLocationPollModal(true);
  }
  const setDatePollHandler = (answers) => {
    setShowDatePollModal(false);
    setDatePoll({pollAnswers: answers});
  }
  const showDatePollHandler = () => {
    setShowDatePollModal(true);
  }
  const isPollHasAnswers = (pollObject) => {
    return pollObject !== undefined &&
           pollObject.pollAnswers !== undefined &&
           pollObject.pollAnswers.length > 0;
  }
  
  useEffect(() => {
    eventData = {...eventData,
        eventName : eventName,
        participants: participants,
        eventStartDate: eventStartDate,
        eventEndDate: eventEndDate,
        datePoll: datePoll,
        location: location,
        locationPoll: locationPoll,
    };
      props.navigation.setParams({eventData : eventData});
  }, [eventName, participants, location, locationPoll, eventStartDate, eventEndDate, datePoll]);


  const submitHandler = useCallback(async () => {
    console.log("submitHandler IMRI");
    if (!eventName) {
      console.log("submitHandler IMRI !isValid");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      console.log(" CreateEventScreenparticipants=" + JSON.stringify(participants));
      await dispatch(
        eventsActions.createEvent(
          eventName,
          {from: '19:00 20/5', to: '12:00 21/5'},//formState.inputValues.date,
          location,
          locationPoll,
          { name: 'Partying', icon: 'ios-menu'},// formState.inputValues.type,
          participants,// formState.inputValues.participants,
          ['cooler', 'shade'],// formState.inputValues.equipGroup,
          ['pants', 'shirts'],// formState.inputValues.equipPersonal,
          [{name: 'josh', responsibility: 'music'}, {name: 'benny', responsibility: 'sleep'}],// formState.inputValues.responsibilities
          icon,
          )
      );
      props.navigation.popToTop();
    } catch (err) {
      console.log("submitHandler IMRI err=" + err);
      setError(err.message);
    }
    setIsLoading(false);

  }, [dispatch, eventName, participants, location, locationPoll]);
  

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  
  const addParticipantsHandler = () => {
    props.navigation.navigate('AddParticipant');
  }
  
  const eventNameBlurHandler = async () => {
    setEventNameSet(eventName !== undefined && eventName.length > 0);
  }
  const locationNameBlurHandler = (text) => {
    setLocationNameSet(text !== undefined && text.length > 0);
  }  

  const changeStartDate = (name, value, isSet) => {
    setEventStartDate({...eventStartDate, [name] :{value, isSet: isSet}});
    // setting end date or hour to start selecting from the start date or hour
    if (!eventEndDate.date.isSet && name === DATE || !eventEndDate.time.isSet && name === TIME) {
      setEventEndDate({...eventEndDate, [name] :{value}});
    }
  }
  const changeEndDate = (name, value, isSet) => {
    setEventEndDate({...eventEndDate, [name] :{value, isSet: isSet}});
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator 
          size='large'
          color={Colors.primary}
        />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView >
        <View style={styles.screen}>
          <View style={styles.field}>
            <View style={flexContainer(1)}>
              <View style={styles.icon}>
                <View style={styles.noFrameIcon}>
                  <MaterialIcons
                    name='copyright'
                    size={40} 
                    color={Colors.primary}
                  />
                </View>
              </View>
            </View>
            <View style={flexContainer(7)}>
              <ActiveFrame isActive={eventNameSet} isInput={true}>
                <View style={styles.input}>
                  <TextInput
                    value={eventName}
                    ref={eventRef}
                    placeholder='Event Name...'
                    paddingHorizontal={5}
                    borderWidth={0}
                    maxFontSizeMultiplier={1.6}
                    returnKeyType='next'
                    returnKeyLabel={'Next'}
                    fontSize={hp("3%")}
                    allowFontScaling={false}
                    multiline={true}
                    numberOfLines={2}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      locationRef.current.focus();
                    }}
                    onBlur={() => eventNameBlurHandler()}
                    onChangeText={(text) => setEventName(text)}
                    />
                </View>
              </ActiveFrame>
            </View>
          </View>
          <View style={styles.field}>
            <View style={flexContainer(1)}>
              <View style={styles.icon}>
                <View style={{marginLeft: 2}}>
                  <MaterialIcons
                    name='location-on'
                    size={35} 
                    color={Colors.primary}
                    />
                </View>
              </View>
            </View>
            <View style={flexContainer(5)}>
              <ActiveFrame isActive={locationNameSet} isInput={true}>
                <View style={styles.input}>
                  <TextInput
                    value={location}
                    placeholder='Event Location...'
                    ref = {locationRef}
                    paddingHorizontal={5}
                    borderWidth={0}
                    maxFontSizeMultiplier={1.6}
                    blurOnSubmit={true}
                    returnKeyType='done'
                    textAlignVertical='center'
                    onBlur={() => locationNameBlurHandler(location)}
                    fontSize={hp("2.5%")}
                    blurOnSubmit={true}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(text) => setLocation(text)}
                  />        
                </View>  
              </ActiveFrame>
            </View>
            <View style={{...flexContainer(2), alignItems: 'center', justifyContent: 'center'}}>
                <ActiveFrame 
                  isActive={isPollHasAnswers(locationPoll)}
                  isSquare={true}
                >
                  <PollButton
                    isActive={isPollHasAnswers(locationPoll)}
                    onPress={showLocationPollHandler}
                  />
                </ActiveFrame>
            </View>
          </View>
          <EditPoll 
            type='Location' 
            PollRender={RenderText}
            PollAddFunction={AddText}
            pollAnswers={[]}
            onSetAnswers={setLocationPollHandler}
            showPoll={showLocationPollModal}
            onDismiss={() => setShowLocationPollModal(false)}
          />
          <View style={{...styles.field, height: FIELD_HEIGHT * (isElementsOnOneRow?  1.4 : 3)}}>
            <View style={flexContainer(1)}>
              <View style={styles.icon}>
                <View style={{marginLeft: 8}}>
                  <Fontisto
                    name='date'
                    size={25} 
                    color={Colors.primary}
                  />
                </View>
              </View>
            </View>
            <View style={{...flexContainer(5)}}>
              <View style={{...styles.bothDates, ...(isElementsOnOneRow? null : styles.toColumn)}}>
                <View style={{ ...styles.singleDate}}>
                  <ActiveFrame isActive={eventStartDate.date.isSet}>
                    <SelectDate
                      isActive={eventStartDate.date.isSet}
                      initialDate={eventStartDate} 
                      onChange={changeStartDate} 
                      title='Start'
                    />
                  </ActiveFrame >
                </View>
                <View style={{ ...styles.singleDate}}>
                  <ActiveFrame isActive={eventEndDate.date.isSet || eventEndDate.time.isSet}>
                      <SelectDate
                        isActive={eventEndDate.date.isSet || eventEndDate.time.isSet}
                        initialDate={eventEndDate}
                        onChange={changeEndDate} 
                        title='End'
                      />  
                  </ActiveFrame>
                </View>
              </View>
            </View>
            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <ActiveFrame 
                isActive={isPollHasAnswers(datePoll)}
                isSquare={true}
              >
                <PollButton
                  isActive={isPollHasAnswers(datePoll)}
                  onPress={showDatePollHandler}
                />
              </ActiveFrame>
            </View>
          </View>
          <EditPoll 
            type='Date' 
            PollRender={RenderDate}
            PollAddFunction={AddDate}
            pollAnswers={[]}
            onSetAnswers={setDatePollHandler}
            showPoll={showDatePollModal}
            onDismiss={() => setShowDatePollModal(false)}
          />
          <View style={{...styles.field, height: FIELD_HEIGHT * 1.3, justifyContent: 'space-evenly'}}>
            <View style={styles.button}>
              <CustomButton
                style={{width: 65, height: 65}}
                onPress={addParticipantsHandler}
                icon={
                  <FontAwesome 
                  name='group'
                  size={40} 
                  color={'black'}
                />}>
              </CustomButton>
              <BodyText style={styles.buttonText}>
                Participants
              </BodyText>
            </View>
            {participants && participants.length > 0 ?
              showSelectedParticipants(participants, addParticipantsHandler)
            : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


CreateEventScreen.navigationOptions = navData => { 
  const submit = navData.navigation.getParam('submit');
  return {
    title: 'Create Event',
    headerLeft: () =>
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Back"
        iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
        onPress={() => {
          navData.navigation.pop();
        }}
      />
    </HeaderButtons>,
    headerRight: () =>
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Next"
        iconName={Platform.OS === 'android' ? 'md-arrow-forward' : 'ios-arrow-forward'}
        onPress={() => {
          navData.navigation.navigate('CreateEventSecond', {
            eventData: eventData,
          });
        }}
      />
    </HeaderButtons>
  }
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  screen: {
    flex: 1,
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  input: {
    alignSelf: 'stretch',
    minHeight: hp("9%"),
    justifyContent: 'center',

  },
  field: {
    flex: 1,
    width: '100%',
    height: FIELD_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
  },
  iconSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginRight: "3%",
    fontSize: 16,
  },
  poll: {
    position: 'absolute',
  },
  activePoll: {
    flex: 1,
    backgroundColor: Colors.lightGreeny,
    width: 50,
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  icon: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    marginRight: 5,
  },
  bothDates: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  toColumn:{
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  singleDate: {
    marginVertical: 5,
  },
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp("2%"),
    flexWrap: 'wrap',
  },
  selectedParticipants: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    width: wp("52%"),
    margin: "0.7%",
    marginTop: 5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.lavender,
    paddingTop: 1,
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  selectedBoxTouchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedBox: {
    flexWrap: 'wrap',
    borderRadius: 15,
    textAlign: 'left',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: 5,
    paddingHorizontal: "2%",
    margin: 1.5,
    backgroundColor: Colors.lightGreeny,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedParticipantText: {
    fontSize: hp("1.8%"),
    fontFamily: 'jaldi-bold',
  },
  participantsBoxHolder: {
    flex: 1,
    width: wp("52%"),
    height: hp("20%")
  },
  locationSelect: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: FIELD_HEIGHT * 0.85
  },

});

export default CreateEventScreen;