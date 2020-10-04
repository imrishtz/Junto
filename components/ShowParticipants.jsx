import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { getDisplayNumber } from '../helpers/transformPhoneNumber';
import { Layout, Typography } from '../styles';
import BodyText from './BodyText';

const ShowParticipants = (props) => {
  const { participants, onPress , width} = props;
  const user = useSelector(state => state.user.user);
  
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={customStyles({width}).scrollContainer}>
    <ScrollView 
      nestedScrollEnabled={true}
      persistentScrollbar={true}
      snapToAlignment='center'
    >
      <TouchableCmp
        onPress={onPress}
        activeOpacity={0.6}
      >
        <View style={styles.selectedParticipants}>
          {participants.map((participant) => {
            return (
              <View 
                key={(participant.phoneNumbers &&
                      participant.phoneNumbers[0])}
                style={styles.selectedBoxTouchable}
              >
                <View 
                  style={{...styles.selectedBox, ...(participant.isOrganizer && {backgroundColor: Colors.lightBluey})}}>
                  <BodyText 
                    style={styles.selectedParticipantText}
                    numberOfLines={1}
                  >
                    {user.phoneNumber === participant.phoneNumbers[0]?
                      'You'
                    :
                    participant.firstName
                      || 
                      getDisplayNumber(participant.phoneNumbers[0])}
                  </BodyText>
                </View>
              </View>
            );
          })}
        </View>
      </TouchableCmp>
    </ScrollView>
  </View>
  );
}
const customStyles = (props) => StyleSheet.create({
  scrollContainer: {
    width: props.width,
    margin: "0.7%",
    marginTop: 5,
    borderRadius: 20,
    backgroundColor: Colors.lavender,
    paddingTop: 1,
    // paddingHorizontal: 2,
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
  },
});
const styles = StyleSheet.create({
  selectedParticipants: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBoxTouchable: {
    borderRadius: 15,
    overflow: 'hidden',
    ...Layout.centered,
    width: wp('23%'),
  },
  selectedBox: {
    flexWrap: 'wrap',
    borderRadius: 15,
    ...Layout.shadow,
    ...Layout.centered,
    paddingHorizontal: wp("1%"),
    marginHorizontal: wp("1%"),
    marginVertical: hp("0.3%"),
    backgroundColor: Colors.lightGreeny,
    borderWidth: 0.5,
    height: hp('3.8%'),
  },
  selectedParticipantText: {
    fontSize: Typography.xxsmall,
    fontFamily: 'jaldi-bold',
    width: wp('20%'),
    textAlign: 'center',
  },

});

export default ShowParticipants;