import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Button,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HeaderButton from '../../components/HeaderButton';
import SearchHeader from '../../components/SearchHeader';
import BodyText from '../../components/BodyText';
import Colors from '../../constants/Colors';
import * as participantsActions from '../../store/actions/participants';
import { useSelector, useDispatch } from 'react-redux';

const AddParticipantsScreen = props => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(state => state.contacts.contacts);
  const [shownContacts, setShownContacts] = useState(contacts);
  const scrollViewRef = useRef();
  const participants = useSelector(state => state.participants.participants);
  const [selectedContacts, setSelectedContacts] = useState(participants);
  const dispatch = useDispatch();

  useEffect(() => {
    const getContacts = async () => {
      const contactsJSON = await AsyncStorage.getItem('contacts'); 
      const contactsParsed = JSON.parse(contactsJSON);
    }

    setIsLoading(true);
    getContacts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: 'Okay' }]);
    }
  }, [error]);

  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  
  useEffect(() => {
    dispatch(
      participantsActions.setParticipants(selectedContacts));
  }, [selectedContacts]);

  const removeParticipant = (localId) => {
    setSelectedContacts(prevSelectedContacts => 
      prevSelectedContacts.filter((partcipant) => 
        partcipant.localId !== localId
      )
    )
  }
  const addParticipant = (localId) => {
    const con = contacts.find(contact => 
      contact.localId === localId
    );
    
    if (selectedContacts !== undefined && 
      selectedContacts.map(part => part.localId)
          .indexOf(con.localId) > -1) {
      removeParticipant(localId);
      return;
    }
    setSelectedContacts(prevSelectedContacts => [
      ...prevSelectedContacts,
      con
    ]);
  }
  const renderParticipant = (participant) => {
    return (
      <TouchableCmp
        key={participant.localId}
        onPress={() => {
          addParticipant(participant.localId); 
          scrollViewRef.current.scrollToEnd({animated: true})
        }}
        activeOpacity={0.6}
        >
        <View style={styles.participant}>
          {selectedContacts !== undefined && 
          selectedContacts.map(part => part.localId)
              .indexOf(participant.localId) > -1 ? 
              <FontAwesome
                style={styles.participantCheckIcon}
                name="check-square-o"
                size={20}
                color={Colors.greeny}
              /> 
              : null
          }
          <BodyText style={styles.participantText}>{participant.firstName}</BodyText>
        </View>
      </TouchableCmp>
    );
  };

  const searchFilterFunction = (text) => {
    const newData = contacts.filter(contact => {
      const participantData = `
        ${contact.firstName != undefined ? contact.firstName.toUpperCase() : ''}
        ${contact.lastName != undefined ? contact.lastName.toUpperCase() : ''}`;
        const textData = text.toUpperCase();
        return participantData.indexOf(textData) > -1;
      });
    if (newData.length === 0) {
      newData[0] = {
        localId: -1, 
        firstName: 'No contacts found'
      };
    }
    setShownContacts(newData);
  };
  
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
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scroll}
          onContentSizeChange={(contentWidth, contentHeight)=> {
            scrollViewRef.current.scrollToEnd({animated: true})
          }}
        >
          <View style={styles.selectedParticipants}>
            {selectedContacts && selectedContacts.length > 0 ? 
              selectedContacts.map((contact) => {
                return (
                  <View 
                  key={contact.localId}
                  style={styles.selectedBoxTouchable}
                  >
                    <TouchableCmp
                      onPress={() => removeParticipant(contact.localId)}
                      activeOpacity={0.6}
                    >
                      <View 
                        style={styles.selectedBox}>
                        <BodyText style={styles.selectedParticipantText}>
                          {contact.firstName}
                        </BodyText>
                      </View>
                    </TouchableCmp>
                  </View>
                );
              }) :
              <BodyText >Please Select Participants from your contact list.</BodyText>
            }
          </View>
        </ScrollView>
      </View>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={{ 
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
            ListHeaderComponentStyle={{
              width: '100%',
            }}
            ListHeaderComponent={<SearchHeader searchFilter={searchFilterFunction} />}
            style={styles.list}
            data={shownContacts.length !== 0 ? shownContacts : contacts}
            keyExtractor={item => item.localId.toString()}
            renderItem={itemData => renderParticipant(itemData.item)}
            numColumns={1}
            stickyHeaderIndices={[0]}
          />
        </View>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    margin: "0.7%",
    marginTop: 5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.lavender,
    paddingTop: 1,
    paddingLeft: 2,
  },
  selectedParticipants: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
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
    padding: "1%",
    margin: 1.5,
    backgroundColor: Colors.lightGreeny,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedParticipantText: {
    fontSize: 14,
    fontFamily: 'jaldi-bold',
  },
  listContainer: {
    flex: 4,
    padding: wp("1%"),
    backgroundColor: Colors.grayish,
    borderRadius: 30,
    overflow: 'hidden',
    margin: wp("0.5%"),
  },
  participant: {
    width: wp("80%"),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginLeft: 1,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: 'black',
    borderBottomWidth: 0.2,
    backgroundColor: Colors.grayish,
  },
  participantCheckIcon: {
    marginLeft: 2,
  },
  participantText: {
    fontSize: hp("2.3%"),
    marginLeft: 5,
    fontFamily: 'jaldi',
  },
});


AddParticipantsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Select Participants',
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
        title="Check"
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}        
        onPress={() => {
          navData.navigation.pop();
        }}
      />
    </HeaderButtons>
  }
};

export default AddParticipantsScreen;