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
import { Layout, Typography } from '../../styles';
import * as participantsActions from '../../store/actions/participants';
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
import { icons } from '../../constants/Icons';
import BodyText from '../../components/BodyText';
import CustomButton from '../../components/CustomButton';
import HeaderButton from '../../components/HeaderButton';
import PollButton from '../../components/PollButton';
import EditPoll from '../../components/EditPoll';
import SelectDate, {DATE, TIME} from '../../components/SelectDate';
import ActiveFrame from '../../components/ActiveFrame';
import AddDate from '../../components/AddDate';
import RenderDate from '../../components/RenderDate';

const FIELD_HEIGHT = hp("14%");
const LOCATION_POLL = 0;
const DATE_POLL = 1;
const currDate = (new Date(Date.now()));
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
  const [eventName, setEventName] = useState('');
  const [eventNameSet, setEventNameSet] = useState(false);
  const [location, setLocation] = useState('');
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
  const [isElementsOnOneRow, setIsElementsOnOneRow] = useState(Dimensions.get('window').width > 500);
  const [locationPoll, setLocationPoll] = useState({});
  const [datePoll, setDatePoll] = useState({});
  const [showLocationPollModal, setShowLocationPollModal] = useState(false);
  const [showDatePollModal, setShowDatePollModal] = useState(false);
  const locationRef = useRef();
  const participants = useSelector(state => state.participants.participants);
  
  const dispatch = useDispatch();
 
  const flexContainer = useCallback((flexSize) => {
    return (
      {flex: flexSize, padding: wp("1%")}
    );
  }, []);
  const updateLayout = useCallback(() => {
    const newWidth = Dimensions.get('window').width;
    if (newWidth > 500) {
      setIsElementsOnOneRow(true);  
    } else {
      setIsElementsOnOneRow(false);
    }
  }, []);
  const cleanup = () => {
    Dimensions.removeEventListener('change', updateLayout);
    dispatch(participantsActions.setParticipants([]));
  };

  useEffect(() => {
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return cleanup;
  }, []);

  const setLocationPollHandler = useCallback((answers) => {
    setShowLocationPollModal(false);
    setLocationPoll({pollAnswers: answers});
  },[]);

  const showLocationPollHandler = useCallback(() => {
    setShowLocationPollModal(true);
  }, []);

  const setDatePollHandler = useCallback((answers) => {
    setShowDatePollModal(false);
    setDatePoll({pollAnswers: answers});
  }, []);

  const showDatePollHandler = useCallback(() => {
    setShowDatePollModal(true);
  }, []);

  const isPollHasAnswers = useCallback((pollObject) => {
    return pollObject !== undefined &&
           pollObject.pollAnswers !== undefined &&
           pollObject.pollAnswers.length > 0;
  }, []);
  
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
    const navigateNextScreen = () => {
      if (eventName) {
        console.log("CRAETE EVENT eventData=" + JSON.stringify(eventData));
        props.navigation.navigate('CreateEventSecond', {
          eventData: eventData,
        });
      } else {
        Alert.alert('Cannot create event', 'Please add name of event', [{ text: 'Okay' }]);
      }
    }
      props.navigation.setParams({nextScreen : navigateNextScreen});
  }, [eventName, participants, location, locationPoll, eventStartDate, eventEndDate, datePoll]);
  
  const addParticipantsHandler = useCallback(() => {
    props.navigation.navigate('AddParticipant');
  }, []);

  const eventNameBlurHandler = useCallback(async () => {
    setEventNameSet(eventName !== undefined && eventName.length > 0);
  }, []);

  const locationNameBlurHandler = useCallback((text) => {
    setLocationNameSet(text !== undefined && text.length > 0);
  }, []);

  const changeStartDate = useCallback((name, value,  isSet) => {
    setEventStartDate({...eventStartDate, [name] :{value, isSet: isSet}});
    // setting end date or hour to start selecting from the start date or hour
    if (!eventEndDate.date.isSet && name === DATE || !eventEndDate.time.isSet && name === TIME) {
      setEventEndDate({...eventEndDate, [name] :{value}});
    }
  }, [eventStartDate, eventEndDate]);

  const changeEndDate = useCallback((name, value, isSet) => {
    setEventEndDate({...eventEndDate, [name] :{value, isSet: isSet}});
  }, [eventEndDate]);

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
                    placeholder='Event Name'
                    paddingHorizontal={5}
                    borderWidth={0}
                    maxFontSizeMultiplier={1.6}
                    returnKeyType='next'
                    returnKeyLabel={'Next'}
                    fontSize={Typography.mediumLarge}
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
                    placeholder='Event Location'
                    ref = {locationRef}
                    paddingHorizontal={5}
                    borderWidth={0}
                    maxFontSizeMultiplier={1.6}
                    blurOnSubmit={true}
                    returnKeyType='done'
                    textAlignVertical='center'
                    onBlur={() => locationNameBlurHandler(location)}
                    fontSize={Typography.mediumLarge}
                    blurOnSubmit={true}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(text) => setLocation(text)}
                  />        
                </View>  
              </ActiveFrame>
            </View>
            <View style={{...flexContainer(1), alignItems: 'center', justifyContent: 'center'}}>
                <ActiveFrame 
                  isActive={isPollHasAnswers(locationPoll)}
                  isSquare={true}
                >
                  <PollButton
                    isActive={isPollHasAnswers(locationPoll)}
                    onPress={showLocationPollHandler}
                    create={true}
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActiveFrame 
                isActive={isPollHasAnswers(datePoll)}
                isSquare={true}
              >
                <PollButton
                  isActive={isPollHasAnswers(datePoll)}
                  onPress={showDatePollHandler}
                  create={true}
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
                onPress={addParticipantsHandler}
                icon={
                  <FontAwesome 
                  name='group'
                  size={hp("6%")} 
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
        iconName={'md-checkmark'}
        onPress={navData.navigation.getParam('nextScreen')}
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
    ...Layout.field,
    height: FIELD_HEIGHT,
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
    paddingHorizontal: wp("5%"),
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
    fontSize: Typography.small,
    flexWrap: 'wrap',
  },
  selectedParticipants: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
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
    ...Layout.shadow,
    textAlign: 'center',
    paddingHorizontal: wp("1.3%"),
    marginHorizontal: wp("0.4%"),
    marginVertical: hp("0.3%"),
    backgroundColor: Colors.lightGreeny,
    height: 31,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedParticipantText: {
    fontSize: hp("2%"),
    fontFamily: 'jaldi-bold',
  },
  participantsBoxHolder: {
    flex: 1,
    width: wp("52%"),
  },
  locationSelect: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: FIELD_HEIGHT * 0.85
  },
});

export default CreateEventScreen;