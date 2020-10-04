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
import BodyText from './BodyText';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Layout, Typography } from '../styles';

const RenderText = (props) => {
  const {answer, index} = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.answerContainer}>
      <View style={styles.answerHolder}>
        <BodyText style={styles.answerText}>{index + 1}. </BodyText>
        <BodyText style={styles.answerText}>{answer.content}</BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    maxWidth: wp("65%"),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerHolder: {
    flex: 1,
    flexDirection: 'row',
    alignItems : 'center',
    marginHorizontal: wp("1%"),
    borderWidth: 0.5,
    paddingHorizontal: wp("2%"),
    borderRadius: 8,
    maxWidth: wp("60%"),
    backgroundColor: Colors.lightGreeny,
    ...Layout.shadow,
  },
  answerText: {
    justifyContent: 'center',
    maxWidth: wp("46%"),
    fontSize: Typography.small,
    alignItems: 'center',
  },
});

export default RenderText;