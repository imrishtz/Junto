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

const RenderText = (props) => {
  const {answer, index, deleteAnswer} = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.answerContainer}>
      <View style={styles.answers}>
        <BodyText style={styles.answer}>{index + 1}. </BodyText>
        <BodyText style={styles.answer}>{answer.content} </BodyText>
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
    maxWidth: wp("74%"),
    flexDirection: 'row',
    alignItems: 'center',
  },
  answers: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    paddingHorizontal: 2,
    paddingVertical: 1,
    backgroundColor: Colors.lightGreeny,
    borderRadius: 8,
  },
  answer: {
    fontSize: 16,
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

export default RenderText;