import React from 'react';
import {
  Button,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

const EventDetailsScreen = props => {
  const createEventHandler = (eventId) => {
    props.navigation.replace('CreateEvent', {
      eventId: eventId
    });
  };


  return (
    <View style={styles.centered}>
      <BodyText>EventDetailsScreen</BodyText>
      <Button title='Copy Event' onPress={() => createEventHandler(3)} />
    </View>
  );
};

EventDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('eventTitle')
  };
};

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default EventDetailsScreen;