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

import Colors from '../constants/Colors';
import AuthPhoneScreen from '../screens/AuthPhoneScreen';
import StartScreenPhone from '../screens/StartScreenPhone';


const defaultNavOptions = {
  headerTitleAllowFontScaling: false,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.grayish : '',
  },
  headerTitleStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'black',
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
  // Auth: AuthScreen
  Auth: AuthPhoneScreen,
}, {
  defaultNavigationOptions: defaultNavOptions
});
const MainNavigator = createSwitchNavigator({
  Startup: StartScreenPhone,
  Auth: AuthNavigator,
  Events: EventsNavigator
});


export default createAppContainer(MainNavigator);