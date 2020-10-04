import React, { useState, useCallback, useEffect, useRef, useReducer } from 'react';
import {
  Button,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Alert,
  AsyncStorage,
  TextInput,
  Dimensions,
  PixelRatio,
  TouchableWithoutFeedback
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as eventsActions from '../../store/actions/events';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, MaterialIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors';
import IconSelect from '../../components/IconSelect';
import { icons } from '../../constants/Icons';
import BodyText from '../../components/BodyText';
import CustomButton from '../../components/CustomButton';
import HeaderButton from '../../components/HeaderButton';
import * as participantsActions from '../../store/actions/participants';
import { getDateForUpload } from '../../helpers/dateToStringConverter';
import { Layout, Typography } from '../../styles';
import { getTypes } from '../../constants/event_types';

const FIELD_HEIGHT = hp("13.5%");



const CreateEventSecondScreen = props => {
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [iconKey, setIconKey] = useState(icons[0].key);
  const [eventType, setEventType] = useState('');
  const [error, setError] = useState();
  const [openSelectTypes, setOpenSelectTypes] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isElementsOnOneRow, setIsElementsOnOneRow] = useState(Dimensions.get('window').width > 500);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [suggestions, setSuggestions] = useState(false);
  let [controller, setController] = useState();
  const rawTypes = getTypes();
  const types = rawTypes.map((type)=> {
    return {label: type, value: type}
  })
  const [shownTypes, setShownTypes] = useState(types);
  const dispatch = useDispatch();

  const { eventName, participants, location, 
          locationPoll, eventStartDate, 
          eventEndDate, datePoll } = props.navigation.getParam("eventData");
  const flexContainer = useCallback((flexSize) => {
    return (
      {flex: flexSize, padding: wp("1%")}
    ) ;
  }, []);

  const updateLayout = useCallback(() => {
    const newWidth = Dimensions.get('window').width;
    setScreenWidth(newWidth);
    if (newWidth > 500) {
      setIsElementsOnOneRow(true);  
    } else {
      setIsElementsOnOneRow(false);
    }
  }, []);
  
  const cleanup = useCallback(() => {
    Dimensions.removeEventListener('change', updateLayout);
  }, []);
  useEffect(() => {
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return cleanup;
  }, []);



  const selectTypeHandler = useCallback((type) => { 
    setEventType(type.value);
    setSuggestions(false);
  }, []);
  const changeTypeText = useCallback((text) => {
    setEventType(text);
    const filteredTypes = types.filter((type) => {
      return type.value.toUpperCase().includes(text.toUpperCase());
    });
    setShownTypes(filteredTypes);
  }, [types]);
  
  const submitHandler = useCallback(async () => {
    
    const newArr = participants.concat({phoneNumbers: [user.phoneNumber]});
    if (!eventName) {
      console.log("submitHandler IMRI !isValid");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        eventsActions.createEvent(
          eventName,
          {start: getDateForUpload(eventStartDate), end: getDateForUpload(eventEndDate)},
          location,
          locationPoll,
          eventType,
          participants, // TODO is copyied !!!!
          ['cooler', 'shade'],
          ['pants', 'shirts'],
          [{name: 'josh', responsibility: 'music'}, {name: 'benny', responsibility: 'sleep'}],
          iconKey,
          )
          );
      dispatch(participantsActions.setParticipants([]));
      props.navigation.popToTop();
    } catch (err) {
      console.log("submitHandler IMRI err=" + err);
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, eventName, participants, location, locationPoll, eventType, iconKey, eventStartDate, eventEndDate]);
  

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  
  const onSelectIcon = useCallback((iconKeySelected) => {
    setIconKey(iconKeySelected);
  }, []);
  
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      >
        <View style={styles.screen}>
          <View style={{...styles.field}}>
            <View style={styles.eventTypeButton}>
              <BodyText style={styles.eventTypeText}>
                Event Type
              </BodyText>
              <View style={styles.input}>
                <TextInput 
                  value={eventType}
                  placeholder={'Type here...'}
                  onChangeText={changeTypeText}
                  maxLength={15}
                  returnKeyType='done'
                  numberOfLines={1}
                  onFocus={() => setSuggestions(true)}
                  onBlur={() => setSuggestions(false)}
                  blurOnSubmit={true}
                  style={styles.inputText}
                  selection={{start:0}}
                />
              </View>
              <BodyText style={styles.comment}>
              (max characters: 15)
            </BodyText>      
            </View>
            <View style={styles.eventIconButton}>
              <BodyText style={styles.iconText}>
                Event Icon
              </BodyText>
                <IconSelect iconKey={iconKey} onSelect={onSelectIcon}/>
            </View>
          </View>
          <View style={{...styles.field, justifyContent: 'space-evenly'}}>
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
        {suggestions ?
          <View style={styles.dropDown}>
            <View style={styles.typesSuggestions}>
              <ScrollView
                keyboardShouldPersistTaps='always'
                nestedScrollEnabled={true}
                contentContainerStyle={styles.typesSuggestionsContainer}
              >
                {shownTypes && shownTypes.map((type)=>
                <TouchableOpacity 
                  onPress={() => selectTypeHandler(type)}
                  style={styles.typesSuggestItem}
                  key={type.value}
                  activeOpacity={0.6}
                >
                  <View style={styles.typeTextHolder}>
                    <BodyText style={styles.typeText}>
                      {type.value}
                    </BodyText>
                  </View>
                </TouchableOpacity>)
                }
              </ScrollView>
            </View>
          </View>
            :
            null
            }
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
  field: {
    ...Layout.field,
    width: '100%',
    // height: FIELD_HEIGHT,
    flex: 1,
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
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp("2%"),
    flexWrap: 'wrap',
  },
  eventTypeButton: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventIconButton: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp("1.3%"),
  },
  eventTypeText: {
    fontSize: Typography.xsmall,
    textAlign: 'center',
    marginBottom: hp("1%"),
  },
  input: {
    width: wp("55%"),
    height: wp("8%"),
    maxHeight: wp("8%"),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: Typography.medium,
    ...(Platform.OS === 'android' && {
      fontFamily: 'jaldi-bold',
    }),
    fontWeight: '900',
    textAlign: 'center',
  },
  comment: {
    fontSize: Typography.xxsmall,
    textAlign: 'center',
    marginTop: hp("0.5%"),
  },
  iconText: {
    fontSize: Typography.xsmall,
    textAlign: 'center',
  },
  typeText: {
    fontSize: Typography.small,
  },
  dropDown: {
    position: 'absolute',
    top: wp("22%"),
    left: wp("6%"),
    width: wp("48%"),
  },
  typeTextHolder: {
    height: hp("6%"),
    justifyContent: 'center',
  },
  typesSuggestions: {
    flex: 1,
    maxHeight: hp("50%"),
    justifyContent: 'center',

    borderWidth: 0.5,
    backgroundColor: 'white',
  },
  typesSuggestionsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: wp("1%"),
  },  
  typesSuggestItem: {
    backgroundColor: 'white',
  },

});

export default CreateEventSecondScreen;