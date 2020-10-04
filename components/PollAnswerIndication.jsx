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
import TouchableComponent from './TouchableComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Layout, Shapes, Typography } from '../styles';
import Colors from '../constants/Colors';

const PollAnswerIndication = props => {
  const { answer } = props;
  let count = 0;
  if (answer && answer.participantsSelected && answer.participantsSelected.length) {
    count = answer.participantsSelected.length;
  }
  return (
    <View style={styles.container}>
    <TouchableOpacity
      onPress={() => {}}
      style={styles.touch}
      activeOpacity={0.6}
    >
        <BodyText style={styles.text}>{count}</BodyText>
    </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Shapes.roundSmallButton,
    backgroundColor: Colors.grayish,
    ...Layout.shadow,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Typography.xsmall,
  },
});

export default PollAnswerIndication;