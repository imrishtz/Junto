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
  
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

import BodyText from './BodyText';
import Colors from '../constants/Colors';
import {dateToStrDate, dateToStrHour} from '../helpers/dateToStringConverter';
import DateText from './DateText';
import { Typography } from '../styles';


const RenderDate = (props) => {
  const {answer, index} = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const isStartTimeSet = answer.content.eventStartDate.time.isSet;
  const isSstartDateSet = answer.content.eventStartDate.date.isSet;
  const isEndTimeSet = answer.content.eventEndDate.time.isSet;
  const isEndDateSet = answer.content.eventEndDate.date.isSet;


  let strStartTime = '';
  let strStartDate = '';
  if (isStartTimeSet) {
    strStartTime = dateToStrHour(answer.content.eventStartDate.time.value);
  }
  if (isSstartDateSet) {
    strStartDate = dateToStrDate(answer.content.eventStartDate.date.value);
  }

  let strEndTime = '';
  let strEndDate = '';
  if (isEndTimeSet) {
    strEndTime = dateToStrHour(answer.content.eventEndDate.time.value);
  }
  if (isEndDateSet) {
    strEndDate = dateToStrDate(answer.content.eventEndDate.date.value);
  } 
  const fullDateStr = {
    start: {time: strStartTime, date: strStartDate},
    end: {time: strEndTime, date: strEndDate}
  };

  return (
    <View style={styles.answerContainer}>
      <View style={styles.answers}>
        <BodyText style={styles.answerIntro}> {index + 1}. </BodyText>
        <DateText date={fullDateStr} size={props.size || Typography.small}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  answers: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    paddingHorizontal: 2,
    paddingVertical: 1,
    backgroundColor: Colors.lightGreeny,
    borderRadius: 8,
  },
  answerIntro: {
    fontSize: hp("1.8%"),
    fontFamily: "jaldi-bold",
  },
  answer: {
    fontSize: hp("1.8%"),
  },
  answerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: hp("0.2%"),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RenderDate;