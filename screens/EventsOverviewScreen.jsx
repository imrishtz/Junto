import React, { useState, useCallback, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  Platform,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import EventCard from '../components/EventCard';
import Colors from '../constants/Colors';
import Contact from '../models/contact';
import * as eventsActions from '../store/actions/events';
import * as contactsActions from '../store/actions/contacts';
import AddButton from '../components/AddButton';
import transformPhoneNumber from '../helpers/transformPhoneNumber';
import BodyText from '../components/BodyText';


const renderEvent = (event) => {

  return (
    <View>
      <EventCard
        event={event}
        onSelect={() => {
          () => {};
        }}
      />
    </View>
  ); 
};

const EventsOverviewScreen = props => {

  const dispatch = useDispatch();
  let contacts = useSelector(state => state.contacts.contacts);
  if (contacts === undefined) {
    contacts = [];
  }
  const abortController = new AbortController();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const events = useSelector(state => state.events.availableEvents);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        let localId = 0;
        let count = 0;
        for (const contact of data) {
          if (contact.phoneNumbers !== undefined) {
            let numbersOnly = []
            for (const phoneExtra of contact.phoneNumbers) {
              let transformedNumber = transformPhoneNumber(phoneExtra.number);
               
              if (transformedNumber !== undefined && 
                  numbersOnly.indexOf(transformedNumber) === -1) {
                numbersOnly.push(transformPhoneNumber(transformedNumber));
              }
              if (count === 5) {
                console.log("get contacts numbersOnly= " + JSON.stringify(numbersOnly));
              }
            }
            if (numbersOnly.length > 0) {
              let con = new Contact(
                localId++,
                contact.name, 
                contact
                .lastName, 
                numbersOnly,
              );
              contacts.push(con);
            }
          }
        }
        dispatch(contactsActions.setContacts(contacts));
      }
    })();
  }, []);


  const loadEvents = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(eventsActions.fetchEvents(abortController.signal));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    return function cleanup() {
      abortController.abort();
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadEvents
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadEvents]);

  useEffect(() => {
    setIsLoading(true);
      loadEvents().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadEvents]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('EventDetails', {
      eventId: id,
      eventTitle: title
    });
  };
  const createEventHandler = () => {
    props.navigation.navigate('CreateEvent');
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <BodyText>An error occurred!</BodyText>
        <Button
          title="Try again"
          onPress={loadEvents}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={{...styles.container, ...styles.centered}}>
      <FlatList
        contentContainerStyle={{paddingBottom: 90}}
        style={styles.list}
        onRefresh={loadEvents}
        refreshing={isRefreshing}
        data={events}
        keyExtractor={item => item.id}
        renderItem={(itemData) => renderEvent(itemData.item)}
      />
      {/* <Button title='details' onPress={() => selectItemHandler(1, 'The Item')} /> */}
        <AddButton onPress={createEventHandler}/>
    </View>
  );
};


EventsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Events',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.navigate('Settings');
          }}
        />
      </HeaderButtons>,
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Check"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={() => {

          }}
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayish,
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  list: {
    flex: 1,
    width: "102%"
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    overflow: 'hidden'
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

export default EventsOverviewScreen;