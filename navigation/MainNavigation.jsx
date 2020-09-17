import React from 'react';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import EventsOverviewScreen from '../screens/EventsOverviewScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import AddParticipantsScreen from '../screens/create_event_screens/AddParticipantsScreen';
import CreateEventScreen from '../screens/create_event_screens/CreateEventScreen';
import CreateEventSecondScreen from '../screens/create_event_screens/CreateEventSecondScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StartScreen from '../screens/StartScreen';
import AuthScreen from '../screens/AuthScreen';

import Colors from '../constants/Colors';


const defaultNavOptions = {
  headerTitleAllowFontScaling: false,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.grayish : '',
  },
  headerTitleStyle: {
    //fontFamily: 'jaldi',
    
    fontSize: 20,
    textAlign: 'center',
    
  },
  // headerBackTitleStyle: {
  //   fontFamily: 'open-sans'
  // },
  headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primary,
};


const EventsNavigator = createStackNavigator(
  {
    EventsOverview: EventsOverviewScreen,
    Settings: SettingsScreen,
    EventDetails: EventDetailsScreen,
    CreateEvent: CreateEventScreen,
    CreateEventSecond: CreateEventSecondScreen,
    AddParticipant: AddParticipantsScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
});
const MainNavigator = createSwitchNavigator({
  Startup: StartScreen,
  Auth: AuthNavigator,
  Events: EventsNavigator
});


export default createAppContainer(MainNavigator);