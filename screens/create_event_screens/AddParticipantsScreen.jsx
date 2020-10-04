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
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
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
import { Layout, Shapes, Typography } from '../../styles';
import Contact from '../../models/contact';

const AddParticipantsScreen = props => {
  const [error, setError] = useState();
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector(state => state.contacts.contacts);
  const [shownContacts, setShownContacts] = useState(contacts);
  const scrollViewRef = useRef();
  const participants = useSelector(state => state.participants.participants);
  const [selectedContacts, setSelectedContacts] = useState(participants);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: 'Okay' }]);
    }
  }, [error]);

  useEffect(() => {
    if (!participants || participants.length === 0) {
      const youAsContact = new Contact(Number.MAX_VALUE, 'You', '', [user.phoneNumber]);
      youAsContact.isOrganizer = true;
      youAsContact.isYou = true;
      console.log('AddParticipantsScreen user.phoneNumber  = ' + JSON.stringify(user.phoneNumber));
      console.log('AddParticipantsScreen contact you  = ' + JSON.stringify(youAsContact));
      setSelectedContacts([youAsContact]);
    }
  }, []);
  
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
  const makeOrganizer = (contactIndex) => {
    if (!selectedContacts[contactIndex].isYou) {
      setSelectedContacts(prevContacts => {
        const newContacts = [...prevContacts];
        newContacts[contactIndex].isOrganizer = !prevContacts[contactIndex].isOrganizer;
        return newContacts;
      });
    }
  }

  const addParticipant = (localId) => {
    const contact = contacts.find(contact => 
      contact.localId === localId
    );
    
    if (selectedContacts !== undefined && 
      selectedContacts.map(part => part.localId)
          .indexOf(contact.localId) > -1) {
      removeParticipant(localId);
      return;
    }
    contact.isOrganizer = false;
    console.log('AddParticipantsScreen contact  = ' + JSON.stringify(contact));
    setSelectedContacts(prevSelectedContacts => [
      ...prevSelectedContacts,
      contact
    ]);
  }
  const renderParticipant = (participant, index) => {
    return (
      <View style={styles.paticipantTouchable}>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    );
  };

  const searchFilterFunction = (text) => {
    let i = 0;
    const newData = contacts.filter(contact => {
      const participantData = `
        ${contact.firstName != undefined ? contact.firstName.toUpperCase() : ''}
        ${contact.lastName != undefined ? contact.lastName.toUpperCase() : ''}`;
        const textData = text.toUpperCase();
        return participantData.includes(textData);
      }
    );
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
          onContentSizeChange={(contentWidth, contentHeight)=> {
            scrollViewRef.current.scrollToEnd({animated: true})
          }}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.selectedParticipants}>
            {selectedContacts && selectedContacts.length > 0 && 
              selectedContacts.map((contact, index) => {
                return (
                  <View 
                  style={styles.selectedBoxTouchable}
                    key={contact.localId}
                  >
                    <View style={{...styles.selectedBox, ...(contact.isOrganizer && {backgroundColor: Colors.lightBluey})}}>
                      <TouchableOpacity
                        onPress={() => makeOrganizer(index)}
                        activeOpacity={0.6}
                          >
                        <View>
                          <BodyText numberOfLines={1} multiLines={false} style={styles.selectedParticipantText}>
                            {contact.firstName}
                          </BodyText>
                        </View>
                      </TouchableOpacity>
                      {!contact.isYou && 
                        <TouchableOpacity
                          onPress={() => removeParticipant(contact.localId)}
                            >
                            <View style={styles.remove}>
                              <MaterialIcons
                                name='delete'
                                color='black'
                                size={hp('2.5%')}
                              />

                            </View>
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                );
              }) } 
              {selectedContacts.length < 2 ?
              <View style={styles.noSelectedParticipantComment}>
                <BodyText style={styles.noSelectedParticipantCommentText}>
                  Tap a contact from the list below to join the event.
                </BodyText>
              </View>
              : null
              }
          </View>
        </ScrollView>
        <View style={styles.fromButtom}>
          <Text style={styles.adminCommentText}>* Select who else can edit the event by tapping *</Text>
        </View>
      </View>
      
      <View style={styles.listContainer}>
      <SearchHeader searchFilter={searchFilterFunction} />
        <FlatList
          contentContainerStyle={{ 
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          style={styles.list}
          data={shownContacts}
          keyExtractor={item => item.localId.toString()}
          renderItem={itemData => renderParticipant(itemData.item, itemData.index)}
          numColumns={1}
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
    // marginTop: 5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.lavender,
    paddingTop: 1,
    paddingLeft: 2,
    height: hp('10%'),
  },
  // scroll: {
  //   flex: 1,
  // },
  selectedParticipants: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: wp('1.5%'),
    paddingVertical: hp('0.5%'),
    alignItems: 'center',
  },
  selectedBoxTouchable: {
    borderRadius: 18,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    width: wp('30%'),
  },
  noSelectedParticipantComment: {
    marginTop: hp('2%'),
  },
  noSelectedParticipantCommentText: {
    textAlign: 'center',
    fontSize: Typography.medium,
  },
  paticipantTouchable: {
    borderRadius: 13,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
  },
  adminCommentText: {
    fontSize: Typography.xxxsmall,
    textAlign: 'center',
    backgroundColor: Colors.lightBluey,
    borderRadius: 8,
    paddingHorizontal: '1%',
    overflow: 'hidden',
  },
  selectedBox: {
    borderRadius: 15,
    flexDirection: 'row',
    ...Layout.shadow,
    ...Layout.centered,
    borderWidth: 0.5,
    paddingHorizontal: wp("1.3%"),
    marginHorizontal: wp("0.4%"),
    marginVertical: hp("0.2%"),
    backgroundColor: Colors.lightGreeny,
    height: hp("5%"),
  },
  remove: {
    ...Layout.centered,
    borderRadius: 150,
    borderWidth: 0.5,
    ...Shapes.roundSmallButton,
    backgroundColor: Colors.lavender,
    marginLeft: wp('1%'),
    height: wp('6.5%'),
    width: wp('6.5%'),
  },
  selectedParticipantText: {
    fontSize: Typography.xxsmall,
    fontFamily: 'jaldi-bold',
    textAlign: 'center',
    flexWrap: 'nowrap',
    width: wp('19%'),
    paddingVertical: Platform.OS === 'android' ? hp('2%') : null,
  },
  selectedParticipant: {

  },
  fromButtom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible'
  },
  listContainer: {
    flex: 3.7,
    // padding: wp("1%"),
    backgroundColor: Colors.grayish,
    overflow: 'hidden',
    margin: wp("0.5%"),
  },
  participant: {
    width: wp("80%"),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    paddingVertical: hp("1%"),
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: 'black',
    borderBottomWidth: 0.4,
    backgroundColor: Colors.grayish,
  },
  participantCheckIcon: {
    marginLeft: wp("1%"),
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