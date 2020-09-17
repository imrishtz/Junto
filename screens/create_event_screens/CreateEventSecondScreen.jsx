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

const FIELD_HEIGHT = hp("13.5%");
const LOCATION_POLL = 0;
const DATE_POLL = 1;
const currDate = new Date(Date.now());
let extraKey = 0;

const showSelectedParticipants = (participants) => {
  return (
    <View style={styles.scrollContainer}>
    <ScrollView 
      nestedScrollEnabled={true}
      persistentScrollbar={true}
      snapToAlignment='center'
    >
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
    </ScrollView>
  </View>
  );
}


const CreateEventSecondScreen = props => {
  const [textInputWidth, setTextInputWidth] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState(icons[0]);
  const [error, setError] = useState();
  const [contacts, setContacts] = useState([]);
  const [isElementsOnOneRow, setIsElementsOnOneRow] = useState(Dimensions.get('window').width > 500);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();
  console.log("CreateEventScreen participants=" + JSON.stringify(participants));
  console.log("CreateEventScreen datePoll=" + JSON.stringify(datePoll));
  console.log("CreateEventScreen PixelRatio.get()=" +  PixelRatio.get());

  const { eventName, participants, location, 
          locationPoll, eventStartDate, 
          eventEndDate, datePoll } = props.navigation.getParam("eventData");
    const data = props.navigation.getParam("eventData");

          console.log(new Date(Date.now()) + "CreateEventSecondScreen eventName = " + eventName);       
  console.log(new Date(Date.now()) + "CreateEventSecondScreen data = " + JSON.stringify(data));
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
    console.log("CreateEventScreen Cleand");
    dispatch(participantsActions.setParticipants([]));
    Dimensions.removeEventListener('change', updateLayout);
  };
  useEffect(() => {
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return cleanup;
  }, []);
  const setLocationPollHandler = (answers) => {
    console.log("$$$ CREATE answer= " + JSON.stringify(answers));
    setShowLocationPollModal(false);
    setLocationPoll({pollAnswers: answers});
  }
  const showLocationPollHandler = () => {
    setShowLocationPollModal(true);
  }
  const setDatePollHandler = (answers) => {
    console.log("$$$ CREATE answer= " + JSON.stringify(answers));
    setShowDatePollModal(false);
    setDatePoll({pollAnswers: answers});
  }
  const showDatePollHandler = () => {
    setShowDatePollModal(true);
  }
  const isPollHasAnswers = (pollType) => {
    let isHasAnswers = false;
    switch (pollType) {
      case LOCATION_POLL:
        isHasAnswers = locationPoll !== undefined && 
                       locationPoll.pollAnswers !== undefined &&
                       locationPoll.pollAnswers.length > 0;
        break;
      case DATE_POLL:
        isHasAnswers = datePoll !== undefined && 
                       datePoll.pollAnswers !== undefined &&
                       datePoll.pollAnswers.length > 0;
        break;
    }
    return  isHasAnswers;
  }

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
          {from: eventStartDate, to: eventEndDate},//formState.inputValues.date,
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
  
  const onSelectIcon = (iconKey) => {
    setIcon(icons.find((icon) => icon.key === iconKey));
  }

  const eventNameBlurHandler = (text) => {
    setEventNameSet(text && text.length > 0);
  }
  const locationNameBlurHandler = (text) => {
    setLocationNameSet(text && text.length > 0);
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
  console.log("@@@ eventStartDate = " + JSON.stringify(eventStartDate)); 
  console.log("### eventEndDate = " + JSON.stringify(eventEndDate)); 
  console.log("@@@ eventStartDate = getHours" + eventStartDate.time.value.getHours());
  const isActive = true;
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
      keyboardVerticalOffset={100}
    >
      <ScrollView >
        <View style={styles.screen}>
          <View style={{...styles.field, height: FIELD_HEIGHT * 1.3, justifyContent: 'space-evenly'}}>
            <View style={styles.button}>
              <BodyText style={styles.buttonText}>
                Event Type
              </BodyText>
              <CustomButton
                style={{width: 65, height: 65}}
                onPress={() => {}}
                icon={
                  <FontAwesome 
                  name='group'
                  size={40} 
                  color={'black'}
                />}>
              </CustomButton>
            </View>
            <View style={styles.button}>
              <BodyText style={styles.buttonText}>Event Icon</BodyText>
              <IconSelect icon={icon} onSelect={onSelectIcon}/>
            </View>
          </View>
          <View style={{...styles.field, height: FIELD_HEIGHT * 1.3, justifyContent: 'space-evenly'}}>
            <View style={styles.button}>
              <BodyText style={styles.buttonText}>
                Equipment & Supply
              </BodyText>
              <CustomButton
                onPress={() => {}}
                icon={
                  <MaterialIcons 
                  name='card-travel'
                  size={35} 
                  color={'black'}
                />}>
              </CustomButton>
            </View>
            <View style={styles.button}>
              <BodyText style={styles.buttonText}>
                Responsibilities
              </BodyText>
              <CustomButton
                onPress={() => {}}
                icon={
                  <FontAwesome5 
                  name='user-tag'
                  size={33}
                  color={'black'}
                />}>
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


CreateEventSecondScreen.navigationOptions = navData => { 
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
        title="Create"
        iconName={'md-checkmark'}
        onPress={submit}
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
    borderWidth: 0.5,
    borderColor: 'black',
    alignSelf: 'stretch',
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
    flexDirection: 'column',
    padding: '1%',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    width: 200,
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
  locationSelect: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: FIELD_HEIGHT * 0.85
  },

});

export default CreateEventSecondScreen;