import React, { useState, useEffect } from 'react';
import { StyleSheet, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import NavigationContainer from './navigation/NavigationContainer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import eventsReducer from './store/reducers/events';
import participantsReducer from './store/reducers/participants';
import contactsReducer from './store/reducers/contacts';

import ReduxThunk from 'redux-thunk';
import _ from 'lodash';


// removing warnings
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  participants: participantsReducer,
  contacts: contactsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'jaldi-bold': require('./assets/fonts/Jaldi-Bold.ttf'),
    'jaldi': require('./assets/fonts/Jaldi-Regular.ttf')
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
