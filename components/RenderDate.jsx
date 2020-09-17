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


const RenderDate = (props) => {
  const {answer, index, deleteAnswer} = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  console.log(new Date(Date.now()) + "answer = " + JSON.stringify(answer.content)); 
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
  let startOnly = (strStartTime || strStartDate) && (!strEndDate && !strEndTime);
  let endOnly = (strEndTime || strEndDate) && (!strStartTime && !strStartDate);
  
  return (
    <View style={styles.answerContainer}>
      <View style={styles.answers}>
        <BodyText style={styles.answerIntro}> {index + 1}. </BodyText>
        { startOnly ? <BodyText style={styles.answerIntro}>Start:</BodyText>: null}
        { endOnly ? <BodyText style={styles.answerIntro}>End:</BodyText>: null}
        <View style={styles.answerContent}>
          <View style={styles.date}>
            {strStartTime ? <BodyText style={styles.answer}>{strStartTime}</BodyText>: null}
            {strStartDate ? <BodyText style={styles.answer}>{strStartDate}</BodyText>: null}
          </View>
          {(strEndTime || strEndDate) &&
           (strStartTime || strStartDate)?
            <BodyText style={styles.answer}>    -    </BodyText> :
             null}
          <View style={styles.date}>
            {strEndTime ? <BodyText style={styles.answer}>{strEndTime}</BodyText> : null}
            {strEndDate ? <BodyText style={styles.answer}>{strEndDate}</BodyText> : null}
          </View>
        </View>
      </View>
      <View style={styles.roundSmallButtonHolder}>
        <View style={styles.roundSmallButton}>
          <TouchableCmp
            key={index}
            onPress={() => deleteAnswer(index)}
          >
            <MaterialIcons 
              name='delete'
              size={20}
            />
          </TouchableCmp>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    width: '100%',
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
  roundSmallButtonHolder: {
    flex: 1,
    margin: wp("1%"),
    width: '10%',
  },
  roundSmallButton: {
    borderWidth: 0.5,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGreeny,
  },
});

export default RenderDate;