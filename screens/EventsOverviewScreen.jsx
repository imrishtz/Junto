import React, { useState, useCallback, useEffect, useRef, useMemo} from 'react';
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
  AsyncStorage,
  Animated,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HeaderButton from '../components/HeaderButton';
import EventCard from '../components/EventCard';
import Colors from '../constants/Colors';
import Contact from '../models/contact';
import * as eventsActions from '../store/actions/events';
import * as contactsActions from '../store/actions/contacts';
import transformPhoneNumber from '../helpers/transformPhoneNumber';
import BodyText from '../components/BodyText';
import SearchHeader from '../components/SearchHeader';
import { Typography } from '../styles';
import { createContactsByPhoneNumberTable } from '../helpers/contactByPhoneNumber';

const EventsOverviewScreen = props => {

  const dispatch = useDispatch();
  let contacts = useSelector(state => state.contacts.contacts);
  if (contacts === undefined) {
    contacts = [];
  }
  const abortController = new AbortController();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState();
  const events = useSelector(state => state.events.availableEvents);
  const [shownEvents, setShownEvents] = useState(events);
  const user = useSelector(state => state.user.user);
  const fetching = useSelector(state => state.events.fetching);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const searchPressedHandler = useCallback(() => {
    setIsSearch((prevStatus) => !prevStatus);
  }, []);

  const cleanup = useCallback(() => {
    setIsSearch(false);
  }, [events]);

  useEffect(() => {
    if (!isSearch && events && events.length > 0) {
      setShownEvents(events);
    }
    props.navigation.setParams({'searchHandler':searchPressedHandler, 'cleanHandler': cleanup});
  }, [events, isSearch]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        contacts = [];
        let localId = 0;
        for (const contact of data) {
          if (contact.phoneNumbers !== undefined) {
            let numbersOnly = []
            for (const phoneExtra of contact.phoneNumbers) {
              let transformedNumber = transformPhoneNumber(phoneExtra.number);
               
              if (transformedNumber !== undefined && 
                  numbersOnly.indexOf(transformedNumber) === -1) {
                numbersOnly.push(transformPhoneNumber(transformedNumber));
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
        createContactsByPhoneNumberTable(contacts);
        dispatch(contactsActions.setContacts(contacts));
      }
    })();

    return cleanup;
  }, []);

  const filterNameFunction = useCallback((text) => {
    const filteredEvents = events.filter((event) => {
      return (event.name.toUpperCase().includes(text.toUpperCase()));
    });
    setShownEvents(filteredEvents);
  }, [events]);
  const eventPressedHandler = useCallback((event) => {
    cleanup();
    props.navigation.navigate('EventDetails',
    {event: event}
    );
  }, []);

  const renderEvent = useCallback((event) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.6}
        onPress={() => eventPressedHandler(event)}>
          <EventCard
            event={event}
          />
        </TouchableOpacity>
    ); 
  }, []);

  const loadEvents = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(eventsActions.fetchEvents());
    } catch (err) {
      setError(err.message);
    } 
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [user]);

  useEffect(() => {
    if (!events || fetching) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [fetching]);
  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isSearch?  hp("7%") : 0,
        duration: 200,
        useNativeDriver: false,
      }
    ).start();
  }, [fadeAnim, isSearch]);

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
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text>Loading your events...</Text>
      </View>
    );
  }
  console.log('shownEvents' + shownEvents && shownEvents.length);
  return (
    <View style={{...styles.container, ...styles.centered}}>
      <Animated.View style={{...styles.searchHeaderContainer, height: fadeAnim}}>
        <SearchHeader isActive={isSearch} searchFilter={filterNameFunction}/> 
      </Animated.View>
      <FlatList
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.listContent}
        style={styles.list}
        onRefresh={loadEvents}
        refreshing={isRefreshing}
        data={shownEvents || events}
        ListEmptyComponent={emptyEvents}
        numColumns={1}
        keyExtractor={item => item.id}
        renderItem={(itemData) => renderEvent(itemData.item)}
      />
    </View>
  );
};

const emptyEvents = () => {
  return (
    <View style={styles.centered}>
      <BodyText style={styles.emptyText}>
        No events to show you.{"\n"}{"\n"}
        You can create them by pressing the upper-right plus button,{"\n"}
        or, you can sit and wait for an invite :)</BodyText>
    </View>
  );
}

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
      <View style={{flexDirection: 'row'}}>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Check"
            iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
            onPress={navData.navigation.getParam('searchHandler')}
          />
        </HeaderButtons>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Check"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.getParam('cleanHandler')();
              navData.navigation.navigate('CreateEvent');
            }}
          />
        </HeaderButtons>
      </View>
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center' ,
    backgroundColor: Colors.lightBluey,
  },
  searchHeaderContainer:{
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  listContent: {
    backgroundColor: Colors.lightBluey,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.lightBluey,
    width: "100%"
  },
  emptyText: {
    fontSize: Typography.medium,
    paddingHorizontal: wp("10%"),
    paddingTop: wp("10%"),
    textAlign: 'center',
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