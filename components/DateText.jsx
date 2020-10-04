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
import {dateToStrDate, dateToStrHour} from '../helpers/dateToStringConverter';
import { Typography } from '../styles';
import BodyText from './BodyText';

const DateText = props => {
  const strStartTime = props.date.start.time;
  const strStartDate = props.date.start.date;
  const strEndTime = props.date.end.time;
  const strEndDate = props.date.end.date;

  const { index } = props;
  const startOnly = (strStartTime || strStartDate) && (!strEndDate && !strEndTime);
  const endOnly = (strEndTime || strEndDate) && (!strStartTime && !strStartDate);
  const StartDateOnly = ((strStartDate && !strEndDate || strStartDate === strEndDate) && strStartTime && strEndTime) ;
  // TODO add poll options when no date selected
  return (
    <View style={styles.container}>
      { index ? <BodyText style={styles.answerIntro}> {index + 1}. </BodyText>: null }
      { startOnly ? <BodyText style={styles.answerIntro}>Start:</BodyText>: null}
      { endOnly ? <BodyText style={styles.answerIntro}>End:</BodyText>: null}
      {!strStartTime && !strStartDate && !strEndTime && !strEndDate ? 
        <BodyText style={styles.answer}>No date selected</BodyText> :
        null
      }
      { StartDateOnly?
      <View style={{...styles.answerContent, ...styles.singleDate }}>
        <View style={styles.date}>
          <BodyText style={customStyles(props).text}>{strStartTime}  -  {strEndTime}</BodyText>
        </View>
        <View style={styles.date}>
          <BodyText style={customStyles(props).text}>{strStartDate}</BodyText>
        </View>
      </View>
      :
      <View style={styles.answerContent}>
        <View style={styles.date}>
          {strStartTime ? <BodyText style={customStyles(props).text}>{strStartTime}</BodyText>: null}
          {strStartDate ? <BodyText style={customStyles(props).text}>{strStartDate}</BodyText>: null}
        </View>
          {(strEndTime || strEndDate) &&
            (strStartTime || strStartDate)?
            <BodyText style={customStyles(props).text}>   -   </BodyText> :
              null}
        <View style={styles.date}>
          {strEndTime ? <BodyText style={customStyles(props).text}>{strEndTime}</BodyText> : null}
          {strEndDate ? <BodyText style={customStyles(props).text}>{strEndDate}</BodyText> : null}
        </View>
      </View>
      }
    </View>
  );
};
const customStyles = (props) => StyleSheet.create({
  text: {
    fontSize: props.size,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  answerIntro: {
    fontSize: Typography.small,
    fontFamily: "jaldi-bold",
  },
  answer: {
    fontSize: hp("1.8%"),
  },
  answerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: hp("0.2%"),
    justifyContent: 'center',
    alignItems: 'center',
  },
  betweenDates: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleDate: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Typography.small,
  },
});

export default DateText;
